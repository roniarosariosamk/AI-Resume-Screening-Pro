import { Link } from "react-router-dom";
import { Eye, Star } from "lucide-react";

import { toggleFavorite } from "../services/CandidateService";

function CandidateTable({ candidates = [] }) {

    const handleFavorite = async (id) => {

        try {

            await toggleFavorite(id);

            // Refresh to show updated favorite
            window.location.reload();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="mt-10 bg-slate-900 rounded-2xl overflow-hidden shadow-xl">

            <table className="w-full">

                <thead className="bg-slate-800 text-cyan-300">

                    <tr>

                        <th className="p-4 text-left">⭐</th>

                        <th className="p-4 text-left">Candidate</th>

                        <th className="p-4 text-left">Email</th>

                        <th className="p-4 text-center">ATS</th>

                        <th className="p-4 text-center">JD Match</th>

                        <th className="p-4 text-center">Status</th>

                        <th className="p-4 text-center">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {candidates.map((candidate) => (

                        <tr

                            key={candidate.id}

                            className="border-b border-slate-800 hover:bg-slate-800 transition-all"

                        >

                            {/* Favorite */}

                            <td className="p-4">

                                <button

                                    onClick={() => handleFavorite(candidate.id)}

                                >

                                    <Star

                                        size={22}

                                        fill={
                                            candidate.favorite === 1
                                                ? "#facc15"
                                                : "none"
                                        }

                                        color={
                                            candidate.favorite === 1
                                                ? "#facc15"
                                                : "#94a3b8"
                                        }

                                    />

                                </button>

                            </td>

                            {/* Name */}

                            <td className="p-4 font-semibold text-white">

                                {candidate.name}

                            </td>

                            {/* Email */}

                            <td className="p-4 text-gray-300">

                                {candidate.email}

                            </td>

                            {/* ATS */}

                            <td className="p-4 text-center text-cyan-400 font-bold">

                                {candidate.ats_score}%

                            </td>

                            {/* JD Match */}

                            <td className="p-4 text-center text-green-400 font-bold">

                                {candidate.jd_match_score}%

                            </td>

                            {/* Status */}

                            <td className="p-4 text-center">

                                <span

                                    className={`

                                        px-4

                                        py-1

                                        rounded-full

                                        text-sm

                                        font-semibold

                                        ${

                                            candidate.status === "Shortlisted"

                                                ? "bg-green-500/20 text-green-400"

                                            : candidate.status === "Rejected"

                                                ? "bg-red-500/20 text-red-400"

                                            : "bg-yellow-500/20 text-yellow-400"

                                        }

                                    `}

                                >

                                    {candidate.status}

                                </span>

                            </td>

                            {/* View */}

                            <td className="p-4 text-center">

                                <Link

                                    to={`/dashboard/candidate/${candidate.id}`}

                                >

                                    <button

                                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-all"

                                    >

                                        <Eye size={18} />

                                        View

                                    </button>

                                </Link>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default CandidateTable;