import { Link } from "react-router-dom";

import dashboard from "../../assets/icons/dashboard.svg";
import user from "../../assets/icons/User.svg";
import job from "../../assets/icons/job.svg";
import invoice from "../../assets/icons/invoice.svg";
import service from "../../assets/icons/service.svg";
import admin from "../../assets/icons/admin.svg";
import settings from "../../assets/icons/settings.svg";
import { useState } from "react";

const Sidebar = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="relative bg-white w-[280px]">
      {/* Logo */}
      <div className="flex justify-center items-center my-5">
        <img src="/logo.png" className="w-[218px] h-[40px] object-cover" alt="Logo" />
      </div>

      {/* Menu */}
      <ul className="px-4 mt-20 space-y-8">
        <li className="flex items-center gap-4">
          <img src={dashboard} className="w-5 h-5" alt="dashboard" />
          <Link to="/">Dashboard</Link>
        </li>
        <li className="flex items-center gap-4">
          <img src={user} className="w-5 h-5" alt="user" />
          <Link to="/user-management">User Management</Link>
        </li>
        <li className="flex items-center gap-4">
          <img src={job} className="w-5 h-5" alt="job" />
          <Link to="/request-management">Job request management</Link>
        </li>
        <li className="flex items-center gap-4">
          <img src={invoice} className="w-5 h-5" alt="invoice" />
          <Link to="/invoice">Invoice</Link>
        </li>
        <li className="flex items-center gap-4">
          <img src={service} className="w-5 h-5" alt="service" />
          <Link to="/add-service">Add Service category</Link>
        </li>
        <li className="flex items-center gap-4">
          <img src={admin} className="w-5 h-5" alt="admin" />
          <Link to="/make-admin">Make Admin</Link>
        </li>
        <li>
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
      >
        <img src={settings} className="w-5 h-5" alt="settings" />
        <span>Settings</span>
      </div>
      {isSettingsOpen && (
        <ul className="ml-6 space-y-2">
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms-and-condition">Terms and Condition</Link>
          </li>
        </ul>
      )}
    </li>
       
      </ul>
    </div>
  );
};

export default Sidebar;
