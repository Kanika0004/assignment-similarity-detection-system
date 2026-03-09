import { mockAssignments, mockSimilarityPairs } from "../data/mockData";
import { Clock, AlertCircle } from "lucide-react";
import { useSectionContext } from "../context/SectionContext";

export function TimelineView() {
  const { selectedSectionId } = useSectionContext();

  // Filter by section
  const sectionAssignments = mockAssignments.filter(a => a.sectionId === selectedSectionId);
  const sectionPairs = mockSimilarityPairs.filter(p => p.sectionId === selectedSectionId);

  // Group assignments by submission time
  const timeline = sectionAssignments.map((assignment) => {
    // Find high similarity pairs involving this assignment
    const relatedPairs = sectionPairs.filter(
      (pair) =>
        (pair.student1 === assignment.studentName ||
          pair.student2 === assignment.studentName) &&
        pair.similarityScore >= 70
    );

    return {
      ...assignment,
      hasHighSimilarity: relatedPairs.length > 0,
      relatedStudents: relatedPairs.map((p) =>
        p.student1 === assignment.studentName ? p.student2 : p.student1
      ),
    };
  }).sort((a, b) => new Date(a.submissionTime).getTime() - new Date(b.submissionTime).getTime());

  // Check for clusters in time
  const findTemporalClusters = () => {
    const clusters: any[] = [];
    let currentCluster: any[] = [];

    for (let i = 0; i < timeline.length; i++) {
      const current = timeline[i];
      const currentTime = new Date(current.submissionTime).getTime();

      if (currentCluster.length === 0) {
        currentCluster.push(current);
      } else {
        const lastTime = new Date(
          currentCluster[currentCluster.length - 1].submissionTime
        ).getTime();
        const timeDiff = (currentTime - lastTime) / (1000 * 60); // minutes

        if (timeDiff <= 30 && current.hasHighSimilarity) {
          currentCluster.push(current);
        } else {
          if (currentCluster.length >= 2 && currentCluster.some((s) => s.hasHighSimilarity)) {
            clusters.push([...currentCluster]);
          }
          currentCluster = [current];
        }
      }
    }

    if (currentCluster.length >= 2 && currentCluster.some((s) => s.hasHighSimilarity)) {
      clusters.push(currentCluster);
    }

    return clusters;
  };

  const temporalClusters = findTemporalClusters();

  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timeStr: string) => {
    const date = new Date(timeStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-700" />
        <h3 className="font-semibold text-gray-900">Timeline Analysis</h3>
      </div>

      {temporalClusters.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">
                Temporal Pattern Detected
              </p>
              <p className="text-sm text-red-700 mt-1">
                {temporalClusters.length} cluster{temporalClusters.length > 1 ? "s" : ""}{" "}
                of highly similar submissions occurred within short timeframes
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {/* Timeline Events */}
        <div className="space-y-6">
          {timeline.map((submission, idx) => (
            <div key={submission.id} className="relative flex items-start gap-4">
              {/* Timeline Dot */}
              <div
                className={`relative z-10 w-4 h-4 rounded-full border-2 ${
                  submission.hasHighSimilarity
                    ? "bg-red-500 border-red-600"
                    : "bg-green-500 border-green-600"
                }`}
              >
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-600 whitespace-nowrap">
                  {formatTime(submission.submissionTime)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div
                  className={`p-4 rounded-lg border ${
                    submission.hasHighSimilarity
                      ? "bg-red-50 border-red-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {submission.studentName}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {submission.fileName} • {submission.wordCount} words
                      </p>
                      {submission.hasHighSimilarity && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {submission.relatedStudents.map((student, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-medium"
                            >
                              High similarity with {student}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(submission.submissionTime)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}