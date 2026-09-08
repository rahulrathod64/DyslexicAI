'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function StudentLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post('/appi/login/user', form);
      router.replace('/welcome');
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-purple-500 mb-6 text-center">Student Login</h1>
        
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        
        <button
          onClick={handleSubmit}
          className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition"
        >
          Login
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="/login/student" className="text-purple-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
