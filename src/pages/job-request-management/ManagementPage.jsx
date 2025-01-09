import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import JobRequest from "./JobRequest";
import RaisedTickets from "./RaisedTickets";

function ManagementPage() {
  const [activeTab, setActiveTab] = useState("jobRequest");

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between pb-5">
        {/* Tab Navigation Section */}
        <div className="flex justify-center items-center gap-5 text-md md:text-xl font-semibold my-5">
          <p
            onClick={() => setActiveTab("jobRequest")}
            className={`cursor-pointer pb-1 ${
              activeTab === "jobRequest"
                ? "text-primary border-b-2 border-primary"
                : "text-[#575757]"
            }`}
          >
            Job Request
          </p>
          <p
            onClick={() => setActiveTab("raisedTickets")}
            className={`cursor-pointer pb-1 ${
              activeTab === "raisedTickets"
                ? "text-primary border-b-2 border-primary"
                : "text-[#575757]"
            }`}
          >
            Raised Tickets
          </p>
        </div>

        <div className="relative w-[320px]">
          <input
            type="text"
            placeholder="Search..."
            className="border border-[#e5eaf2] py-3 pl-4 pr-[65px] outline-none w-full rounded-md "
          />

          <span className="bg-gray-300 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400 group">
            <IoSearch className="text-[1.3rem]  group-hover:text-gray-200" />
          </span>
        </div>
      </div>
      {/* Tab Content Section */}
      <div className="flex justify-center items-center rounded-md">
        <div className="w-full">
          {activeTab === "jobRequest" && <JobRequest />}
          {activeTab === "raisedTickets" && <RaisedTickets />}
        </div>
      </div>
    </div>
  );
}

export default ManagementPage;
