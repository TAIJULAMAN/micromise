import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import MainHeader from "../components/MainHeader/MainHeader";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      <div
        className="flex flex-col flex-1"
      >
        {/* Header */}
        <MainHeader />

        {/* Content */}
        <main className="p-5 bg-bg min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
