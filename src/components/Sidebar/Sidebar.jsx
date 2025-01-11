import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { MdDashboard, MdOutlineCategory } from "react-icons/md";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { BsHouseGearFill } from "react-icons/bs";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { IoMdSettings } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { pathname } = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  // Determine active menu item
  const getActiveClass = (path) =>
    pathname === path
      ? "bg-primary text-white px-2 py-3 rounded-lg"
      : "";

  const getActiveClass2 = (path) => (pathname === path ? "bg-[#f77777]" : "");

  return (
    <div
      className={`fixed lg:static bg-white w-[280px] h-screen overflow-y-auto py-5 md:py-0 z-50 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Logo Section */}
      <div className="flex justify-start md:justify-start mmd:justify-start lg:justify-center items-center mx-5 md:mx-5  mmd:mx-5 lg:mx-0  my-5">
        <img
          src="/logo.png"
          className="w-[150px] md:w-[150px] mmd:w-[150px] lg:w-[218px] h-[40px]"
          alt="Logo"
        />
      </div>

      {/* Close Button (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 lg:hidden text-white bg-secondary focus:outline-none p-2 rounded-full"
      >
        <IoCloseSharp />
      </button>

      {/* Sidebar Menu */}
      <ul className="mt-20 px-4">
        {/* Dashboard */}
        <li className={`flex items-center gap-4 mt-8 cursor-pointer ${getActiveClass("/")}`}>
          <MdDashboard className="w-5 h-5" />
          <Link to="/">Dashboard</Link>
        </li>

        {/* User Management */}
        <li
          className={`flex items-center gap-4 mt-8 cursor-pointer py-2 ${getActiveClass(
            "/user-management"
          )}`}
          onClick={() => setIsUserOpen(!isUserOpen)}
        >
          <FaUsers className="w-5 h-5" />
          <span>User Management</span>
        </li>
        {isUserOpen && (
          <ul className="bg-[#ffebeb] rounded-lg text-center py-3">
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
          <Link to="/request-management">Job Req. Management</Link>
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
          className={`flex items-center gap-4 mt-8 cursor-pointer py-2 ${getActiveClass(
            "/settings"
          )}`}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <IoMdSettings className="w-5 h-5" />
          <span>Settings</span>
        </li>
        {isSettingsOpen && (
          <ul className="bg-[#ffebeb] rounded-lg text-center py-3">
            <li className={`py-[6px] ${getActiveClass2("/privacy-policy")}`}>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li
              className={`py-[6px] ${getActiveClass2("/terms-and-condition")}`}
            >
              <Link to="/terms-and-condition">Terms and Conditions</Link>
            </li>
          </ul>
        )}
      </ul>

      {/* Logout Button */}
      <div className="absolute mt-8 md:mt-0 mmd:mt-8 md:bottom-4 lg:bottom-4 w-full px-4">
        <Link to="/sign-in">
          <button
            className="flex items-center gap-4 w-full py-3 rounded-lg"
          >
            <IoMdSettings className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
