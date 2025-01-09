
function MessageTechnisianModal({setMessageTechnisian}) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative bg-white p-6 rounded shadow-lg px-10 w-[400px]">
          <h3 className="text-lg font-semibold mb-5 text-[#242424]">
            Write a message for the Technisian
          </h3>
          <textarea
            type="text"
            name="name"
            id="name"
            placeholder="Please respond to ticket #1234 raised by the client regarding incomplete work."
            className=" border-primary border outline-none px-4 w-full mt-1 min-h-[100px] bg-gray-200 rounded-md py-3"
          />
          <div className="flex justify-start gap-2 mt-5">
            <button
              onClick={() => {
                setMessageTechnisian(false);
              }}
              className="px-4 py-2 bg-white border border-primary text-primary rounded"
            >
              Cancle
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded">
              Delete
            </button>
          </div>
        </div>
      </div> 
    )
}

export default MessageTechnisianModal
