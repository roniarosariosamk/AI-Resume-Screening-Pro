import { useEffect, useState } from "react";

import {

    Brain,

    Trophy,

    Users,

    Target,

    TrendingUp,

    Activity

} from "lucide-react";

import { getHiringInsights } from "../services/CandidateService";

function AIInsights() {

    const [insights, setInsights] = useState(null);

    useEffect(() => {

        loadInsights();

    }, []);

    const loadInsights = async () => {

        try {

            const data = await getHiringInsights();

            setInsights(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!insights) {

        return (

            <div className="bg-slate-900 rounded-2xl p-6 mt-10 text-white">

                Loading AI Insights...

            </div>

        );

    }

    const cards = [

        {

            title: "Average ATS",

            value: insights.average_ats,

            icon: <TrendingUp size={24} />,

            color: "text-cyan-400"

        },

        {

            title: "Highest ATS",

            value: insights.highest_ats,

            icon: <Trophy size={24} />,

            color: "text-yellow-400"

        },

        {

            title: "Interview Ready",

            value: insights.interview_ready,

            icon: <Target size={24} />,

            color: "text-green-400"

        },

        {

            title: "Total Candidates",

            value: insights.total_candidates,

            icon: <Users size={24} />,

            color: "text-purple-400"

        }

    ];

    return (

        <div className="bg-slate-900 rounded-2xl p-8 mt-10">

            <div className="flex items-center gap-3 mb-8">

                <Brain className="text-cyan-400" size={32} />

                <h2 className="text-3xl font-bold text-white">

                    AI Hiring Insights

                </h2>

            </div>

            <div className="grid grid-cols-4 gap-6">

                {cards.map((card, index) => (

                    <div

                        key={index}

                        className="bg-slate-800 rounded-xl p-5"

                    >

                        <div className={card.color}>

                            {card.icon}

                        </div>

                        <p className="text-gray-400 mt-4">

                            {card.title}

                        </p>

                        <h2 className="text-4xl font-bold text-white mt-2">

                            {card.value}

                        </h2>

                    </div>

                ))}

            </div>

            <div className="mt-8 bg-slate-800 rounded-xl p-6">

                <h3 className="text-xl text-cyan-400 font-semibold mb-3">

                    ⭐ Best Candidate

                </h3>

                <p className="text-2xl text-white font-bold">

                    {insights.best_candidate}

                </p>

            </div>

        </div>

    );

}

export default AIInsights;