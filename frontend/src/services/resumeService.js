import axios from "axios";
import API_BASE_URL from "../api/api";

/* =========================================================
   AUTH HEADERS
========================================================= */

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};


/* =========================================================
   UPLOAD RESUME + JOB DESCRIPTION
========================================================= */

export const uploadResume = async (resumeFiles, jdFile) => {
  try {
    const formData = new FormData();

    // Add resume files
    resumeFiles.forEach((file) => {
      formData.append("resume", file);
    });

    // Add job description
    formData.append("jd", jdFile);

    const response = await axios.post(
      `${API_BASE_URL}/upload`,
      formData,
      {
        headers: getAuthHeaders(),
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Resume upload failed:",
      error.response?.data || error.message
    );

    throw error;
  }
};


/* =========================================================
   DOWNLOAD PDF REPORT
========================================================= */

export const downloadReport = async (candidate) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/download-report`,
      {
        candidate_id: candidate.id,
      },
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );

    // Create downloadable file
    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.setAttribute(
      "download",
      `${candidate.name || "Candidate"}_Report.pdf`
    );

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(
      "PDF report download failed:",
      error.response?.data || error.message
    );

    throw error;
  }
};


/* =========================================================
   DOWNLOAD CSV
========================================================= */

export const downloadCSV = async (candidates) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/download-csv`,
      candidates,
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      "Resume_Screening_Results.csv"
    );

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(
      "CSV download failed:",
      error.response?.data || error.message
    );

    throw error;
  }
};


/* =========================================================
   DOWNLOAD EXCEL
========================================================= */

export const downloadExcel = async (candidates) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/download-excel`,
      candidates,
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      "Resume_Screening_Results.xlsx"
    );

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(
      "Excel download failed:",
      error.response?.data || error.message
    );

    throw error;
  }
};