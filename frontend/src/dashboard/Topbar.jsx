import { Bell, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Topbar() {

    const navigate = useNavigate();

    const email = localStorage.getItem("userEmail");

    const handleLogout = () => {

        // Remove authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        // Redirect to login
        navigate("/login");
    };

    return (

        <div className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

            {/* Left */}

            <div>

                <h2 className="text-2xl font-bold text-white">
                    Welcome Recruiter 👋
                </h2>

                <p className="text-gray-400">
                    {email}
                </p>

            </div>

            {/* Right */}

            <div className="flex items-center gap-6">

                <Bell
                    className="text-cyan-400 cursor-pointer"
                    size={24}
                />

                <UserCircle
                    className="text-cyan-400 cursor-pointer"
                    size={38}
                />

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                >
                    <LogOut size={18} />
                    Logout
                </button>

            </div>

        </div>

    );
}

export default Topbar;