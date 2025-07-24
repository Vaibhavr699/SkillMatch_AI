"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    // Client-side validation
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error("Please fill in all fields.", { theme: "colored" });
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.", { theme: "colored" });
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.", { theme: "colored" });
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.", { theme: "colored" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Signup failed. Please try again.", { theme: "colored" });
      } else {
        toast.success("Account created! 🎉 Please sign in to continue.", { theme: "colored" });
        setTimeout(() => {
          router.push("/auth/login");
        }, 1200);
      }
    } catch (err) {
      toast.error("Network error. Please try again.", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      {/* No plain error UI, all errors via toast */}
      <div>
        <label htmlFor="name" className="block text-xs lg:text-sm font-medium text-gray-800 mb-0.5">Full Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-2.5 py-2 lg:px-3 lg:py-2.5 rounded-lg border border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none bg-white text-gray-900 text-xs lg:text-sm"
          placeholder="Your full name"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs lg:text-sm font-medium text-gray-800 mb-0.5">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-2.5 py-2 lg:px-3 lg:py-2.5 rounded-lg border border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none bg-white text-gray-900 text-xs lg:text-sm"
          placeholder="@youremail"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-xs lg:text-sm font-medium text-gray-800 mb-0.5">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-2.5 py-2 lg:px-3 lg:py-2.5 rounded-lg border border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none bg-white text-gray-900 text-xs lg:text-sm"
          placeholder="Minimum 8 characters"
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-xs lg:text-sm font-medium text-gray-800 mb-0.5">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-2.5 py-2 lg:px-3 lg:py-2.5 rounded-lg border border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none bg-white text-gray-900 text-xs lg:text-sm"
          placeholder="••••••••"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 lg:py-2.5 rounded-lg bg-green-700 hover:bg-green-800 text-white font-semibold shadow-lg transition disabled:opacity-60 text-sm lg:text-base"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
      <div className="text-center text-gray-600 text-xs lg:text-sm mt-1">
        Already have an account?{' '}
        <a href="/auth/login" className="text-green-700 hover:text-green-900 font-semibold underline">Sign In</a>
      </div>
    </form>
  );
}
