import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

function StatusChart({ stats }) {

    const data = [

        {
            name: "Shortlisted",
            value: stats.shortlisted
        },

        {
            name: "Rejected",
            value: stats.rejected
        },

        {
            name: "Pending",
            value: stats.pending
        }

    ];

    const COLORS = [

        "#22c55e",

        "#ef4444",

        "#eab308"

    ];

    return (

        <div className="bg-slate-900 rounded-2xl p-8 mt-8">

            <h2 className="text-2xl font-bold text-cyan-300 mb-8">

                Candidate Status Distribution

            </h2>

            <div className="h-96">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie

                            data={data}

                            cx="50%"

                            cy="50%"

                            outerRadius={120}

                            dataKey="value"

                            label

                        >

                            {

                                data.map((entry, index) => (

                                    <Cell

                                        key={index}

                                        fill={COLORS[index]}

                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default StatusChart;