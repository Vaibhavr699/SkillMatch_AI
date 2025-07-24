"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters.", { theme: "colored" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Reset failed. Please try again or request a new link.", { theme: "colored" });
      } else {
        toast.success("Password updated! 🔒 You can now sign in.", { theme: "colored" });
        setTimeout(() => router.push("/auth/login"), 2000);
      }
    } catch {
      toast.error("Network error. Please try again.", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-extrabold text-[#0B2E1C] mb-2 text-center">Reset Your Password</h1>
        <p className="text-gray-600 mb-6 text-center">Enter your new password below.</p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">New Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none bg-white text-gray-900"
              placeholder="Minimum 8 characters"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-green-700 hover:bg-green-800 text-white font-semibold shadow-lg transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
} 