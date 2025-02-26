import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useOwnDataQuery } from "../../redux/api/getMeApi";

const MainHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const { data: ownData, error, isLoading } = useOwnDataQuery();

  if (isLoading)
    return (
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-10 border-primary"></div>
    );
  if (error) return <p className="text-red-500">Failed to admin data!</p>;

  return (
    <div className="relative w-full">
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-4 h-[70px]">
          {/* Sidebar Toggle Button for Mobile */}
          <button
            onClick={toggleSidebar}
            className=" lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo or Title */}
          <h1 className="text-lg md:text-xl font-bold text-primary hidden lg:block">
            Dashboard
          </h1>

          {/* Right Section: Notifications and Profile */}
          <div className="flex items-center gap-5">
            {/* Notifications */}
            <button
              onClick={() => navigate("/notification")}
              className="relative bg-[#F2F2F2] p-[10px] rounded-full"
            >
              <IoIosNotificationsOutline size={22} />
              <span className="absolute top-1 right-1 bg-primary text-xs text-white px-1 rounded-full">
                2
              </span>
            </button>

            {/* Profile */}
            <Link to="/profile" className="flex items-center gap-2">
              <img
                src={
                  ownData?.data?.profileImg
                    ? `${ownData?.data?.profileImg}`
                    : "https://avatar.iran.liara.run/public/44"
                }
                className="w-8 md:w-10 h-8 md:h-10 object-cover rounded-full"
                alt="User Avatar"
              />
              <h3 className="hidden md:block text-gray-500 font-semibold">
                {ownData?.data?.fullName}
              </h3>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
