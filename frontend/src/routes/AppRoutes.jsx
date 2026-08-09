import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import UploadPage from "../pages/UploadPage";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Landing Page */}
                <Route
                    path="/"
                    element={<App />}
                />

                {/* Upload Resume Page */}
                <Route
                    path="/upload"
                    element={
                        <ProtectedRoute>
                            <UploadPage />
                        </ProtectedRoute>
                    }
                />

                {/* Protected Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Login Page */}
                <Route
                    path="/login"
                    element={<LoginPage />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;