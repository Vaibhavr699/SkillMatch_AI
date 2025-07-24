"use client";
import { useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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

export default function MatchedJobs({ jobs }: { jobs: Job[] }) {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  if (!jobs || jobs.length === 0) return null;

  const toggleExpand = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <WorkIcon className="text-green-600" /> 
          <span>Matched Jobs</span>
        </h3>
        <span className="text-sm text-gray-500">
          {jobs.length} perfect matches found
        </span>
      </div>

      {/* Mobile Cards */}
      <div className="xl:hidden space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition">
            <div 
              className="p-4 cursor-pointer"
              onClick={() => toggleExpand(job.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{job.title}</h4>
                  <p className="text-gray-600 font-medium">{job.company}</p>
                </div>
                <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                  <StarIcon className="text-yellow-500" fontSize="small" />
                  <span>{job.score || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <LocationOnIcon fontSize="small" />
                  <span>{job.location || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <AttachMoneyIcon fontSize="small" />
                  <span>{job.salary || 'N/A'}</span>
                </div>
                {job.jobType && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <BusinessIcon fontSize="small" />
                    <span>{job.jobType}</span>
                  </div>
                )}
                {job.isRemote && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircleIcon fontSize="small" />
                    <span>Remote</span>
                  </div>
                )}
              </div>
            </div>

            {expandedJobId === job.id && (
              <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                <div className="mb-3">
                  <h5 className="font-semibold text-gray-700 mb-1">Matched Skills:</h5>
                  <div className="flex flex-wrap gap-2">
                    {(job.skillsMatched || []).map((skill, idx) => (
                      <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => viewJobDetails(job)}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
                >
                  View Details
                </button>
              </div>
            )}

            <div className="px-4 py-2 bg-gray-50 text-center">
              <button 
                onClick={() => toggleExpand(job.id)}
                className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center justify-center w-full"
              >
                {expandedJobId === job.id ? (
                  <>
                    <ExpandLessIcon fontSize="small" /> Show Less
                  </>
                ) : (
                  <>
                    <ExpandMoreIcon fontSize="small" /> Show More
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden xl:block">
        <div className="overflow-hidden rounded-xl shadow-md border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Match Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{job.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {job.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {job.location || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {job.salary || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <StarIcon className="text-yellow-500" fontSize="small" />
                      <span className="font-medium text-gray-900">{job.score || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {(job.skillsMatched || []).slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                      {(job.skillsMatched || []).length > 3 && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                          +{(job.skillsMatched || []).length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => viewJobDetails(job)}
                      className="text-purple-600 hover:text-purple-900 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h3>
                  <p className="text-lg text-gray-600">{selectedJob.company}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <LocationOnIcon fontSize="small" />
                  <span>{selectedJob.location || 'Location not specified'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <AttachMoneyIcon fontSize="small" />
                  <span>{selectedJob.salary || 'Salary not specified'}</span>
                </div>
                {selectedJob.jobType && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <BusinessIcon fontSize="small" />
                    <span>{selectedJob.jobType}</span>
                  </div>
                )}
                {selectedJob.isRemote && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircleIcon fontSize="small" />
                    <span>Remote position</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-700">
                  <StarIcon fontSize="small" className="text-yellow-500" />
                  <span>Match Score: {selectedJob.score || 'N/A'}</span>
                </div>
                {selectedJob.postedDate && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <AccessTimeIcon fontSize="small" />
                    <span>Posted: {selectedJob.postedDate}</span>
                  </div>
                )}
              </div>

              {selectedJob.skillsMatched && selectedJob.skillsMatched.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Matched Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skillsMatched.map((skill, idx) => (
                      <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedJob.description && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
                  <div className="prose prose-sm text-gray-700">
                    {selectedJob.description}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}