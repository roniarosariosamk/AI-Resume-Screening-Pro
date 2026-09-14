import { Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { ThemeProvider } from "./context/ThemeContext";

import Hero from "./components/Hero";
import Features from "./components/Features";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import HowItWorks from "./components/HowItWorks";

import Upload from "./pages/Upload";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CandidateDetails from "./dashboard/CandidateDetails";

import DashboardContent from "./dashboard/DashboardContent";
import ATSChart from "./dashboard/ATSChart";
import SkillsAnalytics from "./dashboard/SkillsAnalytics";

function Home() {
    return (
        <div
            className="min-h-screen transition-colors duration-300"
            style={{
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
            }}
        >
            <Navbar />

            <Hero />

            <Features />

            <HowItWorks />

            <Stats />
        </div>
    );
}


/* ============================= */
/* Candidates Page */
/* ============================= */

function CandidatesPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <div className="p-8">

                <h1 className="text-4xl font-bold text-white">
                    Candidates
                </h1>

                <p className="text-gray-400 mt-2">
                    Manage and review all screened candidates.
                </p>

                <DashboardContent />

            </div>

        </div>
    );
}


/* ============================= */
/* Analytics Page */
/* ============================= */

function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <div className="p-8">

                <h1 className="text-4xl font-bold text-white">
                    Analytics
                </h1>

                <p className="text-gray-400 mt-2 mb-8">
                    Analyze recruitment and AI screening performance.
                </p>

                <ATSChart />

                <SkillsAnalytics />

            </div>

        </div>
    );
}


/* ============================= */
/* Settings Page */
/* ============================= */

function SettingsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <div className="p-8">

                <h1 className="text-4xl font-bold text-white">
                    Settings
                </h1>

                <p className="text-gray-400 mt-2">
                    Manage recruiter account settings.
                </p>

                <div className="mt-10 bg-slate-900 rounded-2xl p-8">

                    <h2 className="text-2xl font-bold text-cyan-400">
                        Recruiter Settings
                    </h2>

                    <p className="text-gray-400 mt-4">
                        Settings panel will be added here.
                    </p>

                </div>

            </div>

        </div>
    );
}


/* ============================= */
/* Main App */
/* ============================= */

function App() {

    return (

        <ThemeProvider>
            <SpeedInsights />

            <Routes>

                {/* Landing Page */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* Authentication */}

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />


                {/* Upload */}

                <Route
                    path="/upload"
                    element={
                        <ProtectedRoute>
                            <Upload />
                        </ProtectedRoute>
                    }
                />


                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* Candidates */}

                <Route
                    path="/dashboard/candidates"
                    element={
                        <ProtectedRoute>
                            <CandidatesPage />
                        </ProtectedRoute>
                    }
                />


                {/* Analytics */}

                <Route
                    path="/dashboard/analytics"
                    element={
                        <ProtectedRoute>
                            <AnalyticsPage />
                        </ProtectedRoute>
                    }
                />


                {/* Settings */}

                <Route
                    path="/dashboard/settings"
                    element={
                        <ProtectedRoute>
                            <SettingsPage />
                        </ProtectedRoute>
                    }
                />


                {/* Candidate Details */}

                <Route
                    path="/dashboard/candidate/:id"
                    element={
                        <ProtectedRoute>
                            <CandidateDetails />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </ThemeProvider>

    );
}

export default App;