import { useState } from "react";
import NotificationModal from "../../components/Modals/NotificationModal";

function NotificationPage() {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNotificationClick = (index) => {
    setClickedIndex(index);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between pb-5">
        <h3 className="font-semibold text-xl">Notification</h3>
        <button className="bg-primary text-white font-semibold px-6 py-2 rounded transition duration-200 hover:bg-primary/80">
          Read All
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <div
            key={item}
            className={`flex items-center justify-between py-3 px-4 rounded shadow transition ${
              clickedIndex === index
                ? "bg-secondary text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => handleNotificationClick(index)}
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-5">
                <h2 className="font-semibold">A new message has arrived</h2>
                <p className="text-xs text-gray-500">8:00am, today</p>
              </div>
              <p className="text-gray-500">
                A new content has been uploaded to car study
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`${
                clickedIndex === index
                  ? " text-white"
                  : "text-primary font-medium hover:underline"
              } px-4 py-2 rounded transition`}
            >
              View
            </button>
          </div>
        ))}
        {isModalOpen && <NotificationModal setIsModalOpen={setIsModalOpen} />}
      </div>
    </div>
  );
}

export default NotificationPage;
