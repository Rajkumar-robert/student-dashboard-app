import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/quyl.png";
import { RiBookMarkedLine, RiBookReadFill, RiDashboard3Line } from "react-icons/ri";
import { TbHelp, TbSettings2 } from "react-icons/tb";
import { HiOutlineChartPie } from "react-icons/hi";
import profile from "../assets/profile.png";

const Sidebar = () => {
  const location = useLocation(); // Get the current location

  const isActive = (path) => location.pathname === path;

  return (
    <div className="pt-16 md:pt-0 fixed top-0 left-0 h-full w-64 bg-white text-white flex flex-col p-4">
      {/* Sidebar */}
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-center py-6">
            <img src={logo} alt="Logo" width={150} className="w-[150px] h-auto" />
          </div>

          <div className="flex flex-col space-y-6">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-4 p-2 rounded-md cursor-pointer text-black ${isActive("/dashboard") ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
            >
              <RiDashboard3Line size={24} />
              <span className="text-lg font-medium">Dashboard</span>
            </Link>
            <Link
              to="/"
              className={`flex items-center space-x-4 p-2 rounded-md cursor-pointer text-black ${isActive("/") ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
            >
              <RiBookReadFill size={24} />
              <span className="text-lg font-medium">Student</span>
            </Link>
            <Link
              to="/chapters"
              className={`flex items-center space-x-4 p-2 rounded-md cursor-pointer text-black ${isActive("/chapters") ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
            >
              <RiBookMarkedLine size={24} />
              <span className="text-lg font-medium">Chapter</span>
            </Link>
            <Link
              to="/help"
              className={`flex items-center space-x-4 p-2 rounded-md cursor-pointer text-black ${isActive("/help") ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
            >
              <TbHelp size={24} />
              <span className="text-lg font-medium">Help</span>
            </Link>
            <Link
              to="/reports"
              className={`flex items-center space-x-4 p-2 rounded-md cursor-pointer text-black ${isActive("/reports") ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
            >
              <HiOutlineChartPie size={24} />
              <span className="text-lg font-medium">Reports</span>
            </Link>
            <Link
              to="/settings"
              className={`flex items-center space-x-4 p-2 rounded-md cursor-pointer text-black ${isActive("/settings") ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
            >
              <TbSettings2 size={24} />
              <span className="text-lg font-medium">Settings</span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
