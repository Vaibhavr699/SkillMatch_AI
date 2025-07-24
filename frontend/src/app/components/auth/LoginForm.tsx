"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Basic validation
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields.", { theme: "colored" });
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.message && data.message.toLowerCase().includes('password')) {
          toast.error('Incorrect password! Please try again. 🚫', {
            theme: 'colored',
            style: { background: 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)', color: '#fff', fontWeight: 'bold', fontSize: '1rem' },
            icon: <span role="img" aria-label="lock">🔒</span>,
          });
        } else {
          toast.error(data.message || "Login failed. Please check your credentials.", { theme: "colored" });
        }
      } else if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        document.cookie = `token=${data.access_token}; path=/; SameSite=Strict;`;
        const payload = parseJwt(data.access_token);
        toast.success("Welcome back! 🚀 Redirecting to your dashboard...", { theme: "colored" });
        setTimeout(() => {
          if (payload && payload.role === 'ADMIN') {
            router.push("/admin");
          } else {
            router.push("/dashboard");
          }
        }, 1200);
      } else {
        toast.error("Unexpected error. Please try again.", { theme: "colored" });
      }
    } catch (err) {
      toast.error("Network error. Please try again.", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error("Please enter your email.");
      return;
    }
    setResetLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });
      if (!res.ok) {
        toast.error("Failed to send reset email.");
    } else {
        toast.success("If your email exists, a reset link has been sent.", { theme: "colored" });
        setShowReset(false);
        setResetEmail("");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* No plain error UI, all errors via toast */}
        <div>
          <label htmlFor="email" className="block text-sm lg:text-base font-medium text-gray-800 mb-1">Email Address</label>
          <input
            id="email"
        type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 lg:px-4 lg:py-3 rounded-lg border border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none bg-white text-gray-900 text-sm lg:text-base"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm lg:text-base font-medium text-gray-800 mb-1">Password</label>
          <input
            id="password"
        type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 lg:px-4 lg:py-3 rounded-lg border border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none bg-white text-gray-900 text-sm lg:text-base"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center justify-between text-xs lg:text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <input
              id="keepLoggedIn"
              type="checkbox"
              checked={keepLoggedIn}
              onChange={() => setKeepLoggedIn(!keepLoggedIn)}
              className="rounded border-gray-300 focus:ring-green-600"
            />
            <label htmlFor="keepLoggedIn" className="select-none cursor-pointer">Keep me logged in</label>
          </div>
          <button
            type="button"
            className="text-green-700 hover:text-green-900 font-medium"
            onClick={() => setShowReset(true)}
          >
            Forgot password?
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-2 lg:py-3 rounded-lg bg-green-700 hover:bg-green-800 text-white font-semibold shadow-lg transition disabled:opacity-60 text-base lg:text-lg"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <div className="text-center text-gray-600 text-xs lg:text-sm mt-2">
          Don't have an account?{' '}
          <a href="/auth/signup" className="text-green-700 hover:text-green-900 font-semibold underline">Sign Up</a>
        </div>
      </form>
      {/* Reset Password Modal (already uses toast) */}
      {showReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-2">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-xs sm:max-w-md relative overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reset Password</h2>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  id="reset-email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowReset(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
                >
                  Cancel
                </button>
                <button
        type="submit"
                  className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 font-semibold shadow"
                  disabled={resetLoading}
      >
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
    </form>
          </div>
        </div>
      )}
    </>
  );
}