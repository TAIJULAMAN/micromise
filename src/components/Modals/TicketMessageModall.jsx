import { useState } from "react";
import { useCreateNotificationMutation } from "../../redux/api/notificationApi";
import Swal from "sweetalert2";

function TicketMessageModall({ setTicketMessageModall, job }) {
  console.log("jobs in ticket modal", job);
  const [createNotification] = useCreateNotificationMutation();
  const [message, setMessage] = useState("");
  const sendNotification = async () => {
    console.log(message, "message");
    const bodyData = {
      Notification: {
        message: message,
        status: "created",
        jobId: job?._id,
        userId: job?.userId?._id,
      },
    };
    // console.log(bodyData, "bodyData");
    const result = await createNotification(bodyData).unwrap();
    if (result?.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Message sent successfully",
      });
      setTicketMessageModall(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send message",
      });
    }
  };
  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-6 rounded shadow-lg px-10 w-[400px]">
        <h3 className="text-lg font-semibold mb-5 text-[#242424]">
          Write a message for the Client
        </h3>
        <textarea
          type="text"
          name="name"
          onChange={(e) => setMessage(e.target.value)}
          id="name"
          placeholder="Please respond to ticket #1234 raised by the client regarding incomplete work."
          className=" border-primary border outline-none px-4 w-full mt-1 min-h-[100px] bg-gray-200 rounded-md py-3"
        />
        <div className="flex justify-start gap-2 mt-5">
          <button
            onClick={() => {
              setTicketMessageModall(false);
            }}
            className="px-4 py-2 bg-white border border-primary text-primary rounded"
          >
            Cancle
          </button>
          <button
            onClick={sendNotification}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketMessageModall;
