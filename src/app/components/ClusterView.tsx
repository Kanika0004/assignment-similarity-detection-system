import { useParams, Link } from "react-router";
import { ChevronLeft, Users, AlertTriangle, FileText, TrendingUp } from "lucide-react";
import { mockClusters, mockAssignments, aiExplanations } from "../data/mockData";

export function ClusterView() {
  const { clusterId } = useParams();
  const cluster = mockClusters.find((c) => c.id === clusterId);

  if (!cluster) {
    return <div>Cluster not found</div>;
  }

  const clusterAssignments = mockAssignments.filter((a) =>
    cluster.assignmentIds.includes(a.id)
  );

  const explanation = aiExplanations.c1;

  // Create a similarity matrix
  const matrix: number[][] = [];
  for (let i = 0; i < clusterAssignments.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < clusterAssignments.length; j++) {
      if (i === j) {
        matrix[i][j] = 100;
      } else if (i < j) {
        // Generate mock similarity
        matrix[i][j] = Math.floor(Math.random() * 30) + 70;
      } else {
        matrix[i][j] = matrix[j][i];
      }
    }
  }

  // Common overlapping segments
  const commonSegments = [
    {
      text: "The impact of climate change on coastal ecosystems has become increasingly evident",
      frequency: 4,
      type: "exact" as const,
    },
    {
      text: "Rising sea levels threaten biodiversity and human settlements",
      frequency: 4,
      type: "paraphrased" as const,
    },
    {
      text: "Scientists have documented/observed/shown significant changes in marine habitats",
      frequency: 4,
      type: "structural" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/report/r1"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Report
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {cluster.name}
            </h2>
            <p className="text-gray-600 mt-1">
              {cluster.size} students in this cluster
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Average Similarity</p>
            <p
              className={`text-3xl font-semibold ${
                cluster.avgSimilarity >= 70
                  ? "text-red-600"
                  : cluster.avgSimilarity >= 50
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              {cluster.avgSimilarity.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-2xl font-semibold text-gray-900">
              {cluster.size}
            </span>
          </div>
          <p className="text-sm text-gray-600">Cluster Members</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span className="text-2xl font-semibold text-gray-900">
              {cluster.avgSimilarity.toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-gray-600">Avg Similarity</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <span className="text-2xl font-semibold text-gray-900">
              {commonSegments.length}
            </span>
          </div>
          <p className="text-sm text-gray-600">Common Segments</p>
        </div>
      </div>

      {/* AI Explanation */}
      {cluster.id === "c1" && explanation && (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                AI Cluster Analysis
              </h3>
              <p className="text-gray-700 mb-3">{explanation.summary}</p>
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Likely Scenario</p>
                  <p className="font-medium text-gray-900">
                    {explanation.likelyScenario}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Confidence Score</p>
                  <p className="font-medium text-red-600">
                    {explanation.confidence}%
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Evidence:
                </p>
                <ul className="space-y-1">
                  {explanation.evidence.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-red-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Similarity Matrix */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">
          Similarity Matrix (Heatmap)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 text-left text-sm font-medium text-gray-600">
                  Student
                </th>
                {clusterAssignments.map((assignment) => (
                  <th
                    key={assignment.id}
                    className="p-2 text-center text-xs font-medium text-gray-600"
                  >
                    {assignment.studentName.split(" ")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clusterAssignments.map((assignment, i) => (
                <tr key={assignment.id}>
                  <td className="p-2 text-sm font-medium text-gray-900">
                    {assignment.studentName}
                  </td>
                  {clusterAssignments.map((_, j) => (
                    <td key={j} className="p-2">
                      <div
                        className={`w-16 h-12 rounded flex items-center justify-center text-xs font-semibold ${
                          i === j
                            ? "bg-gray-100 text-gray-400"
                            : matrix[i][j] >= 80
                            ? "bg-red-500 text-white"
                            : matrix[i][j] >= 70
                            ? "bg-orange-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {i === j ? "—" : `${matrix[i][j]}%`}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <span className="text-xs text-gray-600">Legend:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-xs text-gray-600">80-100%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-xs text-gray-600">70-79%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-xs text-gray-600">60-69%</span>
          </div>
        </div>
      </div>

      {/* Common Overlapping Segments */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">
          Common Overlapping Segments
        </h3>
        <div className="space-y-3">
          {commonSegments.map((segment, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-l-4 ${
                segment.type === "exact"
                  ? "bg-red-50 border-red-500"
                  : segment.type === "paraphrased"
                  ? "bg-orange-50 border-orange-500"
                  : "bg-yellow-50 border-yellow-500"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span
                  className={`text-xs font-semibold uppercase ${
                    segment.type === "exact"
                      ? "text-red-700"
                      : segment.type === "paraphrased"
                      ? "text-orange-700"
                      : "text-yellow-700"
                  }`}
                >
                  {segment.type}
                </span>
                <span className="text-xs text-gray-600">
                  Found in {segment.frequency}/{cluster.size} submissions
                </span>
              </div>
              <p className="text-sm text-gray-900 italic">&ldquo;{segment.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cluster Members */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Cluster Members</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {clusterAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {assignment.studentName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {assignment.fileName} • {assignment.wordCount} words
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Uploaded</p>
                <p className="text-sm text-gray-900">{assignment.uploadDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
