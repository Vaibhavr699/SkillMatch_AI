'use client';

import SignupForm from '../../components/auth/SignupForm';
import { motion } from 'framer-motion';
import { FaRegCompass } from 'react-icons/fa';
import { HiHome, HiArrowLeft } from 'react-icons/hi';

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Back to Home Button (top left) */}
      <button
        onClick={() => window.location.href = '/'}
        className="absolute top-3 left-3 lg:top-6 lg:left-6 z-20 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 transition"
        aria-label="Back to Home"
      >
        <HiArrowLeft className="w-6 h-6 text-orange-500" />
      </button>
      {/* Left: Image and Marketing (hidden on small screens) */}
      <div className="hidden lg:flex w-2/5 min-h-screen bg-[#073826] flex-col items-center justify-center relative px-8 py-16">
        {/* Example card and image */}
        <div className="w-full max-w-sm mx-auto mb-12 relative flex flex-col items-center justify-center" style={{ minHeight: '340px' }}>
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 relative z-10 w-80 mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-12 h-12 rounded-full" />
              <div>
                <div className="font-bold text-lg text-[#1a2236]">PRIYA SHARMA</div>
                <div className="text-[#5A6A7A] text-sm">Designer</div>
              </div>
            </div>
            <div className="mb-2">
              <span className="block text-xs text-gray-500 mb-1">Progress</span>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-sm font-semibold text-gray-700">60% Jobs matched</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 z-20" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80" alt="UI/UX Design" className="rounded-xl w-full h-28 object-cover mb-3" />
            <div className="font-bold text-lg text-[#1a2236]">UI/UX Design</div>
            <div className="text-[#5A6A7A] text-sm">Creativity meets strategy. Design beautiful, user-friendly interfaces and experiences for modern products.</div>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span>Creative</span>
              <span>• 8 Hours</span>
              <span className="flex items-center gap-1"><span className="text-yellow-400">★</span> 4.8 | 1200</span>
            </div>
          </div>
        </div>
        <div className="text-white text-2xl font-bold mb-4 text-center">Kick- Start Your Career & Get Matched With The Right Job</div>
        <div className="text-white text-base text-center max-w-md">Launch your dream career instantly! AI-powered matching connects your unique skills to perfect opportunities. Get personalized job alerts, salary insights, and interview-ready tools—all in one place. Your ideal role awaits. Start now!</div>
      </div>
      {/* Right: Signup Form */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 py-12 bg-white min-h-screen">
        {/* Logo */}
        <div className="mb-2 flex items-center justify-center gap-3 w-full max-w-md">
          <img src="/s.png" alt="SkillMatch AI Logo" className="h-7 w-7" />
          <span className="text-2xl font-extrabold text-[#0B2E1C] tracking-tight">
            SkillMatch <span className="text-orange-500">AI</span>
          </span>
        </div>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
          <h2 className="text-3xl font-extrabold text-[#1a2236] mb-2">Create an account</h2>
          <p className="text-gray-600 mb-8">Enter your details to sign up</p>
          {/* Signup Form (with all current functionality) */}
          <SignupForm />
        </div>
      </div>
    </div>
  );
}