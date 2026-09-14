import axios from "axios";
import API_BASE_URL from "../api/api";


// ======================================================
// AUTH HEADER
// ======================================================

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};


// ======================================================
// GET ALL CANDIDATES
// ======================================================

export const getAllCandidates = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/candidates`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// ======================================================
// GET SINGLE CANDIDATE
// ======================================================

export const getCandidate = async (candidateId) => {
  const response = await axios.get(
    `${API_BASE_URL}/candidate/${candidateId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// ======================================================
// UPDATE CANDIDATE STATUS
// ======================================================

export const updateCandidateStatus = async (
  candidateId,
  status
) => {
  const response = await axios.put(
    `${API_BASE_URL}/candidate/${candidateId}/status`,
    {
      status,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// ======================================================
// TOGGLE FAVORITE
// ======================================================

export const toggleFavorite = async (candidateId) => {
  const response = await axios.put(
    `${API_BASE_URL}/candidate/${candidateId}/favorite`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// ======================================================
// UPDATE CANDIDATE NOTES
// ======================================================

export const updateCandidateNotes = async (
  candidateId,
  notes
) => {
  const response = await axios.put(
    `${API_BASE_URL}/candidate/${candidateId}/notes`,
    {
      notes,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// ======================================================
// DASHBOARD STATS
// ======================================================

export const getDashboardStats = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/dashboard-stats`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// ======================================================
// ATS DISTRIBUTION
// ======================================================

export const getATSDistribution = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/analytics/ats-distribution`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// ======================================================
// TOP CANDIDATES
// ======================================================

export const getTopCandidates = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/analytics/top-candidates`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// ======================================================
// HIRING INSIGHTS
// ======================================================

export const getHiringInsights = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/analytics/insights`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// ======================================================
// SKILLS ANALYTICS
// ======================================================

export const getSkillsAnalytics = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/analytics/skills`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// ======================================================
// INTERVIEWS
// ======================================================

export const getInterviews = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/interviews`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// ======================================================
// SCHEDULE INTERVIEW
// ======================================================

export const scheduleInterview = async (interviewData) => {
  const response = await axios.post(
    `${API_BASE_URL}/interview`,
    interviewData,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// ======================================================
// UPDATE INTERVIEW
// ======================================================

export const updateInterview = async (
  interviewId,
  interviewData
) => {
  const response = await axios.put(
    `${API_BASE_URL}/interview/${interviewId}`,
    interviewData,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// ======================================================
// DELETE INTERVIEW
// ======================================================

export const deleteInterview = async (interviewId) => {
  const response = await axios.delete(
    `${API_BASE_URL}/interview/${interviewId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};