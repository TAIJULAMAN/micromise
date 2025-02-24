import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdDashboard, MdOutlineCategory } from "react-icons/md";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { BsHouseGearFill } from "react-icons/bs";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { IoMdSettings } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useOwnDataQuery } from "../../redux/api/getMeApi";
import { RiLogoutBoxLine } from "react-icons/ri";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const router = useNavigate();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleSubMenuToggle = (submenu) => {
    if (submenu === "settings") {
      setIsSettingsOpen(!isSettingsOpen);
    } else if (submenu === "user") {
      setIsUserOpen(!isUserOpen);
    }
  };
  const { data: ownData, error, isLoading } = useOwnDataQuery();

  const handleLogout = () => {
    localStorage.clear();
    router("/sign-in");
  };

  if (isLoading)
    return (
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-10 border-primary"></div>
    );
  if (error) return <p className="text-red-500">Failed to load technisians!</p>;

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
        <Link to="/">
          <li
            className={`flex items-center gap-4 mt-8 cursor-pointer px-2 py-3 rounded-lg ${
              activeMenu === "dashboard"
                ? "bg-primary text-white delay-100 duration-100"
                : " hover:bg-gray "
            }`}
            onClick={() => handleMenuClick("dashboard")}
          >
            <MdDashboard className="w-5 h-5" />
            <p>Dashboard</p>
          </li>
        </Link>

        {/* User Management */}
        <li
          className={`flex items-center gap-4 mt-4 cursor-pointer  px-2 py-3 rounded-lg mb-3 ${
            activeMenu === "user-management" ||
            activeMenu === "technician" ||
            activeMenu === "admin-client" ||
            activeMenu === "client-supervisor"
              ? "bg-primary text-white delay-100 duration-100"
              : "hover:bg-gray "
          }`}
          onClick={() => {
            handleMenuClick("user-management");
            handleSubMenuToggle("user");
          }}
        >
          <FaUsers className="w-5 h-5" />
          <span>User Management</span>
        </li>
        {isUserOpen && (
          <ul className="bg-[#ffebeb] rounded-lg text-center ">
            <Link to="/technician">
              <li
                className={` rounded-md  delay-100 duration-100 py-3 ${
                  activeMenu === "technician"
                    ? "bg-[#bb4343] text-white"
                    : "hover:bg-gray"
                }`}
                onClick={() => handleMenuClick("technician")}
              >
                <p>Technician</p>
              </li>
            </Link>
            <Link to="/admin-client">
              <li
                className={`py-[6px] my-2  rounded-md delay-100 duration-100 ${
                  activeMenu === "admin-client"
                    ? "bg-[#bb4343] text-white "
                    : "hover:bg-gray"
                }`}
                onClick={() => handleMenuClick("admin-client")}
              >
                <p>Client</p>
              </li>
            </Link>
            <Link to="/client-supervisor">
              <li
                className={`py-[6px] rounded-md  ${
                  activeMenu === "client-supervisor"
                    ? "bg-[#bb4343] text-white delay-100 duration-100 "
                    : "hover:bg-gray"
                }`}
                onClick={() => handleMenuClick("client-supervisor")}
              >
                <p>Supervisor</p>
              </li>
            </Link>
          </ul>
        )}

        {/* Job Request Management */}
        <Link to="/request-management">
          <li
            className={`flex items-center gap-4 mt-4 px-2 py-3 rounded-lg  delay-100 duration-100 ${
              activeMenu === "request-management"
                ? "bg-primary text-white "
                : "hover:bg-gray "
            }`}
            onClick={() => handleMenuClick("request-management")}
          >
            <BsHouseGearFill className="w-5 h-5" />
            <p>Job Req. Management</p>
          </li>
        </Link>

        {/* Invoice */}
        <Link to="/invoice">
          <li
            className={`flex items-center gap-4 mt-4 px-2 py-3 rounded-lg  delay-100 duration-100 ${
              activeMenu === "invoice"
                ? "bg-primary text-white "
                : "hover:bg-gray "
            }`}
            onClick={() => handleMenuClick("invoice")}
          >
            <LiaFileInvoiceSolid className="w-5 h-5" />
            <p>Invoice</p>
          </li>
        </Link>

        {/* Add Service Category */}
        <Link to="/add-service">
          <li
            className={`flex items-center gap-4 mt-4 px-2 py-3 rounded-lg  delay-100 duration-100 ${
              activeMenu === "add-service"
                ? "bg-primary text-white "
                : "hover:bg-gray "
            }`}
            onClick={() => handleMenuClick("add-service")}
          >
            <MdOutlineCategory className="w-5 h-5" />
            <p>Add Service Category</p>
          </li>
        </Link>

        {/* Make Admin */}
        {ownData?.data?.role == "superAdmin" ? (
          <Link to="/make-admin">
            <li
              className={`flex items-center gap-4 mt-4 px-2 py-3 rounded-lg  delay-100 duration-100 ${
                activeMenu === "make-admin"
                  ? "bg-primary text-white "
                  : "hover:bg-gray "
              }`}
              onClick={() => handleMenuClick("make-admin")}
            >
              <FaUserPlus className="w-5 h-5" />
              <p>Make Admin</p>
            </li>
          </Link>
        ) : null}

        {/* Settings */}
        <li
          className={`flex items-center gap-4 mt-4 px-2  rounded-lg  delay-100 duration-100 cursor-pointer py-2 mb-2 ${
            activeMenu === "settings" ||
            activeMenu === "privacy-policy" ||
            activeMenu === "terms-and-condition"
              ? "bg-primary text-white "
              : "hover:bg-gray "
          }`}
          onClick={() => {
            handleMenuClick("settings");
            handleSubMenuToggle("settings");
          }}
        >
          <IoMdSettings className="w-5 h-5" />
          <span>Settings</span>
        </li>
        {isSettingsOpen && (
          <ul className="bg-[#ffebeb] rounded-lg text-center ">
            <Link to="/privacy-policy">
              <li
                className={`rounded-md  delay-100 duration-100 py-3 ${
                  activeMenu === "privacy-policy"
                    ? "bg-[#bb4343] text-white"
                    : "hover:bg-gray"
                }`}
                onClick={() => handleMenuClick("privacy-policy")}
              >
                <p>Privacy Policy</p>
              </li>
            </Link>
            <Link to="/terms-and-condition">
              <li
                className={`py-3 delay-100 duration-100 ${
                  activeMenu === "terms-and-condition"
                    ? "bg-[#bb4343] text-white"
                    : "hover:bg-gray"
                }`}
                onClick={() => handleMenuClick("terms-and-condition")}
              >
                <p>Terms and Conditions</p>
              </li>
            </Link>
          </ul>
        )}
      </ul>

      {/* Logout Button */}
      <div className="absolute mt-8 md:mt-0 mmd:mt-8 md:bottom-4 lg:bottom-4 w-full px-4">
        {/* <Link to="/sign-in"> */}
        <button
          className="flex items-center gap-4 w-full py-3 rounded-lg bg-[#a33131] hover:bg-primary duration-200 text-white justify-center "
          onClick={handleLogout}
        >
          <RiLogoutBoxLine className="w-5 h-5 font-bold" />
          <span>Logout</span>
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;
