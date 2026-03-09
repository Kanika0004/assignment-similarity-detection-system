import { Link } from "react-router";
import {
  FileText,
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  BarChart3,
  ArrowRight,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { mockReports, mockSimilarityPairs, mockClusters } from "../data/mockData";
//import { SimilarityHeatmap } from "./SimilarityHeatmap";
import { NetworkGraph } from "./NetworkGraph";
import { useSectionContext } from "../context/SectionContext";

export function DashboardHome() {
  const { selectedSectionId } = useSectionContext();

  // Filter data by selected section
  const sectionReports = mockReports.filter(r => r.sectionId === selectedSectionId);
  const sectionPairs = mockSimilarityPairs.filter(p => p.sectionId === selectedSectionId);
  const sectionClusters = mockClusters.filter(c => c.sectionId === selectedSectionId);

  const totalAssignments = sectionReports.reduce(
    (acc, r) => acc + r.totalAssignments,
    0
  );
  const totalFlagged = sectionReports.reduce((acc, r) => acc + r.flaggedCount, 0);
  const avgSimilarity =
    sectionReports.length > 0
      ? sectionReports.reduce((acc, r) => acc + r.avgSimilarity, 0) / sectionReports.length
      : 0;

  const highRiskCount = sectionPairs.filter(p => p.riskLevel === "high").length;
  const largestCluster = sectionClusters.length > 0 
    ? sectionClusters.reduce((max, c) => c.size > max.size ? c : max, sectionClusters[0])
    : null;
  const pendingReview = sectionPairs.filter(p => !p.reviewed).length;

  // Chart data
  const similarityDistribution = [
    { range: "0-20%", count: 8 },
    { range: "20-40%", count: 4 },
    { range: "40-60%", count: 3 },
    { range: "60-80%", count: 5 },
    { range: "80-100%", count: 4 },
  ];

  const pieData = [
    { name: "High Risk", value: totalFlagged, color: "#ef4444" },
    { name: "Medium Risk", value: 6, color: "#f59e0b" },
    { name: "Low Risk", value: totalAssignments - totalFlagged - 6, color: "#10b981" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Action Center
        </h2>
        <p className="text-gray-600 mt-1">
          Immediate attention items and class-wide patterns
        </p>
      </div>

      {/* Immediate Attention Panel */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            🚨 Immediate Attention Required
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">High-Risk Cases</span>
              <span className="text-2xl font-bold text-red-600">{highRiskCount}</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Similarity &gt;80%</p>
            <Link
              to="/report/r1"
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Review Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Largest Cluster</span>
              <span className="text-2xl font-bold text-orange-600">
                {largestCluster?.size || 0}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              {largestCluster ? largestCluster.avgSimilarity.toFixed(1) : 0}% avg similarity
            </p>
            <Link
              to={`/cluster/${largestCluster?.id}`}
              className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Open Cluster <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">New Submissions</span>
              <span className="text-2xl font-bold text-blue-600">8</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Today • 4 pending review</p>
            <Link
              to="/report/r1"
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Assignments</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">
                {totalAssignments}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Across all courses</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">% of Class Flagged</p>
              <p className="text-3xl font-semibold text-red-600 mt-2">
                {((totalFlagged / totalAssignments) * 100).toFixed(0)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-red-600 mt-4">{totalFlagged} submissions</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Similarity</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">
                {avgSimilarity.toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Across all submissions</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Clusters</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">{mockClusters.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Detected patterns</p>
        </div>
      </div>

      {/* Heatmap and Network Graph
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimilarityHeatmap />
        <NetworkGraph />
      </div> */}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Similarity Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Similarity Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={similarityDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Categories */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Risk Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Similar Pairs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">
            Top Similar Pairs (Flagged)
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {mockSimilarityPairs.slice(0, 5).map((pair) => (
            <Link
              key={pair.id}
              to={`/comparison/${pair.id}`}
              className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {pair.student1}
                    </span>
                    <span className="text-gray-400">↔</span>
                    <span className="font-medium text-gray-900">
                      {pair.student2}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    pair.riskLevel === "high" 
                      ? "bg-red-100 text-red-700"
                      : pair.riskLevel === "medium"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {pair.riskLevel === "high" ? "High Risk" : pair.riskLevel === "medium" ? "Medium Risk" : "Low Risk"}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span>Exact: {pair.exactMatches}%</span>
                  <span>Paraphrased: {pair.paraphrased}%</span>
                  <span>Structural: {pair.structural}%</span>
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
                  <p className="text-xs text-gray-500">Similarity</p>
                </div>
                {pair.similarityScore >= 80 && (
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Recent Reports</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {mockReports.map((report) => (
            <Link
              key={report.id}
              to={`/report/${report.id}`}
              className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div>
                <h4 className="font-medium text-gray-900">{report.name}</h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span>{report.totalAssignments} submissions</span>
                  <span>•</span>
                  <span>{report.flaggedCount} flagged</span>
                  <span>•</span>
                  <span>Due: {report.dueDate}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Highest Similarity</p>
                <p
                  className={`text-xl font-semibold ${
                    report.highestSimilarity >= 80
                      ? "text-red-600"
                      : "text-orange-600"
                  }`}
                >
                  {report.highestSimilarity.toFixed(1)}%
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}