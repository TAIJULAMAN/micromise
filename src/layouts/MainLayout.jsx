import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import MainHeader from "../components/MainHeader/MainHeader";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <MainHeader toggleSidebar={toggleSidebar} />
        <main className="p-4 overflow-y-auto bg-bg h-[100vh]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
