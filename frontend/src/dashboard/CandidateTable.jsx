import { Link } from "react-router-dom";
import { Eye, Star } from "lucide-react";

import { toggleFavorite } from "../services/CandidateService";

function CandidateTable({ candidates = [] }) {

    const handleFavorite = async (id) => {

        try {

            await toggleFavorite(id);

            window.location.reload();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="candidate-table mt-10 bg-slate-900 rounded-2xl overflow-hidden shadow-xl">

            <table className="w-full">

                <thead className="candidate-table-head bg-slate-800 text-cyan-300">

                    <tr>

                        <th className="p-4 text-left">
                            Candidate
                        </th>

                        <th className="p-4 text-left">
                            Email
                        </th>

                        <th className="p-4 text-left">
                            ATS Score
                        </th>

                        <th className="p-4 text-left">
                            JD Match
                        </th>

                        <th className="p-4 text-left">
                            Status
                        </th>

                        <th className="p-4 text-center">
                            Favorite
                        </th>

                        <th className="p-4 text-center">
                            View
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {candidates.length === 0 ? (

                        <tr>

                            <td
                                colSpan="7"
                                className="p-8 text-center text-gray-400"
                            >
                                No candidates found.
                            </td>

                        </tr>

                    ) : (

                        candidates.map((candidate) => (

                            <tr
                                key={candidate.id}
                                className="border-t border-slate-800 hover:bg-slate-800 transition"
                            >

                                <td className="p-4 font-semibold text-white">
                                    {candidate.name}
                                </td>

                                <td className="p-4 text-gray-400">
                                    {candidate.email}
                                </td>

                                <td className="p-4">

                                    <span className="text-cyan-400 font-bold">
                                        {candidate.ats_score}%
                                    </span>

                                </td>

                                <td className="p-4">

                                    <span className="text-green-400 font-bold">
                                        {candidate.jd_match_score}%
                                    </span>

                                </td>

                                <td className="p-4">

                                    <span className="text-gray-300">
                                        {candidate.status}
                                    </span>

                                </td>

                                <td className="p-4 text-center">

                                    <button
                                        onClick={() =>
                                            handleFavorite(candidate.id)
                                        }
                                        className="hover:scale-110 transition"
                                        title="Toggle Favorite"
                                    >

                                        <Star
                                            size={22}
                                            className={
                                                candidate.favorite === 1
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-500"
                                            }
                                        />

                                    </button>

                                </td>

                                <td className="p-4 text-center">

                                    <Link
                                        to={`/dashboard/candidate/${candidate.id}`}
                                        className="inline-flex items-center justify-center"
                                        title="View Candidate"
                                    >

                                        <Eye
                                            size={22}
                                            className="text-cyan-400 hover:text-cyan-300 transition"
                                        />

                                    </Link>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default CandidateTable;