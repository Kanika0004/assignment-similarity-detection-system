import { useParams, Link } from "react-router";
import {
  AlertTriangle,
  FileText,
  TrendingUp,
  Users,
  Download,
  Filter,
  Search,
  ChevronRight,
  CheckCircle,
  Flag,
} from "lucide-react";
import {
  mockReports,
  mockSimilarityPairs,
  mockClusters,
  mockAssignments,
} from "../data/mockData";
import { useState } from "react";
//import { TimelineView } from "./TimelineView";
import { useSectionContext } from "../context/SectionContext";

export function SimilarityReportPage() {
  const { reportId } = useParams();
  const { getSelectedSection } = useSectionContext();
  const selectedSection = getSelectedSection();
  
  const report = mockReports.find((r) => r.id === reportId);
  const [filterThreshold, setFilterThreshold] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [ignoreCommon, setIgnoreCommon] = useState(false);
  const [ignoreRefs, setIgnoreRefs] = useState(false);
  const [showTimeline, setShowTimeline] = useState(true);

  if (!report) {
    return <div>Report not found</div>;
  }

  // Filter by section
  const filteredPairs = mockSimilarityPairs.filter(
    (pair) =>
      pair.sectionId === report.sectionId &&
      pair.similarityScore >= filterThreshold &&
      (searchQuery === "" ||
        pair.student1.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pair.student2.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sectionClusters = mockClusters.filter(c => c.sectionId === report.sectionId);

  return (
    <div className="space-y-6">
      {/* Page Header with Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Link to="/" className="hover:text-gray-900">
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>{selectedSection?.displayName}</span>
          <ChevronRight className="w-4 h-4" />
          <span>{report.name}</span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">{report.name}</h2>
        <p className="text-gray-600 mt-1">
          Uploaded: {report.uploadDate} • Due: {report.dueDate}
        </p>
      </div>

      {/* Summary Panel */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg mb-2">
              AI Analysis Summary
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>4 assignments</strong> share{" "}
                <strong className="text-red-600">82% structural similarity</strong>{" "}
                and <strong className="text-red-600">65% phrase-level overlap</strong>.
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Likely cause: <strong>Direct copying with minor rewording</strong>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                Detected shared uncommon phrases and identical argument structure
              </p>
            </div>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-2xl font-semibold text-gray-900">
              {report.totalAssignments}
            </span>
          </div>
          <p className="text-sm text-gray-600">Total Submissions</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-2xl font-semibold text-red-600">
              {report.flaggedCount}
            </span>
          </div>
          <p className="text-sm text-gray-600">Flagged Documents</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span className="text-2xl font-semibold text-gray-900">
              {report.highestSimilarity.toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-gray-600">Highest Similarity</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="text-2xl font-semibold text-gray-900">
              {mockClusters.length}
            </span>
          </div>
          <p className="text-sm text-gray-600">Similarity Clusters</p>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters & Controls</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Students
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>

          {/* Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Similarity Threshold: {filterThreshold}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={filterThreshold}
              onChange={(e) => setFilterThreshold(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Toggle Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Advanced Options
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ignoreCommon}
                  onChange={(e) => setIgnoreCommon(e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">
                  Ignore common phrases
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ignoreRefs}
                  onChange={(e) => setIgnoreRefs(e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">
                  Ignore references
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Cluster View */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            Similarity Clusters
          </h3>
          <span className="text-sm text-gray-600">
            {mockClusters.length} clusters identified
          </span>
        </div>
        <div className="divide-y divide-gray-200">
          {sectionClusters.map((cluster) => (
            <Link
              key={cluster.id}
              to={`/cluster/${cluster.id}`}
              className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      cluster.avgSimilarity >= 70
                        ? "bg-red-50"
                        : cluster.avgSimilarity >= 50
                        ? "bg-orange-50"
                        : "bg-green-50"
                    }`}
                  >
                    <Users
                      className={`w-5 h-5 ${
                        cluster.avgSimilarity >= 70
                          ? "text-red-600"
                          : cluster.avgSimilarity >= 50
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{cluster.name}</h4>
                    <p className="text-sm text-gray-600">
                      {cluster.size} students • Avg similarity:{" "}
                      {cluster.avgSimilarity.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cluster.assignmentIds.map((aid) => {
                    const assignment = mockAssignments.find((a) => a.id === aid);
                    return (
                      <span
                        key={aid}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {assignment?.studentName}
                      </span>
                    );
                  })}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          ))}
        </div>
      </div>

      {/* Timeline Analysis */}
      {showTimeline && <TimelineView />}

      {/* Pairwise Comparisons */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            Pairwise Comparisons
          </h3>
          <span className="text-sm text-gray-600">
            {filteredPairs.length} pairs found
          </span>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredPairs.map((pair) => (
            <Link
              key={pair.id}
              to={`/comparison/${pair.id}`}
              className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-gray-900">
                    {pair.student1}
                  </span>
                  <span className="text-gray-400">↔</span>
                  <span className="font-medium text-gray-900">
                    {pair.student2}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-600">
                      Exact: {pair.exactMatches}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span className="text-sm text-gray-600">
                      Paraphrased: {pair.paraphrased}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span className="text-sm text-gray-600">
                      Structural: {pair.structural}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p
                    className={`text-2xl font-semibold ${
                      pair.similarityScore >= 80
                        ? "text-red-600"
                        : pair.similarityScore >= 60
                        ? "text-orange-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {pair.similarityScore.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500">Total Similarity</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Report generated on {report.uploadDate}
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}