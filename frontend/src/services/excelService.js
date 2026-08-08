import axios from "axios";
import API_BASE_URL from "../api/api";
import toast from "react-hot-toast";

export const downloadExcel = async (candidates) => {

  try {

    console.log("✅ Excel button clicked");
    console.log("Candidates:", candidates);

    const response = await axios.post(

      `${API_BASE_URL}/download-excel`,

      candidates,

      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }

    );

    console.log("✅ Excel response received");

    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement("a");

    link.href = url;

    link.download = "Candidate_Report.xlsx";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

  }

  catch (error) {

    console.error("❌ Excel Download Error:", error);

    if (error.response) {

      console.log("Status:", error.response.status);

      console.log("Response:", error.response.data);

      if (error.response.data instanceof Blob) {

        error.response.data.text().then(text => {

          console.log("Backend Error:", text);

        });

      }

    }

    toast.error("Excel download failed. Check browser console.");

  }

};