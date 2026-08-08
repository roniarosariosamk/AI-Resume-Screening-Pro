import {
    LayoutDashboard,
    Users,
    FileText,
    BarChart3,
    Settings,
    LogOut
} from "lucide-react";

function Sidebar() {

    return (

        <div className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col">

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
                    active
                />

                <SidebarItem
                    icon={<Users size={22} />}
                    title="Candidates"
                />

                <SidebarItem
                    icon={<FileText size={22} />}
                    title="Resume Upload"
                />

                <SidebarItem
                    icon={<BarChart3 size={22} />}
                    title="Analytics"
                />

                <SidebarItem
                    icon={<Settings size={22} />}
                    title="Settings"
                />

            </div>

            {/* Logout */}

            <div className="p-5">

                <SidebarItem

                    icon={<LogOut size={22} />}

                    title="Logout"

                />

            </div>

        </div>

    );

}

function SidebarItem({ icon, title, active }) {

    return (

        <div

            className={`
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