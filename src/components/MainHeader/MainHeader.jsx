import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const MainHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full ">
      <header className="bg-white">
        <div className="flex justify-end items-center gap-5 px-10 h-[90px]">
          {/* Notifications */}
          <button
            onClick={() => {
              navigate("/notification");
            }}
            className="relative bg-[#F2F2F2]  p-[10px] rounded-full"
          >
            <IoIosNotificationsOutline size={22} />
            <span className="absolute top-1 right-1 bg-primary text-xs text-white px-1 rounded-full">
              2
            </span>
          </button>

          {/* Profile */}
          <Link to={`/profile`} className="flex items-center gap-2">
            <img
              src="/avatar.png"
              className="w-10 h-10 object-cover rounded-full border-[1px] border-primary"
              alt="User Avatar"
            />
            <h3 className="text-gray-500 font-semibold">Mr.Zuberi</h3>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
