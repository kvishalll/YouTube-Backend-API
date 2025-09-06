import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/users/login",
                formData,
                {
                    withCredentials: true, // required for cookies
                }
            );

            setMessage(res.data.message);
            console.log(formData);


            // you can also store accessToken if you prefer localStorage
            localStorage.setItem("accessToken", res.data.data.accessToken);
            localStorage.setItem("refreshToken", res.data.data.refreshToken);

        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Login</h2>

                {/* Username or Email */}
                <input
                    type="text"
                    name="username"
                    placeholder="Username (or leave empty if using email)"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email (or leave empty if using username)"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>

                {message && <p className="text-center text-sm mt-2">{message}</p>}
            </form>
        </div>
    );
};

export default Login;
