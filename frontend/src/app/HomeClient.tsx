"use client";

import Link from 'next/link';
import { FaRobot, FaChartLine, FaLightbulb, FaCheckCircle, FaStar, FaUsers, FaTrophy, FaRocket, FaEye, FaBrain, FaBullseye } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState, useEffect } from 'react';

export default function HomeClient() {
  const [isVisible, setIsVisible] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* Animated Background Elements */}
      {/* Remove dark gradients and overlays for a clean look */}

      {/* Responsive Navbar */}
      <nav className="w-full bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-1 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/s.png" alt="SkillMatch AI Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-[#0B2E1C] tracking-tight">
              SkillMatch <span className="text-orange-500">AI</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex gap-10 items-center mx-auto">
            <Link href="/" className="text-[#1A2B3C] font-medium hover:text-orange-600 transition">Home</Link>
            <Link href="/auth/login" className="text-[#1A2B3C] font-medium hover:text-orange-600 transition">Resume</Link>
            <Link href="/auth/login" className="text-[#1A2B3C] font-medium hover:text-orange-600 transition">Jobs</Link>
            <Link href="#faq" className="text-[#1A2B3C] font-medium hover:text-orange-600 transition">FAQs</Link>
            <Link href="/contact" className="text-[#1A2B3C] font-medium hover:text-orange-600 transition">Contact Us</Link>
          </div>

          {/* Right Buttons */}
          <div className="hidden lg:flex gap-3 items-center">
            <Link href="/auth/login" className="px-6 py-2 rounded-lg border border-gray-300 text-[#1A2B3C] font-medium bg-white hover:bg-gray-100 transition">Login</Link>
            <Link href="/auth/signup" className="px-7 py-2 rounded-lg bg-[#0B2E1C] text-white font-semibold hover:bg-[#164A2F] transition flex items-center gap-2">
              Get Started <span className="text-lg">→</span>
            </Link>
          </div>

          {/* Hamburger for mobile */}
          <button
            className="lg:hidden p-2 rounded-md text-[#0B2E1C] focus:outline-none focus:ring-2 focus:ring-orange-400"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Open navigation menu"
          >
            {navOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
          </button>
        </div>
        {/* Mobile Nav */}
        {navOpen && (
          <div className="lg:hidden bg-white/95 border-t border-gray-100 shadow-xl px-4 py-6 space-y-4 flex flex-col items-center animate-fadeIn">
            <Link href="/" className="w-full text-center py-2 text-[#1A2B3C] font-medium hover:text-orange-600 transition" onClick={() => setNavOpen(false)}>Home</Link>
            <Link href="/auth/login" className="w-full text-center py-2 text-[#1A2B3C] font-medium hover:text-orange-600 transition" onClick={() => setNavOpen(false)}>Resume</Link>
            <Link href="/auth/login" className="w-full text-center py-2 text-[#1A2B3C] font-medium hover:text-orange-600 transition" onClick={() => setNavOpen(false)}>Jobs</Link>
            <Link href="#faq" className="w-full text-center py-2 text-[#1A2B3C] font-medium hover:text-orange-600 transition" onClick={() => setNavOpen(false)}>FAQs</Link>
            <Link href="/contact" className="w-full text-center py-2 text-[#1A2B3C] font-medium hover:text-orange-600 transition" onClick={() => setNavOpen(false)}>Contact Us</Link>
            <div className="flex gap-3 w-full justify-center mt-2">
              <Link href="/auth/login" className="px-6 py-2 rounded-lg border border-gray-300 text-[#1A2B3C] font-medium bg-white hover:bg-gray-100 transition w-1/2 text-center">Login</Link>
              <Link href="/auth/signup" className="px-7 py-2 rounded-lg bg-[#0B2E1C] text-white font-semibold hover:bg-[#164A2F] transition flex items-center gap-2 w-1/2 justify-center">Get Started <span className="text-lg">→</span></Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section (as per provided design) */}
      <section className="w-full h-screen flex flex-col items-center justify-center text-center py-10 sm:py-10 px-4 bg-white relative overflow-hidden">
        {/* Cool SVG Backgrounds */}
        <svg className="absolute -top-32 -left-32 w-96 h-96 opacity-20 pointer-events-none select-none hidden sm:block" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="200" rx="200" ry="120" fill="#fbbf24" />
        </svg>
        <svg className="absolute top-1/2 right-0 w-80 h-80 opacity-10 pointer-events-none select-none hidden md:block" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="160" cy="160" r="160" fill="#10b981" />
        </svg>
        {/* Removed the blue wave SVG */}
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-sm sm:text-base font-semibold text-orange-600 mb-4 mt-2 sm:mt-4">
            Match skills, Optimize Resumes, Build careers,
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0B2E1C] mb-6 leading-tight">
            Your Skills. Your Path.<br className="hidden sm:block" />
            Powered by AI
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#5A6A7A] mb-10 max-w-2xl mx-auto">
            SkillMatch AI doesn't just build resumes. It builds futures. Discover careers, match jobs, and generate a tailored Resume, all in one intelligent platform.
          </p>
          <div className="flex justify-center">
            <a
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#0B2E1C] text-white font-semibold text-lg shadow-lg hover:bg-[#164A2F] transition"
            >
              Get Started <span className="text-xl">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#f7f8fa]">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2E1C] mb-6">
            Supercharge Your
            <span className="text-orange-600"> Job Search</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#5A6A7A] max-w-3xl mx-auto">
            Discover the power of AI-driven career acceleration with our comprehensive suite of tools
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 bg-[#f7f8fa]">
          {/* Feature Card 1 */}
          <div className="group bg-white border border-gray-200 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:border-orange-400 transition-all duration-500 hover:scale-105">
            <div className="bg-orange-100 rounded-2xl p-4 mb-6 group-hover:rotate-6 transition-transform duration-300">
              <FaChartLine className="text-orange-600 text-3xl sm:text-4xl" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[#0B2E1C]">AI Resume Scoring</h3>
            <ul className="text-[#5A6A7A] space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span>ATS compatibility analysis</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span>Advanced skill & keyword optimization</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span>Actionable improvement feedback</span>
              </li>
            </ul>
            <div className="mt-auto">
              <span className="text-orange-600 font-semibold text-lg">98% Success Rate</span>
            </div>
          </div>
          {/* Feature Card 2 */}
          <div className="group bg-white border border-gray-200 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:border-green-400 transition-all duration-500 hover:scale-105">
            <div className="bg-green-100 rounded-2xl p-4 mb-6 group-hover:-rotate-6 transition-transform duration-300">
              <FaBrain className="text-green-700 text-3xl sm:text-4xl" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[#0B2E1C]">Smart Job Matching</h3>
            <ul className="text-[#5A6A7A] space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span>Personalized job recommendations</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span>Intelligent skill gap analysis</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span>Real-time salary insights</span>
              </li>
            </ul>
            <div className="mt-auto">
              <span className="text-green-700 font-semibold text-lg">10K+ Job Matches Daily</span>
            </div>
          </div>
          {/* Feature Card 3 */}
          <div className="group bg-white border border-gray-200 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:border-[#0B2E1C] transition-all duration-500 hover:scale-105 sm:col-span-2 lg:col-span-1">
            <div className="bg-[#0B2E1C]/10 rounded-2xl p-4 mb-6 group-hover:rotate-12 transition-transform duration-300">
              <FaBullseye className="text-[#0B2E1C] text-3xl sm:text-4xl" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[#0B2E1C]">Career Acceleration</h3>
            <ul className="text-[#5A6A7A] space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span>AI-powered career recommendations</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span>Industry best practices integration</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span>Continuous learning suggestions</span>
              </li>
            </ul>
            <div className="mt-auto">
              <span className="text-[#0B2E1C] font-semibold text-lg">85% Salary Increase</span>
            </div>
        </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#0B2E1C]">
            Ready to Land Your
            <span className="text-orange-600"> Dream Job?</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-[#5A6A7A] leading-relaxed">
            Join thousands of professionals who boosted their careers with AI-powered resume analysis.
            <span className="block mt-2">Start your transformation today!</span>
          </p>
          <a
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#0B2E1C] text-white font-semibold text-lg shadow-lg hover:bg-[#164A2F] transition"
            >
              Get Started <span className="text-xl">↗</span>
            </a>
        </div>
      </section>

      {/* Testimonial Section (redesigned) */}
      <section className="w-full bg-[#f7f8fa] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a2236] mt-2 mb-4">Real Stories, Real Results</h2>
            <p className="text-lg text-[#5A6A7A] max-w-2xl mx-auto">See what users say about SkillMatch AI—how our smart tools simplify job hunting and Resume building.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-3">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl bg-blue-500">AC</div>
                <div>
                  <div className="font-bold text-lg text-[#1a2236]">Account Clerk/Admin Executive</div>
                  <div className="text-[#5A6A7A] text-sm">Verified User</div>
                </div>
              </div>
              <p className="text-[#222] text-base">"The platform is user friendly. I found the Resume upload feature most useful. The skill-matching results were fantastic, it helped me identify new opportunities. Overall, I would rate the user experience 5/5 and I highly recommend this platform."</p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-3">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl bg-pink-500">PM</div>
                <div>
                  <div className="font-bold text-lg text-[#1a2236]">Project Manager</div>
                  <div className="text-[#5A6A7A] text-sm">Verified User</div>
                </div>
              </div>
              <p className="text-[#222] text-base">"I found the job suggestions and percentage compatibility feature most useful. Great app for discovering relevant opportunities!"</p>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-3">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl bg-yellow-500">DA</div>
                <div>
                  <div className="font-bold text-lg text-[#1a2236]">Data Analyst</div>
                  <div className="text-[#5A6A7A] text-sm">Verified User</div>
                </div>
              </div>
              <p className="text-[#222] text-base">"I found the resume optimization and skill matching feature most useful. The skill-matching results were rated 5/5. It helped me identify new opportunities. Highly recommend this platform!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (redesigned) */}
      <section id="faq" className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Heading, description, button */}
          <div className="flex-1 flex flex-col justify-center items-start mb-8 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2E1C] mb-6 leading-tight">Answers to Your<br />Questions</h2>
            <p className="text-lg text-[#355a3a] mb-8 max-w-md">
              Have questions about using SkillMatch AI? Check out our FAQ section for answers to commonly asked questions about our platform, features, and more.
            </p>
            <a href="#" className="px-8 py-3 rounded-full border-2 border-[#0B2E1C] text-[#0B2E1C] font-semibold text-lg bg-white hover:bg-[#0B2E1C] hover:text-white transition shadow">Learn More</a>
          </div>
          {/* Right: FAQ Accordion */}
          <div className="flex-1 w-full max-w-2xl mx-auto">
            <div className="space-y-6">
              {/* FAQ 1 */}
              <details className="group bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all">
                <summary className="flex items-center justify-between text-xl font-semibold text-[#0B2E1C] group-open:text-orange-600 select-none">
                  How does SkillMatch AI analyze my resume?
                  <span className="ml-4 text-2xl text-[#223] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[#5A6A7A] text-base">Our AI uses advanced natural language processing to extract your skills, experience, and achievements, then scores your resume for ATS compatibility and relevance to your target jobs.</p>
              </details>
              {/* FAQ 2 */}
              <details className="group bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all">
                <summary className="flex items-center justify-between text-xl font-semibold text-[#0B2E1C] group-open:text-orange-600 select-none">
                  Can I upload multiple resumes and track their performance?
                  <span className="ml-4 text-2xl text-[#223] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[#5A6A7A] text-base">Yes! You can upload and manage multiple resumes, view their AI scores, suggestions, and matched jobs, and track improvements over time in your dashboard.</p>
              </details>
              {/* FAQ 3 */}
              <details className="group bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all">
                <summary className="flex items-center justify-between text-xl font-semibold text-[#0B2E1C] group-open:text-orange-600 select-none">
                  How does job matching work on SkillMatch AI?
                  <span className="ml-4 text-2xl text-[#223] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[#5A6A7A] text-base">We use AI-powered vector search to match your resume with thousands of job descriptions, recommending the best-fit jobs based on your skills and experience.</p>
              </details>
              {/* FAQ 4 */}
              <details className="group bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all">
                <summary className="flex items-center justify-between text-xl font-semibold text-[#0B2E1C] group-open:text-orange-600 select-none">
                  Is my data safe and private?
                  <span className="ml-4 text-2xl text-[#223] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[#5A6A7A] text-base">Absolutely. We use industry-standard encryption and never share your data with third parties. You control your uploads and can delete your data at any time.</p>
              </details>
              {/* FAQ 5 */}
              <details className="group bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all">
                <summary className="flex items-center justify-between text-xl font-semibold text-[#0B2E1C] group-open:text-orange-600 select-none">
                  Can I use SkillMatch AI for free?
                  <span className="ml-4 text-2xl text-[#223] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[#5A6A7A] text-base">We offer a free plan with core features. Upgrade to premium for unlimited resume uploads, advanced analytics, and priority support.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#052d17] text-white pt-16 pb-8 px-4 sm:px-8 mt-12">
        {/* SVG geometric pattern for uniqueness */}
        <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none select-none opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 180 Q 360 120 720 180 T 1440 180" stroke="#1a4d2e" strokeWidth="2" fill="none" />
            <path d="M0 200 Q 360 140 720 200 T 1440 200" stroke="#1a4d2e" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between items-start">
          {/* Left: Logo and description */}
          <div className="flex-1 min-w-[260px] mb-10 lg:mb-0">
            <div className="flex items-center gap-3 mb-6">
              <img src="/s.png" alt="SkillMatch AI Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold text-white">SkillMatch <span className="text-orange-500">AI</span></span>
            </div>
            <p className="text-[#b6e2c6] mb-8 max-w-xs">
              AI-powered resume analysis and job matching platform designed to accelerate your career growth.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Social icons */}
              <a href="#" className="bg-white rounded-full p-2 shadow hover:scale-110 transition"><svg className="w-6 h-6 text-[#052d17]" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 7.2c-.2-1.1-.8-2-1.7-2.7C18.2 3.5 16.7 3 12 3s-6.2.5-8.1 1.5C2.1 5.2 1.5 6.1 1.2 7.2 1 8.3 1 9.7 1 12s0 3.7.2 4.8c.2 1.1.8 2 1.7 2.7C5.8 20.5 7.3 21 12 21s6.2-.5 8.1-1.5c.9-.7 1.5-1.6 1.7-2.7.2-1.1.2-2.5.2-4.8s0-3.7-.2-4.8zM9.8 15.5V8.5l6.5 3.5-6.5 3.5z"/></svg></a>
              <a href="#" className="bg-white rounded-full p-2 shadow hover:scale-110 transition"><svg className="w-6 h-6 text-[#052d17]" fill="currentColor" viewBox="0 0 24 24"><path d="M19.6 3H4.4C3.1 3 2 4.1 2 5.4v13.2C2 19.9 3.1 21 4.4 21h15.2c1.3 0 2.4-1.1 2.4-2.4V5.4C22 4.1 20.9 3 19.6 3zM8.3 18.3H5.7V9.7h2.6v8.6zm-1.3-9.8c-.8 0-1.3-.6-1.3-1.3 0-.7.5-1.3 1.3-1.3.8 0 1.3.6 1.3 1.3 0 .7-.5 1.3-1.3 1.3zm12.3 9.8h-2.6v-4.2c0-1-.4-1.7-1.3-1.7-.7 0-1.1.5-1.3 1-.1.2-.1.5-.1.8v4.1h-2.6V9.7h2.6v1.2c.3-.5 1-1.2 2.3-1.2 1.7 0 2.4 1.1 2.4 3.1v5.5z"/></svg></a>
              <a href="#" className="bg-white rounded-full p-2 shadow hover:scale-110 transition"><svg className="w-6 h-6 text-[#052d17]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2C6.5 2.2 2 6.7 2 12.2c0 4.4 3.2 8.1 7.4 8.9.5.1.7-.2.7-.5v-1.7c-3 .7-3.6-1.4-3.6-1.4-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .5-1.2-2.4-.3-4.9-1.2-4.9-5.2 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.7-.3 2.5-.3s1.7-.1 2.5-.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 4-2.5 4.9-4.9 5.2.3.3.6.8.6 1.7v2.5c0 .3.2.6.7.5 4.2-.8 7.4-4.5 7.4-8.9 0-5.5-4.5-10-10-10z"/></svg></a>
              <a href="#" className="bg-white rounded-full p-2 shadow hover:scale-110 transition"><svg className="w-6 h-6 text-[#052d17]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2C6.5 2.2 2 6.7 2 12.2c0 4.4 3.2 8.1 7.4 8.9.5.1.7-.2.7-.5v-1.7c-3 .7-3.6-1.4-3.6-1.4-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .5-1.2-2.4-.3-4.9-1.2-4.9-5.2 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5-.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 4-2.5 4.9-4.9 5.2.3.3.6.8.6 1.7v2.5c0 .3.2.6.7.5 4.2-.8 7.4-4.5 7.4-8.9 0-5.5-4.5-10-10-10z"/></svg></a>
            </div>
          </div>
          {/* Right: Columns */}
          <div className="flex-1 min-w-[220px] grid grid-cols-2 gap-8">
          <div>
              <h4 className="font-bold text-lg mb-3 text-white">Product</h4>
              <ul className="space-y-2 text-[#b6e2c6]">
                <li><a href="/features" className="hover:text-orange-400 transition">Features</a></li>
                <li><a href="/pricing" className="hover:text-orange-400 transition">Pricing</a></li>
                <li><a href="/demo" className="hover:text-orange-400 transition">Demo</a></li>
            </ul>
          </div>
          <div>
              <h4 className="font-bold text-lg mb-3 text-white">Company</h4>
              <ul className="space-y-2 text-[#b6e2c6]">
                <li><a href="/about" className="hover:text-orange-400 transition">About</a></li>
                <li><a href="/contact" className="hover:text-orange-400 transition">Contact</a></li>
                <li><a href="/careers" className="hover:text-orange-400 transition">Careers</a></li>
            </ul>
          </div>
          <div>
              <h4 className="font-bold text-lg mb-3 text-white">Support</h4>
              <ul className="space-y-2 text-[#b6e2c6]">
                <li><a href="/help" className="hover:text-orange-400 transition">Help Center</a></li>
                <li><a href="/privacy" className="hover:text-orange-400 transition">Privacy</a></li>
                <li><a href="/terms" className="hover:text-orange-400 transition">Terms</a></li>
            </ul>
            </div>
            <div className="col-span-2 mt-6">
              <h4 className="font-bold text-lg mb-3 text-white">Address</h4>
              <p className="text-[#b6e2c6] leading-relaxed">Noida, Uttar Pradesh, India</p>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#1a4d2e] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[#b6e2c6] text-sm">
          <div className="flex gap-6 mb-2 md:mb-0">
            <a href="#" className="hover:text-orange-400 transition">Terms</a>
            <a href="#" className="hover:text-orange-400 transition">Privacy</a>
          </div>
          <span>© {new Date().getFullYear()} Copyright By SkillMatch AI</span>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
} 