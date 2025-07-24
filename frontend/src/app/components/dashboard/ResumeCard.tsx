"use client";
import { motion, AnimatePresence } from "framer-motion";
import { easeInOut } from 'framer-motion';
import AIScore from "../AIScore";
import BarChartIcon from '@mui/icons-material/BarChart';;
import WorkIcon from '@mui/icons-material/Work';
import { useDeleteResume } from '@/hooks/useDeleteResume';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState, useEffect, useRef } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import JobMatchCard from './JobMatchCard';
import { Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
dayjs.extend(relativeTime);

function formatTimeAgo(dateString?: string) {
  if (!dateString) return null;
  return dayjs(dateString).fromNow();
}

function formatFileSize(size?: number) {
  if (!size) return null;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(0)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

// Custom hook to fetch skill-based job matches for a resume
function useResumeSkillMatches(resumeId: number) {
  return useQuery<any[], Error>({
    queryKey: ['resumeSkillMatches', resumeId],
    queryFn: async () => {
      const { data } = await api.get(`/resumes/${resumeId}/skill-matches`);
      return data;
    },
    enabled: !!resumeId,
  });
}

export default function ResumeCard({ resume }: { resume: any }) {
  const { mutate: deleteResume, status } = useDeleteResume();
  const deleting = status === 'pending';
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSuggestionsDropdown, setShowSuggestionsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{top: number, left: number, width: number}>({top: 0, left: 0, width: 0});
  const [editFilename, setEditFilename] = useState(resume.filename);
  const [savingEdit, setSavingEdit] = useState(false);
  const { data: matchedJobs = [], isLoading: jobsLoading, isError: jobsError } = useResumeSkillMatches(resume.id);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showSuggestionsDropdown) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setShowSuggestionsDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showSuggestionsDropdown]);

  // Position dropdown below button
  useEffect(() => {
    if (showSuggestionsDropdown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [showSuggestionsDropdown]);

  const handleDelete = () => {
    deleteResume(resume.id, {
      onSuccess: () => toast.success('Resume deleted!'),
      onError: () => toast.error('Failed to delete resume.'),
    });
  };

  const handleDownload = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const url = `http://localhost:5000/uploads/${resume.path?.split('/').pop()}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = resume.filename;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleEdit = () => {
    setEditFilename(resume.filename);
    setShowEdit(true);
  };

  const handleEditSave = async () => {
    setSavingEdit(true);
    await new Promise(res => setTimeout(res, 800));
    toast.success('Filename updated (not persisted, demo only)');
    setShowEdit(false);
    setSavingEdit(false);
  };

  const score = resume.analysis?.score ?? 0;
  // Filter out empty or whitespace-only suggestions
  const suggestions = (Array.isArray(resume.analysis?.suggestions)
    ? resume.analysis.suggestions
    : (resume.analysis?.suggestions ? String(resume.analysis.suggestions).split('\n') : [])
  ).filter((tip: string) => tip && tip.trim().length > 0);
  const scoreStatus = score >= 80 ? { label: 'Optimized', color: 'bg-green-100 text-green-700', icon: <CheckCircleIcon className="w-4 h-4 text-green-500" /> } : score >= 60 ? { label: 'On Track', color: 'bg-yellow-100 text-yellow-700', icon: <WarningAmberIcon className="w-4 h-4 text-yellow-500" /> } : { label: 'Needs Work', color: 'bg-red-100 text-red-700', icon: <WarningAmberIcon className="w-4 h-4 text-red-500" /> };
  const meta = [
    resume.createdAt ? `Uploaded on ${new Date(resume.createdAt).toLocaleDateString()}` : null,
    resume.filename?.split('.').pop()?.toUpperCase(),
    resume.size ? formatFileSize(resume.size) : null
  ].filter(Boolean).join(' · ');

  // Extract and deduplicate skills
  const skills: string[] = Array.from(new Set(
    (resume.analysis?.skills || resume.skills || []).filter((s: any) => typeof s === 'string' && s.trim().length > 0)
  )) as string[];

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: easeInOut
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3, ease: easeInOut }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2, ease: easeInOut } },
    tap: { scale: 0.95 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: easeInOut
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.2, ease: easeInOut }
    }
  };

  // UI
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-4 sm:p-6 mb-6 border border-gray-100/50 backdrop-blur-sm transition-all duration-300 relative w-full max-w-full"
      style={{ minWidth: 0, overflow: 'hidden' }}
    >
      {/* Top: Title, Date, Score */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2 w-full min-w-0">
        <div className="flex flex-col min-w-0">
          <h3 className="font-bold text-gray-900 text-lg truncate">{resume.filename}</h3>
          <div className="text-xs text-gray-500 mt-1">Uploaded on {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : '-'}</div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span className="text-3xl font-extrabold text-green-500">{score}%</span>
        </div>
      </div>
      {/* Score Bar */}
      <div className="mt-2 mb-3 w-full min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Resume Score</span>
          <span className="text-sm font-bold text-gray-700">{score}%</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1 }}
            className={`h-4 rounded-full bg-gradient-to-r ${score >= 80 ? 'from-green-400 to-green-500' : score >= 60 ? 'from-yellow-400 to-yellow-500' : 'from-orange-400 to-orange-500'}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
      {/* Suggestions Section */}
      <div className="mt-3 mb-2">
        <div className="flex items-center gap-2 mb-1">
          <BarChartIcon className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-gray-800">Suggestions</span>
        </div>
        <div className="rounded-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 via-white to-blue-100/60 p-4 shadow-sm">
          {suggestions.length === 0 ? (
            <div className="text-gray-500 text-sm ml-3">No suggestions yet.</div>
          ) : (
            <ul className="space-y-3">
              {(showAllSuggestions ? suggestions : suggestions.slice(0, 3)).map((tip: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-gray-900 text-sm font-medium">
                  <span className="mt-1"><Sparkles className="w-4 h-4 text-blue-400" /></span>
                  <span className="break-words leading-relaxed">{tip.replace(/^[-•\s]+/, '')}</span>
                </li>
              ))}
            </ul>
          )}
          {suggestions.length > 3 && (
            <button
              className="text-blue-600 underline text-xs font-semibold hover:text-blue-800 transition mt-3 ml-1"
              onClick={() => setShowAllSuggestions((open) => !open)}
            >
              {showAllSuggestions ? 'Show Less' : `Show All (${suggestions.length})`}
            </button>
          )}
        </div>
      </div>
      {/* Matched Jobs Section */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          <WorkIcon className="w-5 h-5 text-purple-500" />
          <span className="font-semibold text-gray-800">Matched Jobs</span>
          {matchedJobs.length > 0 && (
            <button
              className="ml-2 text-xs text-purple-600 underline hover:text-purple-800 font-semibold"
              onClick={() => setShowJobs((v) => !v)}
            >
              {showJobs ? 'Hide' : `Show (${matchedJobs.length})`}
            </button>
          )}
        </div>
        {jobsLoading ? (
          <div className="text-gray-500 text-sm ml-7">Loading matched jobs...</div>
        ) : jobsError ? (
          <div className="text-red-500 text-sm ml-7">Failed to load matched jobs.</div>
        ) : matchedJobs.length === 0 ? (
          <div className="text-gray-500 text-sm ml-7">No matched jobs yet.</div>
        ) : showJobs ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-2 mt-2">
            {matchedJobs.map((job: any) => (
              <JobMatchCard key={job.id} job={job} />
            ))}
          </div>
        ) : null}
      </div>
      {/* Actions: Suggestions & Matched Jobs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 w-full min-w-0 flex-wrap">
        <div className="flex flex-row gap-3 min-w-0">
        </div>
      </div>
      {/* Extracted Skills Chips */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 border-t border-gray-100 pt-3">
          {skills.map((skill: string, idx: number) => (
            <span
              key={idx}
              className="bg-gradient-to-r from-green-100 to-teal-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-green-200 hover:scale-105 transition-transform"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}