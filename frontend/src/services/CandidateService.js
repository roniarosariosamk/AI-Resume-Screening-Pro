import axios from "axios";
import API_BASE_URL from "../api/api";

// Get all candidates
export const getAllCandidates = async () => {
    const response = await axios.get(`${API_BASE_URL}/candidates`);
    return response.data;
};

// Get single candidate
export const getCandidate = async (id) => {
    const response = await axios.get(
        `${API_BASE_URL}/candidate/${id}`
    );
    return response.data;
};

// Update candidate status
export const updateCandidateStatus = async (id, status) => {
    const response = await axios.put(
        `${API_BASE_URL}/candidate/${id}/status`,
        {
            status
        }
    );

    return response.data;
};

// Update recruiter notes
export const updateCandidateNotes = async (id, notes) => {
    const response = await axios.put(
        `${API_BASE_URL}/candidate/${id}/notes`,
        {
            notes
        }
    );

    return response.data;
};

// Dashboard statistics
export const getDashboardStats = async () => {
    const response = await axios.get(
        `${API_BASE_URL}/dashboard-stats`
    );

    return response.data;
};

// Toggle favorite
export const toggleFavorite = async (id) => {
    const response = await axios.put(
        `${API_BASE_URL}/candidate/${id}/favorite`
    );

    return response.data;
};

// Schedule interview
export const scheduleInterview = async (interviewData) => {
    const response = await fetch(
        `${API_BASE_URL}/interview`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interviewData)
        }
    );

    return await response.json();
};

// ATS distribution
export const getATSDistribution = async () => {
    const response = await fetch(
        `${API_BASE_URL}/analytics/ats-distribution`
    );

    return await response.json();
};

// AI hiring insights
export const getHiringInsights = async () => {
    const response = await fetch(
        `${API_BASE_URL}/analytics/insights`
    );

    return await response.json();
};

// Top candidates
export const getTopCandidates = async () => {
    const response = await fetch(
        `${API_BASE_URL}/analytics/top-candidates`
    );

    return await response.json();
};

// Skills analytics
export const getSkillsAnalytics = async () => {
    const response = await fetch(
        `${API_BASE_URL}/analytics/skills`
    );

    return await response.json();
};

// Get interviews
export const getInterviews = async () => {
    const response = await fetch(
        `${API_BASE_URL}/interviews`
    );

    return await response.json();
};

// Update interview
export const updateInterview = async (id, data) => {
    const response = await fetch(
        `${API_BASE_URL}/interview/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    return await response.json();
};

// Delete interview
export const deleteInterview = async (id) => {
    const response = await fetch(
        `${API_BASE_URL}/interview/${id}`,
        {
            method: "DELETE"
        }
    );

    return await response.json();
};