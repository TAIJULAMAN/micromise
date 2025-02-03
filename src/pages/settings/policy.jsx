import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import {
  useAddPrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
} from "../../redux/api/privacyPolicyApi";
import Swal from "sweetalert2";

const PrivacyPolicyPage = () => {
  const [content, setContent] = useState("");

  // Fetch privacy policy
  const {
    data: privacyData,
    isLoading: isFetching,
    error,
  } = useGetPrivacyPolicyQuery();
  console.log("Fetched Privacy Policy Data:", privacyData);

  useEffect(() => {
    if (privacyData?.data?._id) {
      setContent(privacyData?.data?.message);
      console.log("Privacy Policy set in api:", privacyData?.data?.message);
    }
  }, [privacyData]);

  const [addPrivacyPolicy, { isLoading: isAdding }] =
    useAddPrivacyPolicyMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(e);

    if (!content.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Privacy policy cannot be empty!",
      });
      return;
    }

    const finalData = {
      Privacy: { message: content },
    };
    console.log("Privacy Policy final Data:", finalData);

    try {
      const response = await addPrivacyPolicy(finalData).unwrap();
      console.log("Privacy Policy Added Successfully:", response);
      setContent(response?.data?.message);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Privacy Policy Added Successfully.",
      });
    } catch (error) {
      console.error("API Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.data?.error || "Something went wrong!",
      });
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="container mx-auto p-6">
      <h3 className="font-semibold pb-5 text-xl">Privacy Policy</h3>

      <div className="bg-white p-4 shadow rounded">
        {isFetching && (
          <p className="text-gray-500">Loading privacy policy...</p>
        )}
        {error && (
          <p className="text-red-500">
            Error loading privacy policy. Try again.
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block font-medium mb-2">Edit Privacy Policy</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="Write your privacy policy here..."
            modules={quillModules}
            formats={quillFormats}
            className="h-96 mb-10"
          />

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="bg-[#4A5D4E] hover:bg-primary/80 text-white font-semibold px-6 py-2 rounded transition duration-200"
              disabled={isAdding}
            >
              {isAdding ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
