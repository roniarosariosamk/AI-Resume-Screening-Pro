import {
    Users,
    UserCheck,
    UserX,
    BrainCircuit
} from "lucide-react";

function StatsCards({ stats = {
    total: 156,
    shortlisted: 38,
    rejected: 51,
    pending: 67
} }) {

    const cards = [

        {

            title: "Total Candidates",

            value: stats.total,

            icon: <Users size={30} />,

            color: "from-cyan-500 to-blue-500"

        },

        {

            title: "Shortlisted",

            value: stats.shortlisted,

            icon: <UserCheck size={30} />,

            color: "from-green-500 to-emerald-500"

        },

        {

            title: "Rejected",

            value: stats.rejected,

            icon: <UserX size={30} />,

            color: "from-red-500 to-pink-500"

        },

        {

            title: "Pending",

            value: stats.pending,

            icon: <BrainCircuit size={30} />,

            color: "from-purple-500 to-indigo-500"

        }

    ];

    return (

        <div className="grid grid-cols-4 gap-8">

            {

                cards.map((card, index) => (

                    <div

                        key={index}

                        className="
                            bg-slate-900
                            rounded-2xl
                            p-6
                            border
                            border-slate-800
                            hover:border-cyan-400
                            transition-all
                            duration-300
                            hover:scale-105
                        "

                    >

                        <div

                            className={`
                                w-14
                                h-14
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                bg-gradient-to-r
                                ${card.color}
                                text-white
                                mb-5
                            `}

                        >

                            {card.icon}

                        </div>

                        <p className="text-gray-400">

                            {card.title}

                        </p>

                        <h2 className="text-4xl font-bold text-white mt-3">

                            {card.value}

                        </h2>

                    </div>

                ))

            }

        </div>

    );

}

export default StatsCards;