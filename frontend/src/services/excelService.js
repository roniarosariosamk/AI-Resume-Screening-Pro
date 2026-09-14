import axios from "axios";
import API_BASE_URL from "../api/api";
import toast from "react-hot-toast";

export const downloadExcel = async (candidateIds) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/download-excel`,
      candidateIds,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Candidate_Report.xlsx");

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);

    toast.success("Excel report downloaded!");
  } catch (error) {
    console.error("Excel download failed:", error);
    toast.error("Failed to download Excel report.");
    throw error;
  }
};