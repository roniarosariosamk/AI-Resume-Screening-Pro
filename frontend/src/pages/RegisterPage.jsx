import { FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import { registerRecruiter } from "../services/authService";
import toast from "react-hot-toast";


function RegisterPage() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {

    if (password !== confirmPassword) {

        toast.error("Passwords do not match");

        return;
    }

    try {

        const data = await registerRecruiter(
            name,
            email,
            password
        );


        toast.success("Registration Successful!");

    }

    catch (error) {

        console.error(error);

        if (error.response) {

            toast.error(error.response.data.detail);

        } else {

            toast.error("Registration Failed");

        }

    }

};

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

            <div className="w-full max-w-md">

                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl shadow-cyan-500/20">

                    <div className="flex justify-center mb-6">

                        <FaUserPlus
                            className="text-cyan-400"
                            size={55}
                        />

                    </div>

                    <h2 className="text-3xl font-bold text-white text-center">

                        Recruiter Registration

                    </h2>

                    <p className="text-gray-400 text-center mt-2 mb-8">

                        Create your recruiter account

                    </p>

                    <input

                        type="text"

                        placeholder="👤 Full Name"

                        value={name}

                        onChange={(e)=>setName(e.target.value)}

                        className="w-full p-4 mb-5 rounded-xl bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400"

                    />

                    <input

                        type="email"

                        placeholder="📧 Email"

                        value={email}

                        onChange={(e)=>setEmail(e.target.value)}

                        className="w-full p-4 mb-5 rounded-xl bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400"

                    />

                    <input

                        type="password"

                        placeholder="🔒 Password"

                        value={password}

                        onChange={(e)=>setPassword(e.target.value)}

                        className="w-full p-4 mb-5 rounded-xl bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400"

                    />

                    <input

                        type="password"

                        placeholder="🔒 Confirm Password"

                        value={confirmPassword}

                        onChange={(e)=>setConfirmPassword(e.target.value)}

                        className="w-full p-4 mb-6 rounded-xl bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400"

                    />

                    <button

                        onClick={handleRegister}

                        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all font-bold text-lg text-black"

                    >

                        Register →

                    </button>

                </div>

            </div>

        </div>

    );

}

export default RegisterPage;