import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import UploadPage from "../pages/UploadPage";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";

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
          element={<UploadPage />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
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