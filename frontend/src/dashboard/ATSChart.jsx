import { useEffect, useState } from "react";

import {

    ResponsiveContainer,

    BarChart,

    Bar,

    XAxis,

    YAxis,

    Tooltip,

    CartesianGrid

} from "recharts";

import { getATSDistribution } from "../services/CandidateService";

function ATSChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        loadChart();

    }, []);

    const loadChart = async () => {

        try {

            const result = await getATSDistribution();

            setData(result);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="bg-slate-900 rounded-2xl p-6 mt-10">

            <h2 className="text-2xl font-bold text-white mb-6">

                ATS Score Distribution

            </h2>

            <ResponsiveContainer width="100%" height={350}>

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar

                        dataKey="ats_score"

                        radius={[8, 8, 0, 0]}

                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ATSChart;