import { useState } from "react";
import NotificationModal from "../../components/Modals/NotificationModal";
import { useGetAllNotificationQuery } from "../../redux/api/notificationApi";

function NotificationPage() {
  const [readNotifications, setReadNotifications] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: notificationData } = useGetAllNotificationQuery();
  console.log(notificationData);

  const handleNotificationClick = (index) => {
    setReadNotifications((prev) => new Set([...prev, index])); 
  };

  const handleReadAll = () => {
    const allIndexes = new Set(
      notificationData?.data?.map((_, index) => index)
    );
    setReadNotifications(allIndexes); 
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
        {notificationData?.data?.map((info, index) => {
          const isRead = readNotifications.has(index);

          return (
            <div
              key={index}
              className={`flex items-center justify-between py-3 px-4 rounded shadow transition ${
                isRead ? "bg-white" : "bg-secondary text-white"
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-5">
                  <h2 className="font-semibold">A new message has arrived.</h2>
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
                  handleNotificationClick(index);
                  setIsModalOpen(true);
                }}
                className={`${
                  isRead
                    ? "text-primary font-medium hover:underline"
                    : "text-white"
                } px-4 py-2 rounded transition`}
              >
                View
              </button>
            </div>
          );
        })}
        {isModalOpen && <NotificationModal setIsModalOpen={setIsModalOpen} />}
      </div>
    </div>
  );
}

export default NotificationPage;
