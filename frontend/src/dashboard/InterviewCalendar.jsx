import { useEffect, useState } from "react";

import { CalendarDays, Clock } from "lucide-react";

import toast from "react-hot-toast";

import {
    getInterviews ,
    updateInterview,
    deleteInterview
} from "../services/CandidateService";

function InterviewCalendar({ onEditInterview}) {

    const [interviews, setInterviews] = useState([]);

    const [editingInterview, setEditingInterview] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);

    const [editData, setEditData] = useState({
        interview_date: "",
        interview_time: "",
        interviewer: "",
        interview_type: "",
        round: "",
        meeting_link: "",
        notes: ""
  });

    useEffect(() => {

        loadInterviews();

    const handleDeleteInterview = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this interview?"
        );

        if (!confirmDelete) return;

        try {

            const response = await deleteInterview(id);

            if (response.success) {

                toast.success(response.message);

                loadInterviews();

            } else {

                toast.error(response.message);

            }

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete interview.");

        }

};

    }, []);

    const handleUpdateInterview = async () => {

    try {

        const response = await updateInterview(
            editingInterview.id,
            editData
        );

        toast.success(response.message);

        setShowEditModal(false);

        loadInterviews();

    } catch (error) {

        console.error(error);

        toast.error("Failed to update interview.");

    }

};

    const loadInterviews = async () => {

        try {

            const data = await getInterviews();

            setInterviews(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleDeleteInterview = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this interview?"
        );

        if (!confirmDelete) return;

        try {

            const response = await deleteInterview(id);

            if (response.success) {

                toast.success(response.message);

                loadInterviews();

            } else {

                toast.error(response.message);

            }

        } catch (error) {

            toast.error("Failed to delete interview.");

        }

    };

    return (

        <div className="bg-slate-900 rounded-2xl p-8 mt-10">

            <div className="flex items-center gap-3 mb-8">

                <CalendarDays
                    size={30}
                    className="text-cyan-400"
                />

                <h2 className="text-3xl font-bold text-white">

                    Interview Schedule

                </h2>

            </div>

            <div className="space-y-5">

                {

                    interviews.length === 0 ?

                    (

                        <p className="text-gray-400">

                            No interviews scheduled.

                        </p>

                    )

                    :

                    (

                        interviews.map((item) => (

                            <div

                                key={item.id}

                                className="bg-slate-800 rounded-xl p-5 flex justify-between items-center hover:bg-slate-700 transition-all"

                            >

                                <div>

                                    <h3 className="text-xl font-bold text-white">

                                        {item.name}

                                    </h3>

                                    <p className="text-gray-400">

                                        {item.email}

                                    </p>

                                    <p className="text-cyan-400 mt-2">

                                        {item.round} 

                                    </p>

                                    <button
                                        onClick={() => {
                                            setEditingInterview(item);

                                            setEditData({
                                                interview_date: item.date,
                                                interview_time: item.time,
                                                interviewer: item.interviewer,
                                                interview_type: item.type,
                                                round: item.round,
                                                meeting_link: item.meeting_link,
                                                notes: item.notes || ""
                                        });

                                        setShowEditModal(true);
                                    }}
                                    className="mt-3 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-white"
                                >
                                    ✏️ Edit
                                </button>

                                </div>

                                <div className="text-right">

                                    <div className="flex items-center gap-2 justify-end text-green-400">

                                        <CalendarDays size={18} />

                                        {item.date}

                                    </div>

                                    <div className="flex items-center gap-2 justify-end text-yellow-400 mt-2">

                                        <Clock size={18} />

                                        {item.time}

                                    </div>

                                    <p className="text-gray-400 mt-2">

                                        {item.type}

                                    </p>

                                    <div className="flex justify-end gap-2 mt-4">
                                        

                                       <button
                                            onClick={() => {
                                                setEditingInterview(item);

                                                setEditData({
                                                    interview_date: item.date || "",
                                                    interview_time: item.time || "",
                                                    interviewer: item.interviewer || "",
                                                    interview_type: item.type || "",
                                                    round: item.round || "",
                                                    meeting_link: item.meeting_link || "",
                                                    notes: item.notes || ""
                                                });

                                                setShowEditModal(true);
                                            }}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-all"
                                        >
                                            ✏️ Reschedule
                                        </button>

                                        <button
                                            onClick={() => handleDeleteInterview(item.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                                >
                                            ❌ Cancel
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    )

                }

            </div>

        {showEditModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                <div className="bg-slate-900 rounded-2xl p-8 w-[550px] border border-slate-700">

                    <h2 className="text-3xl font-bold text-white mb-6">
                        ✏️ Edit Interview
                    </h2>

                    <button
                        onClick={() => handleDeleteInterview(editingInterview.id)}
                        className="mt-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
                    >
                        🗑 Delete
                    </button>

                <div className="space-y-4">

                    <input
                        type="date"
                        value={editData.interview_date}
                        onChange={(e) =>
                            setEditData({
                                ...editData,
                                interview_date: e.target.value
                           })
                        }
                        className="w-full bg-slate-800 text-white p-3 rounded-lg"
                    />

                    <input
                        type="time"
                        value={editData.interview_time}
                        onChange={(e) =>
                            setEditData({
                                ...editData,
                                interview_time: e.target.value
                            })
                        }
                        className="w-full bg-slate-800 text-white p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        placeholder="Interviewer"
                        value={editData.interviewer}
                        onChange={(e) =>
                            setEditData({
                                ...editData,
                                interviewer: e.target.value
                            })
                        }
                        className="w-full bg-slate-800 text-white p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        placeholder="Meeting Link"
                        value={editData.meeting_link}
                        onChange={(e) =>
                            setEditData({
                                ...editData,
                                meeting_link: e.target.value
                            })
                        }
                        className="w-full bg-slate-800 text-white p-3 rounded-lg"
                    />

                </div>

                <div className="flex justify-end gap-4 mt-8">

                    <button
                        onClick={() => setShowEditModal(false)}
                        className="bg-gray-600 px-5 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdateInterview}
                        className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg"
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </div>
        )}

    </div>
);

}

export default InterviewCalendar;