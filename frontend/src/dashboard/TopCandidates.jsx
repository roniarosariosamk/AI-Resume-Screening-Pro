import { useEffect, useState } from "react";

import { Trophy } from "lucide-react";

import { Link } from "react-router-dom";

import { getTopCandidates } from "../services/CandidateService";

function TopCandidates() {

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {

        loadCandidates();

    }, []);

    const loadCandidates = async () => {

        try {

            const data = await getTopCandidates();

            setCandidates(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const medals = [

        "🥇",

        "🥈",

        "🥉",

        "4️⃣",

        "5️⃣"

    ];

    return (

        <div className="bg-slate-900 rounded-2xl p-8 mt-10">

            <div className="flex items-center gap-3 mb-8">

                <Trophy className="text-yellow-400" size={30} />

                <h2 className="text-3xl font-bold text-white">

                    Top Candidates

                </h2>

            </div>

            <div className="space-y-5">

                {

                    candidates.map((candidate, index) => (

                        <Link

                            key={candidate.id}

                            to={`/dashboard/candidate/${candidate.id}`}

                        >

                            <div

                                className="bg-slate-800 hover:bg-slate-700 transition-all rounded-xl p-5 flex justify-between items-center"

                            >

                                <div>

                                    <h3 className="text-xl font-bold text-white">

                                        {medals[index]} {candidate.name}

                                    </h3>

                                    <p className="text-gray-400 mt-1">

                                        Status : {candidate.status}

                                    </p>

                                </div>

                                <div className="text-right">

                                    <p className="text-cyan-400 font-bold">

                                        ATS : {candidate.ats_score}%

                                    </p>

                                    <p className="text-green-400 font-bold">

                                        JD : {candidate.jd_match_score}%

                                    </p>

                                </div>

                            </div>

                        </Link>

                    ))

                }

            </div>

        </div>

    );

}

export default TopCandidates;