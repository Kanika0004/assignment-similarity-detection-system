import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardHome } from "./components/DashboardHome";
import { UploadPage } from "./components/UploadPage";
import { SimilarityReportPage } from "./components/SimilarityReportPage";
import { ComparisonView } from "./components/ComparisonView";
import { ClusterView } from "./components/ClusterView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "upload", Component: UploadPage },
      { path: "report/:reportId", Component: SimilarityReportPage },
      { path: "comparison/:pairId", Component: ComparisonView },
      { path: "cluster/:clusterId", Component: ClusterView },
    ],
  },
]);
