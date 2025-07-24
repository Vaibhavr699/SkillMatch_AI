"use client";

import { useState } from 'react';
import { useUserStats } from '@/hooks/useUserStats';
import { useUploadResume } from '@/hooks/useUploadResume';
import { useUser } from '@/hooks/useUser';
import { useResumes } from '@/hooks/useResumes';
import { useMatchedJobs } from '@/hooks/useMatchedJobs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  CheckCircle, 
  FileText, 
  Search, 
  Zap, 
  Briefcase,
  Upload,
  Star,
  FileCheck,
  TrendingUp,
  Eye,
  Calendar,
  Send,
  Crown,
  X,
  CloudUpload,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { FaCheckCircle, FaUpload, FaFileAlt, FaBriefcase, FaStar } from 'react-icons/fa';
import StatsCards from '../components/dashboard/StatsCards';
import ResumesTab from '../components/dashboard/tabs/ResumesTab';
import JobMatchesTab from '../components/dashboard/tabs/JobMatchesTab';
import SkillsTab from '../components/dashboard/tabs/SkillsTab';
import Link from 'next/link';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import CountUp from 'react-countup';

function SkeletonCard() {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6 border border-white/20 animate-pulse">
      <div className="h-6 w-1/3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mb-4" />
      <div className="space-y-3">
        <div className="h-4 w-2/3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg" />
        <div className="h-4 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg" />
        <div className="h-3 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg" />
      </div>
    </div>
  );
}

type TabType = 'resumes' | 'job-matches' | 'skills';

