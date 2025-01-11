import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  MdDashboard,
  MdOutlineCategory,
} from "react-icons/md";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { BsHouseGearFill } from "react-icons/bs";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { IoMdSettings } from "react-icons/io";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { pathname } = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  // Determine active menu item
  const getActiveClass = (path) =>
    pathname === path
      ? "bg-primary text-white px-2 py-5 rounded-lg border-l-2 border-primary"
      : "";

  const getActiveClass2 = (path) =>
    pathname === path ? "bg-[#f77777]" : "";

  return (
    <div
      className={`fixed lg:static bg-white w-[280px] h-screen overflow-y-auto py-5 md:py-0 z-50 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Logo Section */}
      <div className="flex justify-start mx-5 md:mx-0 md:justify-center items-center my-5">
        <img
          src="/logo.png"
          className="w-[150px] md:w-[218px] h-[40px]"
          alt="Logo"
        />
      </div>

      {/* Close Button (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 lg:hidden p-2 text-gray-700"
      >
        ✕
      </button>

      {/* Sidebar Menu */}
      <ul className="px-4 mt-20">
        {/* Dashboard */}
        <li className={`flex items-center gap-4 ${getActiveClass("/")}`}>
          <MdDashboard className="w-5 h-5" />
          <Link to="/">Dashboard</Link>
        </li>

        {/* User Management */}
        <li
          className={`flex items-center gap-4 mt-8 cursor-pointer ${getActiveClass(
            "/user-management"
          )}`}
          onClick={() => setIsUserOpen(!isUserOpen)}
        >
          <FaUsers className="w-5 h-5" />
          <span>User Management</span>
        </li>
        {isUserOpen && (
          <ul className="bg-[#ffebeb] rounded-lg text-center">
            <li className={`py-[6px] ${getActiveClass2("/technician")}`}>
              <Link to="/technician">Technician</Link>
            </li>
            <li className={`py-[6px] ${getActiveClass2("/admin-client")}`}>
              <Link to="/admin-client">Admin Client</Link>
            </li>
            <li className={`py-[6px] ${getActiveClass2("/client-supervisor")}`}>
              <Link to="/client-supervisor">Client Supervisor</Link>
            </li>
          </ul>
        )}

        {/* Job Request Management */}
        <li
          className={`flex items-center gap-4 mt-8 ${getActiveClass(
            "/request-management"
          )}`}
        >
          <BsHouseGearFill className="w-5 h-5" />
          <Link to="/request-management">Job Request Management</Link>
        </li>

        {/* Invoice */}
        <li
          className={`flex items-center gap-4 mt-8 ${getActiveClass(
            "/invoice"
          )}`}
        >
          <LiaFileInvoiceSolid className="w-5 h-5" />
          <Link to="/invoice">Invoice</Link>
        </li>

        {/* Add Service Category */}
        <li
          className={`flex items-center gap-4 mt-8 ${getActiveClass(
            "/add-service"
          )}`}
        >
          <MdOutlineCategory className="w-5 h-5" />
          <Link to="/add-service">Add Service Category</Link>
        </li>

        {/* Make Admin */}
        <li
          className={`flex items-center gap-4 mt-8 ${getActiveClass(
            "/make-admin"
          )}`}
        >
          <FaUserPlus className="w-5 h-5" />
          <Link to="/make-admin">Make Admin</Link>
        </li>

        {/* Settings */}
        <li
          className={`flex items-center gap-4 mt-8 cursor-pointer ${getActiveClass(
            "/settings"
          )}`}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <IoMdSettings className="w-5 h-5" />
          <span>Settings</span>
        </li>
        {isSettingsOpen && (
          <ul className="bg-[#ffebeb] rounded-lg text-center">
            <li
              className={`py-[6px] ${getActiveClass2("/privacy-policy")}`}
            >
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li
              className={`py-[6px] ${getActiveClass2(
                "/terms-and-condition"
              )}`}
            >
              <Link to="/terms-and-condition">Terms and Conditions</Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;