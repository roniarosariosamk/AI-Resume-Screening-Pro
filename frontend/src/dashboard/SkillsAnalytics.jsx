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

import { Brain } from "lucide-react";

import { getSkillsAnalytics } from "../services/CandidateService";

function SkillsAnalytics() {

    const [commonSkills, setCommonSkills] = useState([]);

    const [missingSkills, setMissingSkills] = useState([]);

    useEffect(() => {

        loadSkills();

    }, []);

    const loadSkills = async () => {

        try {

            const data = await getSkillsAnalytics();

            setCommonSkills(data.common_skills);

            setMissingSkills(data.missing_skills);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="bg-slate-900 rounded-2xl p-8 mt-10">

            <div className="flex items-center gap-3 mb-8">

                <Brain size={32} className="text-cyan-400" />

                <h2 className="text-3xl font-bold text-white">

                    Skills Intelligence

                </h2>

            </div>

            <div className="grid grid-cols-2 gap-10">

                {/* Common Skills */}

                <div>

                    <h3 className="text-xl text-green-400 font-bold mb-4">

                        Most Common Skills

                    </h3>

                    <ResponsiveContainer width="100%" height={300}>

                        <BarChart data={commonSkills} layout="vertical">

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis type="number" />

                            <YAxis

                                dataKey="skill"

                                type="category"

                            />

                            <Tooltip />

                            <Bar

                                dataKey="count"

                                radius={[0, 8, 8, 0]}

                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

                {/* Missing Skills */}

                <div>

                    <h3 className="text-xl text-red-400 font-bold mb-4">

                        Most Missing Skills

                    </h3>

                    <ResponsiveContainer width="100%" height={300}>

                        <BarChart data={missingSkills} layout="vertical">

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis type="number" />

                            <YAxis

                                dataKey="skill"

                                type="category"

                            />

                            <Tooltip />

                            <Bar

                                dataKey="count"

                                radius={[0, 8, 8, 0]}

                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>

    );

}

export default SkillsAnalytics;