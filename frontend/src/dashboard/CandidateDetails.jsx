import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
    getCandidate,
    updateCandidateStatus,
    updateCandidateNotes
} from "../services/CandidateService";
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import { 
    scheduleInterview, 
    updateInterview
} from "../services/CandidateService";
import toast from "react-hot-toast";

function CandidateDetails() {

    const { id } = useParams();

    const [candidate, setCandidate] = useState(null);

    const [notes, setNotes] = useState("");

    const [showInterviewModal, setShowInterviewModal] = useState(false);

    const [interviewData, setInterviewData] = useState({

        interview_date: "",

        interview_time: "",

        interviewer: "",

        interview_type: "Online",

        meeting_link: "",

        round: "HR Round",

        notes: ""

    });

    const [loading, setLoading] = useState(false);

    const [editingInterview, setEditingInterview] = useState(null);

    useEffect(() => {

        loadCandidate();

    }, []);

    const loadCandidate = async () => {

        try {


            const data = await getCandidate(id);

            setCandidate(data);

            setNotes(data.notes || "");

        } catch (error) {

            console.error(error);

        }

    };

    const handleStatusChange = async (e) => {

        const newStatus = e.target.value;

        try {

            await updateCandidateStatus(
                candidate.id,
                newStatus
            );

            loadCandidate();

            toast.success("Status Updated Successfully!");

        }   

        catch (error) {

            console.error(error);

            toast.error("Failed to update status.");

        }

    };

    const handleSaveNotes = async () => {

        try {

            await updateCandidateNotes(
                candidate.id,
                notes
            );

            toast.success("Notes Saved Successfully!");

            loadCandidate();

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to save notes.");

        }

    };  

    const handleEditInterview = (interview) => {

        setEditingInterview(interview);

        setInterviewData({

            interview_date: interview.date,

            interview_time: interview.time,

            interviewer: interview.interviewer,

            interview_type: interview.type,

            meeting_link: interview.meeting_link,

            round: interview.round,

            notes: interview.notes || ""

        });

        setShowInterviewModal(true);

    };

    const handleSaveInterview = async () => {

    try {

        setLoading(true);

        const payload = {

            candidate_id: candidate.id,

            ...interviewData

        };

        let response;

        if (editingInterview) {

            response = await updateInterview(
                editingInterview.id,
                payload
            );

        } else {

            response = await scheduleInterview(payload);

        }
            
        console.log("Backend Response:", response);
        toast.success(response.message);

            setShowInterviewModal(false);

        } catch (error) {

            console.error(error);

            toast.error("Failed to schedule interview.");

        } finally {

            setLoading(false);  

        }

    };

    if (!candidate) {

        return (

            <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white">

                Loading Candidate...

            </div>

        );

    }

    return (
        <>
        <div className="min-h-screen bg-slate-950 text-white p-10">

            <div className="max-w-5xl mx-auto">

            <div className="bg-slate-900 rounded-3xl p-8 shadow-xl">

                    <h1 className="text-4xl font-bold text-white">

                        {candidate.name}

                    </h1>

                    <div className="mt-6 flex gap-4">

                        <button
                            className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg transition-all"
                            onClick={() => setShowInterviewModal(true)}
                        >
                            📅 Schedule Interview
                        </button>

                    </div>

                    <p className="text-gray-400 mt-2">

                        Recruiter Candidate Profile

                    </p>

                    <div className="grid grid-cols-2 gap-8 mt-10">

                        <div>

                            <h2 className="text-xl font-semibold text-cyan-300 mb-4">

                                Candidate Information

                            </h2>

                            <p><strong>Email :</strong> {candidate.email}</p>

                            <p className="mt-3">

                                <strong>Phone :</strong> {candidate.phone}

                            </p>

                    <div className="mt-4">

                        <strong>Status</strong>

                        <select

                            value={candidate.status}

                            onChange={handleStatusChange}

                            className="
                                mt-2
                                block
                                bg-slate-800
                                border
                                border-slate-700
                                rounded-lg
                                px-4
                                py-2
                                text-white
                                focus:outline-none
                                focus:border-cyan-400
                            "

                        >

                            <option value="Pending">

                                Pending

                            </option>

                            <option value="Shortlisted">

                                Shortlisted

                            </option>

                            <option value="Rejected">

                                Rejected

                            </option>

                        </select>

                    </div>


                        </div>

                        <div>

                            <h2 className="text-xl font-semibold text-cyan-300 mb-4">

                                AI Analysis

                            </h2>

                            <div className="grid grid-cols-2 gap-10">

                                <div>

                                    <CircularProgressbar

                                        value={candidate.ats_score}

                                        text={`${candidate.ats_score}%`}

                                        styles={buildStyles({

                                            textColor: "#06b6d4",

                                            pathColor: "#06b6d4",

                                            trailColor: "#1e293b"

                                    })}

                                />

                                <p className="text-center mt-4 font-bold text-cyan-300">

                                    ATS Score

                                </p>

                            </div>

                             <div>

                                <CircularProgressbar

                                    value={candidate.jd_match_score}

                                    text={`${candidate.jd_match_score}%`}

                                    styles={buildStyles({

                                        textColor: "#22c55e",

                                        pathColor: "#22c55e",

                                        trailColor: "#1e293b"

                                    })}

                                />

                                <p className="text-center mt-4 font-bold text-green-300">

                                    JD Match

                                </p>

                            </div>

                        </div>

                            <p className="mt-3">

                                <strong>Recommendation :</strong> {candidate.recommendation}

                            </p>

                        </div>

                    </div>

                    {/* ================= AI Candidate Summary ================= */}

                    <div className="mt-12">

                        <h2 className="text-2xl font-bold text-cyan-300 mb-4">

                            🤖 AI Candidate Summary

                        </h2>

                        <div className="bg-slate-800 rounded-2xl p-6 border border-cyan-500">

                            <p className="text-gray-300 leading-8">

                                {candidate.summary || "No AI Summary Available"}

                            </p>

                        </div>

                    </div>

                    {/* Strengths */}

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold text-green-400 mb-5">

                            ⭐ Strengths

                        </h2>

                        <div className="grid grid-cols-2 gap-4">

                            {candidate.strengths.map((strength, index) => (

                                <div

                                    key={index}

                                    className="
                                        bg-green-900/20
                                        border
                                        border-green-500
                                        rounded-xl
                                        p-4
                                        text-green-300
                                    "

                                >

                                    ✅ {strength}

                                </div>

                          ))}

                        </div>

                    </div>

                    {/* Weaknesses */}

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold text-red-400 mb-5">

                            ⚠ Weaknesses

                        </h2>

                        <div className="grid grid-cols-2 gap-4">

                            {candidate.weaknesses.map((weakness, index) => (

                                <div

                                    key={index}

                                    className="
                                        bg-red-900/20
                                        border
                                        border-red-500
                                        rounded-xl
                                        p-4
                                        text-red-300
                                   "

                                >

                                    ❌ {weakness}

                                </div>

                          ))}

                        </div>

                    </div>

                    {/* Matched Skills */}

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold text-cyan-300 mb-5">

                            🎯 Matched Skills

                        </h2>

                        <div className="flex flex-wrap gap-3">

                            {candidate.matched_skills.map((skill, index) => (

                                <span

                                    key={index}

                                    className="
                                        bg-cyan-500/20
                                        border
                                        border-cyan-400
                                        text-cyan-300
                                        px-4
                                        py-2
                                        rounded-full
                                        font-medium
                                    "

                                >

                                    {skill}

                                </span>

                            ))}

                        </div>

                    </div>

                    {/* Missing Skills */}

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold text-orange-400 mb-5">

                            ❌ Missing Skills

                        </h2>

                        <div className="flex flex-wrap gap-3">

                            {candidate.missing_skills.map((skill, index) => (

                                <span

                                    key={index}

                                    className="
                                        bg-orange-500/20
                                        border
                                        border-orange-400
                                        text-orange-300
                                        px-4
                                        py-2
                                        rounded-full
                                        font-medium
                                   "
                              
                                >

                                    {skill}

                                </span>

                            ))}

                        </div>

                    </div>


                    {/* AI Suggestions */}

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold text-yellow-400 mb-5">

                            💡 AI Improvement Suggestions

                        </h2>

                        <div className="grid grid-cols-2 gap-4">

                            {candidate.suggestions.map((suggestion, index) => (

                                <div

                                    key={index}

                                    className="
                                        bg-yellow-500/10
                                        border
                                        border-yellow-500
                                        rounded-xl
                                        p-5
                                        text-yellow-200
                                        hover:scale-105
                                        transition-all
                                        duration-300
                                    "

                                >

                                    🚀 {suggestion}

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* AI Recommendation */}

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold text-cyan-300 mb-5">

                            🤖 AI Hiring Recommendation

                        </h2>

                        <div className="bg-slate-800 rounded-2xl p-6 border border-cyan-500">

                            <h3 className="text-3xl font-bold text-cyan-400">

                                {candidate.recommendation}

                            </h3>

                            <p className="mt-5 text-lg">

                                <strong>Confidence:</strong>

                                {" "}

                                {candidate.confidence}%

                            </p>

                            <p className="mt-5 text-gray-300 leading-8">

                                {candidate.recommendation_reason}

                            </p>

                        </div>

                    </div>

                    {/* ================= AI Interview Questions ================= */}

                    <div className="mt-12">

                        <h2 className="text-2xl font-bold text-cyan-300 mb-6">

                            🎤 AI Interview Questions

                        </h2>

                        <div className="space-y-5">

                            {candidate.interview_questions.map((item, index) => (

                                <div

                                    key={index}

                                    className="
                                        bg-slate-800
                                        rounded-2xl
                                        p-6
                                        border
                                        border-slate-700
                                        hover:border-cyan-400
                                        transition-all
                                        duration-300
                                    "

                                >

                                    <div className="flex justify-between items-center ">


                                        <span
                                            className={`
                                            px-4
                                            py-1
                                            rounded-full
                                            text-sm
                                            font-semibold

                                            ${
                                                item.difficulty === "Easy"
                                                    ? "bg-green-500/20 text-green-400"

                                                : item.difficulty === "Medium"
                                                    ? "bg-yellow-500/20 text-yellow-400"

                                                : "bg-red-500/20 text-red-400"
                                            }
                                       `}
                                    >

                                        {item.difficulty}

                                    </span>

                                    <span className="text-cyan-400">

                                        {item.category}

                                    </span>

                                </div>

                                <p className="text-gray-300 leading-8">

                                    {item.question}

                                </p>

                            </div>

                        ))}

                    </div>

                </div>

                    <div className="mt-12">

                        <h2 className="text-2xl font-bold text-cyan-300 mb-4">

                            Recruiter Notes

                        </h2>

                        <textarea

                            value={notes}

                            onChange={(e)=>setNotes(e.target.value)}

                            rows={6}

                            className="
                                w-full
                                bg-slate-800
                                border
                                border-slate-700
                                rounded-xl
                                p-5
                                text-white
                                resize-none
                                focus:outline-none
                                focus:border-cyan-400
                            "

                        />

                        <button

                            onClick={handleSaveNotes}

                            className="
                                mt-5
                                bg-cyan-500
                                hover:bg-cyan-600
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                transition
                            "

                        >

                            💾 Save Notes

                        </button>

                    </div>


                    {/* Resume Section */}

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold text-cyan-300 mb-4">

                            Resume

                        </h2>

                        <a

                            href={`http://127.0.0.1:8000/uploads/${candidate.resume_file}`}

                            target="_blank"

                            rel="noopener noreferrer"

                            className="
                                inline-flex
                                items-center
                                bg-cyan-500
                                hover:bg-cyan-600
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                transition-all
                                duration-300
                            "

                        >

                            📄 Open Resume

                        </a>

                    </div>

                </div>

            </div>

        </div>

        {showInterviewModal && (

            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                <div className="bg-slate-900 rounded-2xl p-8 w-[550px] border border-slate-700">

                    <h2 className="text-3xl font-bold text-white mb-6">

                        📅 Schedule Interview

                    </h2>

                    <div className="space-y-4">

                        <input
                            type="date"

                            value={interviewData.interview_date}
                            onChange={(e) =>
                                setInterviewData({
                                    ...interviewData,
                                    interview_date: e.target.value
                                })
                            }
                            className="w-full bg-slate-800 text-white p-3 rounded-lg"
                        />

                        <input
                            type="time"

                            value={interviewData.interview_time}

                            onChange={(e) =>
                                setInterviewData({
                                    ...interviewData,
                                    interview_time: e.target.value
                                })
                            }
                            className="w-full bg-slate-800 text-white p-3 rounded-lg"
                        />

                        <input
                            type="text"

                            placeholder="Interviewer Name"

                            value={interviewData.interviewer}

                            onChange={(e) =>
                                setInterviewData({
                                    ...interviewData,
                                    interviewer: e.target.value
                                })
                            }

                            className="w-full bg-slate-800 text-white p-3 rounded-lg"
                        />



                    <select

                        value={interviewData.interview_type}

                        onChange={(e) =>
                            setInterviewData({
                                ...interviewData,
                                interview_type: e.target.value
                            })
                        }

                        className="w-full bg-slate-800 text-white p-3 rounded-lg"

                    >

                        <option>Online</option>

                        <option>Offline</option>

                    </select>

                    <select

                        value={interviewData.round}

                        onChange={(e) =>
                            setInterviewData({
                                ...interviewData,
                                round: e.target.value
                            })
                        }
                        
                        className="w-full bg-slate-800 text-white p-3 rounded-lg"
                    >

                        <option>HR Round</option>

                        <option>Technical Round</option>

                        <option>Manager Round</option>

                        <option>Final Round</option>

                    </select>


                        <input
                           type="text"

                            placeholder="Meeting Link"

                            value={interviewData.meeting_link}

                            onChange={(e) =>
                                setInterviewData({
                                    ...interviewData,
                                    meeting_link: e.target.value
                                })
                            }

                            className="w-full bg-slate-800 text-white p-3 rounded-lg"
                        />

                    
                        <textarea

                            rows="4"

                            placeholder="Notes"

                            value={interviewData.notes}

                            onChange={(e) =>
                                setInterviewData({
                                    ...interviewData,
                                    notes: e.target.value
                                })
                            }
                            

                            className="w-full bg-slate-800 text-white p-3 rounded-lg"
                        />

                    </div>

                    <div className="flex justify-end gap-4 mt-8">

                        <button

                            onClick={() => setShowInterviewModal(false)}

                            className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white"

                        >

                            Cancel

                        </button>

                        <button
                            onClick={handleSaveInterview}
                            disabled={loading}
                            className={`px-6 py-2 rounded-lg text-white transition-all ${
                                loading
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : "bg-cyan-500 hover:bg-cyan-600"
                           }`}
                        >
                            {loading ? "⏳ Scheduling..." : "Save Interview"}
                        </button>

                    </div>

                </div>

            </div>

        )}

        </>

    );

}

export default CandidateDetails;