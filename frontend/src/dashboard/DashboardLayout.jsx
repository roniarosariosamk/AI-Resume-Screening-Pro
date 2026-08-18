import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatsCards from "./StatsCards";
import DashboardContent from "./DashboardContent";
import StatusChart from "./StatusChart";
import ATSChart from "./ATSChart";

import { getDashboardStats } from "../services/candidateService";
import HiringFunnel from "./HiringFunnel";
import AIInsights from "./AIInsights";
import TopCandidates from "./TopCandidates";
import SkillsAnalytics from "./SkillsAnalytics";
import InterviewCalendar from "./InterviewCalendar";

function DashboardLayout() {

    const [stats, setStats] = useState({

        total: 0,

        shortlisted: 0,

        rejected: 0,

        pending: 0

    });

    useEffect(() => {

        loadStats();

    }, []);

    const loadStats = async () => {

        try {

            const data = await getDashboardStats();

            setStats(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="flex min-h-screen bg-slate-950">

            {/* Sidebar */}

            <Sidebar />

            {/* Right Side */}

            <div className="flex-1">

                <Topbar />

                <div className="p-8">

                    {/* Dashboard Header */}

                    <div className="mb-10">

                        <h1 className="text-5xl font-bold text-white">

                            👋 Welcome Back,

                            <span className="text-cyan-400">

                                {" "}Recruiter

                            </span>

                        </h1>

                        <p className="text-gray-400 mt-4 text-lg">

                            AI Resume Screening Dashboard

                        </p>

                        <p className="text-gray-500 mt-2">

                            Analyze • Compare • Hire the Best Talent

                        </p>

                    </div>

                    <StatsCards  stats={stats}/>

                    <DashboardContent />

                    <ATSChart />

                    <HiringFunnel />

                    <AIInsights />

                    <TopCandidates />

                    <SkillsAnalytics />

                    <InterviewCalendar
                        onEditInterview={(interview) => {}}
                    />

                </div>

            </div>

        </div>

    );

}

export default DashboardLayout;