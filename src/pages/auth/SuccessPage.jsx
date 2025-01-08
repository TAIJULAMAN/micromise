import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 md:w-[60%]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="w-full md:w-1/2 bg-white p-8">
            <h2 className="text-[#6F6F6F] text-2xl md:text-3xl font-bold text-center mb-6">
            Congratulations
            </h2>

            {/* Submit Button */}
            <Link to="/">
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-lg mt-10"
              >
                Continue
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/2 text-center">
            <p className="text-[#6F6F6F] text-lg">
              Your password has been updated, please change your password
              regularly to avoid this happening
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
