import { Bell, UserCircle } from "lucide-react";

function Topbar() {

    const email = localStorage.getItem("userEmail");

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

            </div>

        </div>

    );

}

export default Topbar;