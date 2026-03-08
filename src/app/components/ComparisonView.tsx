import { useParams, Link } from "react-router";
import { ChevronLeft, AlertTriangle, Info, Download } from "lucide-react";
import {
  mockSimilarityPairs,
  mockAssignments,
  aiExplanations,
} from "../data/mockData";
import { useState } from "react";

export function ComparisonView() {
  const { pairId } = useParams();
  const pair = mockSimilarityPairs.find((p) => p.id === pairId);
  const [scrollSync, setScrollSync] = useState(true);

  if (!pair) {
    return <div>Comparison not found</div>;
  }

  const student1Assignment = mockAssignments.find(
    (a) => a.studentName === pair.student1
  );
  const student2Assignment = mockAssignments.find(
    (a) => a.studentName === pair.student2
  );

  const explanation = aiExplanations[pairId as keyof typeof aiExplanations];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>, otherRef: React.RefObject<HTMLDivElement>) => {
    if (scrollSync && otherRef.current) {
      const target = e.currentTarget;
      const scrollPercentage = target.scrollTop / (target.scrollHeight - target.clientHeight);
      otherRef.current.scrollTop = scrollPercentage * (otherRef.current.scrollHeight - otherRef.current.clientHeight);
    }
  };

  const leftRef = useState<HTMLDivElement | null>(null)[0];
  const rightRef = useState<HTMLDivElement | null>(null)[0];

  // Simulated highlighted segments
  const highlightText = (text: string, type: "student1" | "student2") => {
    if (pairId !== "p1") return text;

    const segments = text.split(". ");
    return segments.map((segment, idx) => {
      let className = "";
      if (idx === 0) {
        className = "bg-red-100 border-l-4 border-red-500 pl-2";
      } else if (idx === 1) {
        className = "bg-orange-100 border-l-4 border-orange-500 pl-2";
      } else if (idx === 2) {
        className = "bg-yellow-100 border-l-4 border-yellow-500 pl-2";
      }

      return (
        <span key={idx} className={className}>
          {segment}
          {idx < segments.length - 1 ? ". " : ""}
        </span>
      );
    });
  };

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
              Pairwise Comparison
            </h2>
            <p className="text-gray-600 mt-1">
              {pair.student1} ↔ {pair.student2}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Overall Similarity</p>
            <p
              className={`text-3xl font-semibold ${
                pair.similarityScore >= 80 ? "text-red-600" : "text-orange-600"
              }`}
            >
              {pair.similarityScore.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Similarity Breakdown */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">
          Similarity Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm text-gray-600">Exact Matches</p>
              <p className="text-xl font-semibold text-gray-900">
                {pair.exactMatches}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <div>
              <p className="text-sm text-gray-600">Paraphrased</p>
              <p className="text-xl font-semibold text-gray-900">
                {pair.paraphrased}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <div>
              <p className="text-sm text-gray-600">Structural</p>
              <p className="text-xl font-semibold text-gray-900">
                {pair.structural}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Explanation */}
      {explanation && (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                AI Analysis Explanation
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
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
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

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={scrollSync}
              onChange={(e) => setScrollSync(e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Enable scroll sync</span>
          </label>
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-xs text-gray-600">Identical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-xs text-gray-600">Paraphrased</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-xs text-gray-600">Structural</span>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm">
          <Download className="w-4 h-4" />
          Export Comparison
        </button>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student 1 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-blue-50 border-b border-blue-200 p-4">
            <h3 className="font-semibold text-gray-900">{pair.student1}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {student1Assignment?.fileName} •{" "}
              {student1Assignment?.wordCount} words
            </p>
          </div>
          <div
            className="p-6 h-[600px] overflow-y-auto"
            onScroll={(e) => handleScroll(e, { current: rightRef })}
          >
            <div className="prose prose-sm max-w-none space-y-4">
              <p className="leading-relaxed">
                {highlightText(student1Assignment?.content || "", "student1")}
              </p>
            </div>
          </div>
        </div>

        {/* Student 2 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-orange-50 border-b border-orange-200 p-4">
            <h3 className="font-semibold text-gray-900">{pair.student2}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {student2Assignment?.fileName} •{" "}
              {student2Assignment?.wordCount} words
            </p>
          </div>
          <div
            className="p-6 h-[600px] overflow-y-auto"
            onScroll={(e) => handleScroll(e, { current: leftRef })}
          >
            <div className="prose prose-sm max-w-none space-y-4">
              <p className="leading-relaxed">
                {highlightText(student2Assignment?.content || "", "student2")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Side Notes */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Analysis Notes</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
            <div className="w-1 h-full bg-red-500 rounded"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Section 1: Introduction
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Identical sentence structure with 95% word-for-word match
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
            <div className="w-1 h-full bg-orange-500 rounded"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Section 2: Main Arguments
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Rare phrase match: "unprecedented bleaching events" - appears in
                both
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-1 h-full bg-yellow-500 rounded"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Section 3: Conclusion
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Identical argument sequence across 3 paragraphs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
