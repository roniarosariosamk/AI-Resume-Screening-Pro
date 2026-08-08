import { FaUserTie } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRecruiter } from "../services/authService";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();

    const handleLogin = async (e) => {

        
        try {

            const data = await loginRecruiter(email, password);

            localStorage.setItem("token", data.access_token);

            localStorage.setItem("userEmail", email);

            navigate("/dashboard");

        } catch (error) {

            console.error("Login failed:", error);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 relative overflow-hidden">

                
            {/* Background Glow */}

            <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

            <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl bottom-0 right-0"></div>

            <div className="w-11/12 max-w-6xl grid md:grid-cols-2 gap-10">

                {/* LEFT SIDE */}

                <div>

                    <h1 className="text-6xl font-extrabold text-cyan-400 mb-4">
                        AI Resume Screening
                    </h1>

                    <p className="text-cyan-300 text-xl font-semibold mt-6">
                        Hire Smarter with Artificial Intelligence
                    </p>

                    <p className="text-gray-300 text-lg leading-8 mt-6">

                        Screen resumes intelligently using Artificial Intelligence.

                        <br /><br />

                        ✔ ATS Resume Analysis

                        <br />

                        ✔ JD Match Score

                        <br />

                        ✔ Candidate Ranking

                        <br />

                        ✔ AI Hiring Recommendation

                        <br />

                        ✔ Recruiter Analytics Dashboard

                    </p>

                </div>

                {/* RIGHT SIDE */}

                <div className="
                backdrop-blur-xl
                bg-white/10
                border
                border-white/20
                rounded-3xl
                p-10
                shadow-2xl 
                shadow-cyan-500/20
                transition-all
                duration-500
                hover:scale-[1.02]
                hover:shadow-cyan-500/40
                "
                
                >

                    <div className="flex justify-center mb-6">

                        <FaUserTie
                            className="text-cyan-400"
                            size={55}
                        />

                    </div>

                    <h2 className="text-3xl text-center text-white font-bold">

                        Welcome Recruiter 👋

                    </h2>

                    <p className="text-gray-400 text-center mt-2 mb-8">
                        Welcome back! Please login to continue.
                    </p>

                    <div className="mt-8">

                    <input
                        type="email"
                        placeholder="📧 Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 mb-5 rounded-xl bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition"
                    />

                    <input
                        type="password"
                        placeholder="🔒 Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 mb-5 rounded-xl bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition"
                    />

                    <button
                        onClick={handleLogin}
                        className="
                        w-full
                        py-4
                        rounded-xl
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-500
                        hover:from-cyan-400
                        hover:to-blue-400
                        hover:scale-105
                        transition-all
                        duration-300
                        text-black
                        font-bold
                        text-lg
                        shadow-lg
                        shadow-cyan-500/40
                        "
                   >
                    
                        Login →
                    </button>

                    <p className="text-center text-gray-500 text-sm mt-8">

                        Secure Recruiter Portal • AI Resume Screening

                    </p>

                </div>

                </div>

            </div>

        </div>

    );

}

export default LoginPage;