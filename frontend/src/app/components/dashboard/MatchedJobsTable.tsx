"use client";
import { motion } from "framer-motion";
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';

export default function MatchedJobsTable({ jobs }: { jobs: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <WorkIcon className="text-green-500" /> Matched Jobs
      </h2>
      <div className="overflow-x-auto rounded-xl shadow bg-white/80">
        <table className="min-w-full text-sm md:text-base">
          <thead>
            <tr className="bg-green-100">
              <th className="px-4 py-2 text-left">Job Title</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Skills Matched</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? jobs.map((job: any) => (
              <tr key={job.id} className="border-b hover:bg-green-50 transition">
                <td className="px-4 py-2 font-semibold text-green-700">{job.title}</td>
                <td className="px-4 py-2">{job.company}</td>
                <td className="px-4 py-2 font-semibold text-indigo-700 flex items-center gap-1">
                  <StarIcon className="text-yellow-500" /> {job.score ?? <span className="italic text-gray-400">N/A</span>}
                </td>
                <td className="px-4 py-2">
                  {(job.skillsMatched || []).length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {job.skillsMatched.map((skill: string, idx: number) => (
                        <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="italic text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="text-center py-4 text-gray-400">No matched jobs found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
} 
import { motion } from "framer-motion";
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';

export default function MatchedJobsTable({ jobs }: { jobs: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <WorkIcon className="text-green-500" /> Matched Jobs
      </h2>
      <div className="overflow-x-auto rounded-xl shadow bg-white/80">
        <table className="min-w-full text-sm md:text-base">
          <thead>
            <tr className="bg-green-100">
              <th className="px-4 py-2 text-left">Job Title</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Skills Matched</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? jobs.map((job: any) => (
              <tr key={job.id} className="border-b hover:bg-green-50 transition">
                <td className="px-4 py-2 font-semibold text-green-700">{job.title}</td>
                <td className="px-4 py-2">{job.company}</td>
                <td className="px-4 py-2 font-semibold text-indigo-700 flex items-center gap-1">
                  <StarIcon className="text-yellow-500" /> {job.score ?? <span className="italic text-gray-400">N/A</span>}
                </td>
                <td className="px-4 py-2">
                  {(job.skillsMatched || []).length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {job.skillsMatched.map((skill: string, idx: number) => (
                        <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="italic text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="text-center py-4 text-gray-400">No matched jobs found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
} 
 
 
 