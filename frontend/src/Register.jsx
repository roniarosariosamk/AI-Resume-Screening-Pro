import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/register",
                formData
            );

            toast.success(response.data.message);

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen bg-slate-950 flex justify-center items-center">

            <form
                onSubmit={handleRegister}
                className="bg-slate-900 p-10 rounded-2xl w-[420px] border border-slate-700 shadow-xl"
            >

                <h1 className="text-4xl text-white font-bold mb-8 text-center">
                    Recruiter Register
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mb-6 p-3 rounded-lg bg-slate-800 text-white"
                    required
                />

                <button
                    disabled={loading}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg text-white font-semibold transition-all"
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>

                <p className="text-gray-400 text-center mt-6">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-cyan-400 ml-2"
                    >
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
};

export default Register;