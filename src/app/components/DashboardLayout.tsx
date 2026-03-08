import { Outlet, Link, useLocation } from "react-router";
import { LayoutDashboard, Upload, FileText, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { SectionSelector } from "./SectionSelector";
import { useSectionContext } from "../context/SectionContext";

export function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { getSelectedSection } = useSectionContext();
  const selectedSection = getSelectedSection();

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/upload", label: "Upload Assignments", icon: Upload },
    { path: "/report/r1", label: "Recent Reports", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Assignment Similarity Checker
                </h1>
                <p className="text-sm text-gray-500">Teacher Dashboard</p>
              </div>
            </div>
          </div>
          
          {/* Section Selector */}
          <div className="flex-1 flex justify-center">
            <SectionSelector />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Prof. Johnson</p>
              <p className="text-xs text-gray-500">Computer Science</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Archive Mode Banner */}
        {selectedSection?.isArchive && (
          <div className="bg-orange-50 border-b border-orange-200 px-6 py-3">
            <p className="text-sm text-orange-800 font-medium text-center">
              📁 Archive Mode - Viewing archived data only. Uploads are disabled.
            </p>
          </div>
        )}
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0 lg:w-20"
          } bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden`}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}