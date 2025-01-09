import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import MainHeader from "../components/MainHeader/MainHeader";

const MainLayout = () => {
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <Sidebar />

      <div
        className="flex flex-col flex-1"
      >
        {/* Header */}
        <MainHeader />

        {/* Content */}
        <main className="p-5 bg-bg overflow-y-auto h-[89vh]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
