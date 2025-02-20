import { useState } from "react";
import NotificationModal from "../../components/Modals/NotificationModal";
import {
  useGetAllNotificationQuery,
  useGetAllReadNotificationQuery,
} from "../../redux/api/notificationApi";

function NotificationPage() {
  // const [readNotifications, setReadNotifications] = useState(new Set());
  const [isAllRead, setisAllRead] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data: notificationData, refetch } = useGetAllNotificationQuery();


  // const handleNotificationClick = (index) => {
  //   setReadNotifications((prev) => new Set([...prev, index]));
  // };

  const { data: readNotificationData } = useGetAllReadNotificationQuery(
    undefined,
    {
      skip: !isAllRead,
    }
  );
  console.log(readNotificationData?.data);

  const handleReadAll = () => {
    setisAllRead(true);
    refetch();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between pb-5">
        <h3 className="font-semibold text-xl text-primary">Notifications</h3>
        <button
          onClick={handleReadAll}
          className="bg-primary text-white font-semibold px-6 py-2 rounded transition duration-200 hover:bg-primary/80"
        >
          Read All
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {notificationData?.data?.map((info, index) =>  (
            <div
              key={index}
              className={`flex items-center justify-between py-3 px-4 rounded shadow transition ${
                info?.isRead ? "bg-white" : "bg-secondary text-white"
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-5">
                  <h2 className="font-semibold">
                    {info?.status == "created"
                      ? "New notification about creation"
                      : info?.status == "raised"
                      ? "New notification about technisian"
                      : "New Notification"}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {new Date(info?.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
                <p className="text-gray-500">{info?.message}</p>
              </div>
              <button
                onClick={() => {
                  // handleNotificationClick(index);
                  setIsModalOpen(true);
                  setCurrentRecord(info);
                }}
                className={`${
                  info?.isRead
                    ? "text-primary font-medium hover:underline"
                    : "text-white"
                } px-4 py-2 rounded transition`}
              >
                View
              </button>
            </div>
          ))
        }
        {isModalOpen && (
          <NotificationModal
            setIsModalOpen={setIsModalOpen}
            currentRecord={currentRecord}
          />
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
