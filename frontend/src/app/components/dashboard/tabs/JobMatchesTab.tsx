"use client";
import { useState } from 'react';
import { useMatchedJobs } from '@/hooks/useMatchedJobs';
import { 
  Briefcase, 
  Star, 
  MapPin, 
  Building2, 
  DollarSign, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  X,
  Eye,
  Zap,
  Home
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
  salary?: string;
  score?: number;
  skillsMatched?: string[];
  description?: string;
  postedDate?: string;
  jobType?: string;
  isRemote?: boolean;
}

export default function JobMatchesTab() {
  const { data: jobs = [], isLoading, isError } = useMatchedJobs();
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  if (isLoading) return <div className="py-12 text-center text-lg text-gray-500">Loading matched jobs...</div>;
  if (isError) return <div className="py-12 text-center text-lg text-red-500">Failed to load matched jobs.</div>;
  if (!jobs || jobs.length === 0) return <div className="py-12 text-center text-lg text-gray-400">No matched jobs found.</div>;

  const toggleExpand = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-gradient-to-r from-emerald-500 to-teal-500';
    if (score >= 75) return 'bg-gradient-to-r from-blue-500 to-indigo-500';
    if (score >= 60) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    return 'bg-gradient-to-r from-red-500 to-rose-500';
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Perfect Matches
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Curated jobs that match your profile
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 font-semibold text-sm">
              {jobs.length} Jobs Found
            </span>
          </div>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job: Job, index: number) => (
          <div
            key={job.id}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            {/* Card Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-violet-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 font-medium flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4" />
                    {job.company}
                  </p>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${getScoreBadgeColor(job.score || 0)}`}>
                  <Star className="w-3 h-3 fill-current" />
                  {job.score || 'N/A'}
                </div>
              </div>

              {/* Job Details Grid */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{job.location || 'Location TBD'}</span>
                  {job.isRemote && (
                    <div className="ml-2 flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      <Home className="w-3 h-3" />
                      Remote
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{job.salary || 'Competitive'}</span>
                  </div>
                  {job.jobType && (
                    <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      {job.jobType}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Skills Preview */}
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {(job.skillsMatched || []).slice(0, 3).map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 px-3 py-1 rounded-lg text-xs font-medium border border-violet-100"
                  >
                    {skill}
                  </span>
                ))}
                {(job.skillsMatched || []).length > 3 && (
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-medium">
                    +{(job.skillsMatched || []).length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Expandable Content */}
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedJobId === job.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4 border-t border-gray-100">
                <div className="pt-4">
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    All Matched Skills
                  </h5>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(job.skillsMatched || []).map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-medium border border-emerald-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 pb-6">
              <div className="flex gap-3">
                <button
                  onClick={() => viewJobDetails(job)}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-2.5 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  onClick={() => toggleExpand(job.id)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  {expandedJobId === job.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 via-transparent to-purple-600/0 group-hover:from-violet-600/5 group-hover:to-purple-600/5 transition-all duration-300 pointer-events-none rounded-2xl"></div>
          </div>
        ))}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 text-white">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold truncate">{selectedJob.title}</h3>
                  <p className="text-violet-100 text-lg flex items-center gap-2 mt-1">
                    <Building2 className="w-5 h-5" />
                    {selectedJob.company}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="ml-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="p-6">
                {/* Job Meta Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Location</p>
                      <p className="text-gray-900">{selectedJob.location || 'Not specified'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Salary</p>
                      <p className="text-gray-900">{selectedJob.salary || 'Competitive'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Match Score</p>
                      <p className="text-gray-900 font-bold">{selectedJob.score || 'N/A'}%</p>
                    </div>
                  </div>

                  {selectedJob.jobType && (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Job Type</p>
                        <p className="text-gray-900">{selectedJob.jobType}</p>
                      </div>
                    </div>
                  )}

                  {selectedJob.isRemote && (
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl">
                      <Home className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-sm text-emerald-600 font-medium">Work Style</p>
                        <p className="text-emerald-700 font-semibold">Remote Position</p>
                      </div>
                    </div>
                  )}

                  {selectedJob.postedDate && (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Posted</p>
                        <p className="text-gray-900">{selectedJob.postedDate}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Matched Skills */}
                {selectedJob.skillsMatched && selectedJob.skillsMatched.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      Matched Skills
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedJob.skillsMatched.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-4 py-2 rounded-xl font-medium border border-emerald-200 hover:shadow-md transition-shadow"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Job Description */}
                {selectedJob.description && (
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Job Description</h4>
                    <div className="prose prose-gray max-w-none bg-gray-50 p-4 rounded-xl">
                      <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                    </div>
                  </div>
                )}

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}