import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { User, ChartColumnBig } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";

const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="pt-20 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-4 py-6">
        
        {/* Sidebar Section */}
        <aside className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md h-fit border border-gray-200 dark:border-gray-700">
          <nav className="flex flex-col gap-2 font-medium">
            <Link
              to="/dashboard/profile"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === "/dashboard/profile"
                  ? "bg-gray-200 dark:bg-gray-700 font-bold text-black dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300"
              }`}
            >
              <User size={20} />
              <span className="text-lg">Profile</span>
            </Link>

            <Link
              to="/dashboard/your-blog"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === "/dashboard/your-blog"
                  ? "bg-gray-200 dark:bg-gray-700 font-bold text-black dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300"
              }`}
            >
              <ChartColumnBig size={20} />
              <span className="text-lg">Your Blogs</span>
            </Link>

            <Link
              to="/dashboard/write-blog"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === "/dashboard/write-blog"
                  ? "bg-gray-200 dark:bg-gray-700 font-bold text-black dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300"
              }`}
            >
              <FaRegEdit size={20} />
              <span className="text-lg">Create Blog</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content Area (Child Routes Output) */}
        <main className="flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Dashboard;