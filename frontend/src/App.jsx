import { Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import Features from "./components/Features";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import HowItWorks from "./components/HowItWorks";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CandidateDetails from "./dashboard/CandidateDetails";

function Home() {

    return (

        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <Hero />

            <Features />

            <HowItWorks />

            <Stats />

        </div>

    );

}

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            <Route
                path="/dashboard"
                element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard/candidate/:id"
                element={
                <ProtectedRoute>
                    <CandidateDetails />
                </ProtectedRoute>
                }
           />





        </Routes>

    );

}

export default App;