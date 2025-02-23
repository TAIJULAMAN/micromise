import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import {
  useGetTermsQuery,
  useUpdateTermsAndConditionMutation,
} from "../../redux/api/termsAndConditionApi";

const TermsConditions = () => {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch data from the backend
  const { data: termsData, isLoading: isFetching, error } = useGetTermsQuery();

  const [updateTerms] = useUpdateTermsAndConditionMutation();

  useEffect(() => {
    if (termsData?.data?.message) {
      setContent(termsData?.data?.message);
    }
  }, [termsData]);

  const handleSave = async () => {
    const finalData = {
      Term: { message: content },
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the changes to Terms & Conditions?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then(async (result) => {
      if (result?.isConfirmed) {
        try {
          setIsSaving(true);
          const response = await updateTerms(finalData).unwrap();
          console.log("Updated Response:", response);

          Swal.fire({
            icon: "success",
            title: "Saved!",
            text: "Terms & Conditions updated successfully.",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          setIsSaving(false);
        } catch (error) {
          console.error("Error updating content:", error);

          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to save Terms & Conditions. Please try again.",
          });

          setIsSaving(false);
        }
      }
    });
  };

  return (
    <div className="p-5 bg-white">
      {/* Page Header */}
      <h1 className="text-start text-3xl font-bold mb-5">
        Terms & Conditions
      </h1>

      {/* Loading state */}
      {isFetching && (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 animate-spin rounded-full border-dashed border-10 border-primary"></div>

        </div>
      )}

      {/* Editor Container */}
      {!isFetching && (
        <div className="border border-bg rounded-md p-5">
          <ReactQuill
            style={{ height: 300, padding:"10px" }}
            theme="snow"
            value={content}
            onChange={setContent}
          />

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full px-10 py-3 mt-20 rounded bg-primary text-white font-semibold shadow-lg flex items-center justify-center ${
              isSaving ? "opacity-50 cursor-not-allowed" : "hover:bg-primary"
            }`}
            type="submit"
          >
            {isSaving ? "Saving..." : "Save & Change"}
          </button>
        </div>
      )}

      {/* Error handling */}
      {error && (
        <div className="mt-6 text-center text-red-600">
          <p>Error fetching data: {error.message || "Something went wrong."}</p>
        </div>
      )}
    </div>
  );
};

export default TermsConditions;