export default function DashboardPage() {
  const [uploadModal, setUploadModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const steps = [
    { label: "Parsing", icon: <FileText className="w-5 h-5" />, color: "text-blue-500" },
    { label: "Extracting", icon: <Search className="w-5 h-5" />, color: "text-indigo-500" },
    { label: "Embedding", icon: <Zap className="w-5 h-5" />, color: "text-purple-500" },
    { label: "Matching", icon: <Briefcase className="w-5 h-5" />, color: "text-emerald-500" },
  ];
  
  const totalDuration = 40000;
  const [stepStatus, setStepStatus] = useState([false, false, false, false]);

  const { data: user, isLoading: userLoading } = useUser();
  const { mutate: uploadResume, isPending: uploading } = useUploadResume();
  const { data: stats, isLoading: statsLoading } = useUserStats({ enabled: !!user });
  const { data: resumes = [], isLoading: resumesLoading } = useResumes();
  const { data: matchedJobs = [], isLoading: jobsLoading } = useMatchedJobs();
  const router = useRouter();

  // Redirect admin users away from dashboard
  useEffect(() => {
    if (!userLoading && user?.role === 'ADMIN') {
      router.replace('/admin'); // or use '/' for home page
    }
  }, [user, userLoading, router]);

  // Aggregate unique skills from all resumes' analysis
  const extractedSkills = Array.from(
    new Set(
      resumes
        .flatMap((resume: any) => resume.analysis?.skills || [])
        .filter(Boolean)
    )
  ) as (string | { name: string; proficiency?: string })[];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.pdf') || droppedFile.name.endsWith('.doc') || droppedFile.name.endsWith('.docx'))) {
      setFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setProgress(0);
    setProgressStep(0);
    setStepStatus([false, false, false, false]);
    setSuccess(false);
    
    let current = 0;
    const interval = setInterval(() => {
      current += 0.25;
      if (current >= 90) {
        clearInterval(interval);
        setProgress(90);
      } else {
        setProgress(current);
      }
      
      if (current >= 0 && current < 25) setProgressStep(0);
      else if (current >= 25 && current < 50) setProgressStep(1);
      else if (current >= 50 && current < 75) setProgressStep(2);
      else if (current >= 75) setProgressStep(3);
    }, 100);
    setProgressInterval(interval);
    
    uploadResume(file, {
      onSuccess: () => {
        if (interval) clearInterval(interval);
        setProgress(100);
        setStepStatus([true, true, true, true]);
        setProgressStep(4);
        setSuccess(true);
        setTimeout(() => {
          setUploadModal(false);
          setFile(null);
          setProgress(0);
          setProgressStep(0);
          setStepStatus([false, false, false, false]);
          setSuccess(false);
        }, 1200);
        toast.success('Resume uploaded successfully!', {
          className: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
        });
      },
      onError: () => {
        if (interval) clearInterval(interval);
        setProgress(0);
        setProgressStep(0);
        setStepStatus([false, false, false, false]);
        setSuccess(false);
        toast.error('Upload failed. Please try again.', {
          className: 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
        });
      },
    });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!', { className: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' });
    setTimeout(() => {
      router.push('/');
    }, 1200);
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-7xl">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  // Only keep the first three stats
  const statsArray = [
    { 
      label: 'Overall Score', 
      value: stats?.overallScore, 
      icon: <Star className="w-6 h-6" />, 
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      tooltip: 'Your average resume score based on AI analysis.'
    },
    { 
      label: 'Resumes', 
      value: stats?.resumes, 
      icon: <FileCheck className="w-6 h-6" />, 
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
      tooltip: 'Total resumes you have uploaded.'
    },
    { 
      label: 'Job Matches', 
      value: stats?.jobMatches, 
      icon: <Briefcase className="w-6 h-6" />, 
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50',
      tooltip: 'Jobs matched to your resumes using AI.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Sticky Responsive Navbar */}
      <nav className="w-full bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-1 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="" className="flex items-center gap-2">
            <img src="/s.png" alt="SkillMatch AI Logo" className="h-4 w-4 lg:h-8 lg:w-8" />
            <span className="text-sm    lg:text-xl font-bold text-[#0B2E1C] tracking-tight">
              SkillMatch <span className="text-orange-500">AI</span>
            </span>
          </Link>
          {/* No center nav links */}
          <div className="flex-1" />
          {/* User Info Card (right) */}
          {user && (
            <div className="flex items-center gap-2 sm:gap-3 relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 sm:gap-3 bg-white rounded-full shadow border border-gray-100 px-2 sm:px-4 py-1 sm:py-2 hover:shadow-lg transition cursor-pointer select-none min-w-0"
                onClick={() => setDropdownOpen((open) => !open)}
                tabIndex={0}
                style={{ minHeight: '40px' }}
              >
                {/* Avatar (use initials or placeholder) */}
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="User Avatar" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-base sm:text-xl font-bold">
                    {user.name ? user.name.split(' ').map((n: string) => n[0]).join('').slice(0,2).toUpperCase() : 'U'}
                  </div>
                )}
                <div className="flex flex-col items-start min-w-0">
                  <span className="font-bold text-[#1a2236] leading-tight truncate max-w-[80px] sm:max-w-[120px] text-xs sm:text-sm">{user.name || 'User'}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 leading-tight truncate max-w-[80px] sm:max-w-[120px]">{user.email}</span>
                </div>
                <HiChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 ml-1 sm:ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 sm:top-14 mt-1 sm:mt-2 w-40 sm:w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 sm:py-2 z-50 animate-fadeIn">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-2 sm:px-4 py-1 sm:py-2 text-[#222] text-sm sm:text-base font-medium hover:bg-gray-100 rounded-lg transition min-h-0"
                    style={{ minHeight: '32px' }}
                  >
                    <FiLogOut className="w-4 h-4 lg:w-5lg:h-5 text-gray-500" />
                    <span className="truncate">Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      {/* Dashboard Summary Section */}
      <section className="w-full bg-[#f9fafb] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2E1C] mb-1">
              Welcome back, {user?.name || 'User'}
            </h1>
            <p className="text-[#5A6A7A] text-base">
              Here's your comprehensive career analytics overview
            </p>
          </div>
          <button
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            onClick={() => setUploadModal(true)}
          >
            <FaUpload className="text-lg" />
            Upload New Resume
          </button>
        </div>
        
      </section>
      {/* End Dashboard Summary Section */}
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="rounded-xl shadow-lg"
      />
      
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Professional Welcome Header and Upload Button */}
          
          {/* Show ResumesTab by default, no tabs */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 animate-fadeIn">
            <ResumesTab />
          </div>
        </div>
      </div>

      {/* Enhanced Upload Modal */}
      {uploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl relative transform transition-all duration-300 animate-scaleIn border border-white/20">
            <button
              onClick={() => {
                setUploadModal(false);
                setProgressStep(0);
                setFile(null);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg mb-4">
                <CloudUpload className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2">
                Upload Your Resume
              </h2>
              <p className="text-slate-600 font-medium">
                Get AI-powered insights and job matching
              </p>
            </div>

            {/* Enhanced Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 mb-6 text-center transition-all duration-300 ${
                isDragOver
                  ? 'border-indigo-400 bg-indigo-50/50 scale-105'
                  : file
                  ? 'border-emerald-400 bg-emerald-50/50'
                  : 'border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/30'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="space-y-3">
                  <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-600">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{file.name}</p>
                    <p className="text-sm text-slate-600">Ready to upload</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`inline-flex p-4 rounded-full transition-all duration-300 ${
                    isDragOver ? 'bg-indigo-100 text-indigo-600 scale-110' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <CloudUpload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 mb-2">
                      {isDragOver ? 'Drop your file here!' : 'Drag and drop your resume'}
                    </p>
                    <p className="text-sm text-slate-600 mb-4">
                      Supports PDF, DOC, and DOCX files
                    </p>
                    <label className="inline-block">
                      <span className="sr-only">Choose resume file</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={e => setFile(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Progress Bar */}
            {(progress > 0 || uploading) && (
              <div className="space-y-6 mb-6">
                <div className="flex items-center justify-between">
                  {steps.map((step, idx) => (
                    <div key={step.label} className="flex flex-col items-center flex-1">
                      <div className={`relative w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-500 ${
                        progressStep === idx 
                          ? `border-indigo-500 bg-indigo-100 scale-110 ${step.color}` 
                          : stepStatus[idx] || (success && idx === 3)
                          ? 'border-emerald-500 bg-emerald-100 scale-110'
                          : 'border-slate-300 bg-slate-100'
                      }`}>
                        {stepStatus[idx] || (success && idx === 3) ? (
                          <CheckCircle className="w-6 h-6 text-emerald-500 animate-bounceIn" />
                        ) : progressStep === idx ? (
                          <div className={`${step.color} animate-pulse`}>
                            {step.icon}
                          </div>
                        ) : (
                          <div className="text-slate-400">
                            {step.icon}
                          </div>
                        )}
                        {progressStep === idx && (
                          <div className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-ping" />
                        )}
                      </div>
                      <span className={`mt-2 text-xs font-bold transition-colors duration-300 ${
                        progressStep === idx 
                          ? step.color 
                          : stepStatus[idx] || (success && idx === 3)
                          ? 'text-emerald-600'
                          : 'text-slate-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="relative">
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-700 ease-out relative overflow-hidden"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-sm font-bold text-slate-600">{Math.round(progress)}% Complete</span>
                  </div>
                </div>

                {success && (
                  <div className="flex justify-center animate-bounceIn">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-6 py-3 rounded-full border border-emerald-200 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="font-bold">Upload Complete!</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || uploading || progressStep > 0}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-105 active:scale-95"
            >
              {uploading || progressStep > 0 ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading & Analyzing...
                </span>
              ) : (
                "Upload Resume"
              )}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-wave { animation: wave 2s infinite; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-bounceIn { animation: bounceIn 0.6s ease-out; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}