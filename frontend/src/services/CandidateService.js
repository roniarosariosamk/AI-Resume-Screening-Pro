import axios from "axios";

const API_URL = "http://localhost:8000";

// Get all candidates
export const getAllCandidates = async () => {
    
    const response = await axios.get(`${API_URL}/candidates`);
    return response.data;
};


// Get Single Candidate
export const getCandidate = async (id) => {

    const response = await axios.get(
        `${API_URL}/candidate/${id}`
    );

    return response.data;

};

// Update candidate status
export const updateCandidateStatus = async (id, status) => {
    const response = await axios.put(
        `${API_URL}/candidate/${id}/status`,
        {
            status: status
        }
    );

    return response.data;
};

// Update Recruiter Notes

export const updateCandidateNotes = async (id, notes) => {

    const response = await axios.put(

        `${API_URL}/candidate/${id}/notes`,

        {

            notes: notes

        }

    );

    return response.data;
};

// Dashboard Statistics

export const getDashboardStats = async () => {

    const response = await axios.get(
        `${API_URL}/dashboard-stats`
    );

    return response.data;

};

export const toggleFavorite = async (id) => {

    const response = await axios.put(

        `http://127.0.0.1:8000/candidate/${id}/favorite`

    );

    return response.data;

};

export const scheduleInterview = async (interviewData) => {

    const response = await fetch("http://127.0.0.1:8000/interview", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(interviewData)

    });

    return await response.json();

};

export const getATSDistribution = async () => {

    const response = await fetch(

        "http://127.0.0.1:8000/analytics/ats-distribution"

    );

    return await response.json();

};

export const getHiringInsights = async () => {

    const response = await fetch(
        "http://127.0.0.1:8000/analytics/insights"
    );

    return await response.json();

};

export const getTopCandidates = async () => {

    const response = await fetch(
        "http://127.0.0.1:8000/analytics/top-candidates"
    );

    return await response.json();

};

export const getSkillsAnalytics = async () => {

    const response = await fetch(
        "http://127.0.0.1:8000/analytics/skills"
    );

    return await response.json();

};

export const getInterviews = async () => {

    const response = await fetch(
        "http://127.0.0.1:8000/interviews"
    );

    return await response.json();

};

export const updateInterview = async (id, data) => {

    const response = await fetch(
        `http://127.0.0.1:8000/interview/${id}`,
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

export const deleteInterview = async (id) => {

    const response = await fetch(
        `http://127.0.0.1:8000/interview/${id}`,
        {
            method: "DELETE"
        }
    );

    return await response.json();

};
