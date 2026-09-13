import {
    LayoutDashboard,
    Users,
    FileText,
    BarChart3,
    Settings,
    LogOut
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        navigate("/login", { replace: true });

    };

    return (

        <div className="dashboard-sidebar w-72 min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col">

            {/* Logo */}

            <div className="p-8">

                <h1 className="text-3xl font-bold text-cyan-400">
                    AI Resume
                </h1>

                <p className="text-gray-500 text-sm">
                    Recruiter Portal
                </p>

            </div>

            {/* Menu */}

            <div className="flex-1 px-5">

                <SidebarItem
                    icon={<LayoutDashboard size={22} />}
                    title="Dashboard"
                    active={location.pathname === "/dashboard"}
                    onClick={() => navigate("/dashboard")}
                />

                <SidebarItem
                    icon={<Users size={22} />}
                    title="Candidates"
                    active={location.pathname === "/dashboard/candidates"}
                    onClick={() => navigate("/dashboard/candidates")}
                />

                <SidebarItem
                    icon={<FileText size={22} />}
                    title="Resume Upload"
                    active={location.pathname === "/upload"}
                    onClick={() => navigate("/upload")}
                />

                <SidebarItem
                    icon={<BarChart3 size={22} />}
                    title="Analytics"
                    active={location.pathname === "/dashboard/analytics"}
                    onClick={() => navigate("/dashboard/analytics")}
                />

                <SidebarItem
                    icon={<Settings size={22} />}
                    title="Settings"
                    active={location.pathname === "/dashboard/settings"}
                    onClick={() => navigate("/dashboard/settings")}
                />

            </div>

            {/* Logout */}

            <div className="p-5">

                <SidebarItem
                    icon={<LogOut size={22} />}
                    title="Logout"
                    onClick={handleLogout}
                />

            </div>

        </div>

    );

}

function SidebarItem({ icon, title, active, onClick }) {

    return (

        <div
            onClick={onClick}
            className={`
                sidebar-item
                flex
                items-center
                gap-4
                p-4
                rounded-xl
                cursor-pointer
                mb-3
                transition-all
                duration-300
                ${
                    active
                        ? "bg-cyan-500 text-black font-bold"
                        : "text-gray-300 hover:bg-slate-800 hover:text-cyan-400"
                }
            `}
        >

            {icon}

            <span>{title}</span>

        </div>

    );

}

export default Sidebar;