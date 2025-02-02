/* eslint-disable no-unused-vars */
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import {
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from "../../redux/api/privacyPolicyApi";

const PrivacyPolicyPage = () => {
  const [content, setContent] = useState("");

  const { data } = useGetPrivacyPolicyQuery();
  const [updatePrivacyPolicy, { isLoading }] = useUpdatePrivacyPolicyMutation();

  useEffect(() => {
    if (data?.data?.length) {
      setContent(data.data[0].message || "");
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!content.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Privacy policy cannot be empty!",
      });
      return;
    }
  
    const finalData = { Privacy: { message: content } };
  
    try {
      const response = await updatePrivacyPolicy(finalData).unwrap();
  
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response?.message || "Privacy Policy Updated Successfully",
      });
    } catch (error) {
      console.error("API Error:", error);
  
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error?.data?.errorSources?.[0]?.message ||
          error?.data?.message ||
          "Something went wrong!",
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
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
