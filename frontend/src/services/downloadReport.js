import axios from "axios";
import API_BASE_URL from "../api/api";

export const downloadReport = async (candidate) => {
  const response = await axios.post(
    `${API_BASE_URL}/download-report`,
    candidate,
    {
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;

  link.setAttribute(
    "download",
    `${candidate.name}_AI_Report.pdf`
  );

  document.body.appendChild(link);

  link.click();

  link.remove();
};