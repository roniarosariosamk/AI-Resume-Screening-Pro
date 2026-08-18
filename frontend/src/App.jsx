import { Routes, Route } from "react-router-dom";

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


function App() {
  return (
    <ThemeProvider>

      <Routes>

        {/* Home */}
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

        {/* Resume Upload / AI Screening */}
        <Route
          path="/upload"
          element={<Upload />}
        />

        {/* Recruiter Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
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