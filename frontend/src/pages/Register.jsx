import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.name === "avatar") {
            setAvatar(e.target.files[0]);
        } else if (e.target.name === "coverImage") {
            setCoverImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Use multipart/form-data for file upload
            const data = new FormData();
            data.append("fullName", formData.fullName);
            data.append("username", formData.username);
            data.append("email", formData.email);
            data.append("password", formData.password);
            if (avatar) data.append("avatar", avatar);
            if (coverImage) data.append("coverImage", coverImage);

            const res = await axios.post("http://localhost:8000/api/v1/users/register", data, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true, // so cookies (tokens) work
            });

            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Register</h2>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
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

                <div>
                    <label className="block mb-1">Avatar (required)</label>
                    <input type="file" name="avatar" onChange={handleFileChange} required />
                </div>

                <div>
                    <label className="block mb-1">Cover Image (optional)</label>
                    <input type="file" name="coverImage" onChange={handleFileChange} />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Register
                </button>

                {message && <p className="text-center text-sm mt-2">{message}</p>}
            </form>
        </div>
    );
};

export default Register;
