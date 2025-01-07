import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { MdDashboard, MdOutlineCategory } from "react-icons/md";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { BsHouseGearFill } from "react-icons/bs";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { IoMdSettings } from "react-icons/io";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const getActiveClass = (path) =>
    pathname === path ? "bg-primary text-white px-2 py-5 rounded-lg" : "";

  const getActiveClass2 = (path) => (pathname === path ? "bg-[#f77777]" : "");

  return (
    <div className="relative bg-white w-[280px]">
      {/* Logo */}
      <div className="flex justify-center items-center my-5">
        <img
          src="/logo.png"
          className="w-[218px] h-[40px] object-cover"
          alt="Logo"
        />
      </div>

      {/* Menu */}
      <ul className="px-4 mt-20">
        <li className={`flex items-center gap-4 ${getActiveClass("/")}`}>
          <MdDashboard className="w-5 h-5" />
          <Link to="/">Dashboard</Link>
        </li>
        <li
          className={`flex items-center gap-4 mt-8 ${getActiveClass(
            "/user-management"
          )}`}
          onClick={() => setIsUserOpen(!isUserOpen)}
        >
          <FaUsers className="w-5 h-5" />
          <Link to="/user-management">User Management</Link>
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
        <li
          className={`flex items-center gap-2 active:text-md mt-8 ${getActiveClass(
            "/request-management"
          )}`}
        >
          <BsHouseGearFill className="w-5 h-5" />

          <Link to="/request-management">Job request management</Link>
        </li>
        <li className={`flex items-center gap-4 mt-8 ${getActiveClass("/invoice")}`}>
          <LiaFileInvoiceSolid className="w-5 h-5" />

          <Link to="/invoice">Invoice</Link>
        </li>
        <li
          className={`flex items-center gap-4 mt-8 ${getActiveClass(
            "/add-service"
          )}`}
        >
          <MdOutlineCategory className="w-5 h-5" />

          <Link to="/add-service">Add Service category</Link>
        </li>
        <li
          className={`flex items-center gap-4 mt-8 ${getActiveClass("/make-admin")}`}
        >
          <FaUserPlus className="w-5 h-5" />
          <Link to="/make-admin">Make Admin</Link>
        </li>
        <li
          className={`flex items-center gap-4 mt-8 ${getActiveClass("/settings")}`}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <IoMdSettings className="w-5 h-5" />
          <Link to="/settings">settings</Link>
        </li>
        {isSettingsOpen && (
          <ul className="bg-[#ffebeb] rounded-lg text-center">
            <li className={`py-[6px] ${getActiveClass2("/privacy-policy")}`}>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li
              className={`py-[6px] ${getActiveClass2("/terms-and-condition")}`}
            >
              <Link to="/terms-and-condition">Terms and Condition</Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
