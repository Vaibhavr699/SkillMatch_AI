"use client";
import { motion } from "framer-motion";
import StarIcon from '@mui/icons-material/Star';
import DescriptionIcon from '@mui/icons-material/Description';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ClientDate from '../ClientDate';

export default function ResumesTable({ resumes, onViewSuggestions }: { resumes: any[], onViewSuggestions: (resume: any) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-10"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <DescriptionIcon className="text-blue-500" /> Uploaded Resumes
      </h2>
      <div className="overflow-x-auto rounded-xl shadow bg-white/80">
        <table className="min-w-full text-sm md:text-base">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-4 py-2 text-left">Resume ID</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Skills</th>
              <th className="px-4 py-2 text-left">Uploaded</th>
              <th className="px-4 py-2 text-left">Suggestions</th>
            </tr>
          </thead>
          <tbody>
            {resumes.length > 0 ? resumes.map((resume) => (
              <tr key={resume.id} className="border-b hover:bg-blue-50 transition">
                <td className="px-4 py-2">{resume.id}</td>
                <td className="px-4 py-2 font-semibold text-indigo-700 flex items-center gap-1">
                  <StarIcon className="text-yellow-500" /> {resume.analysis?.score ?? <span className="italic text-gray-400">N/A</span>}
                </td>
                <td className="px-4 py-2">
                  {(resume.analysis?.skills || []).length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {resume.analysis.skills.map((skill: string, idx: number) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="italic text-gray-400">N/A</span>
                  )}
                </td>
                <td className="px-4 py-2"><ClientDate date={resume.createdAt} /></td>
                <td className="px-4 py-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition"
                    onClick={() => onViewSuggestions(resume)}
                  >
                    <TipsAndUpdatesIcon className="text-yellow-200" /> View Suggestions
                  </motion.button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="text-center py-4 text-gray-400">No resumes uploaded yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
} 
import { motion } from "framer-motion";
import StarIcon from '@mui/icons-material/Star';
import DescriptionIcon from '@mui/icons-material/Description';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ClientDate from '../ClientDate';

export default function ResumesTable({ resumes, onViewSuggestions }: { resumes: any[], onViewSuggestions: (resume: any) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-10"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <DescriptionIcon className="text-blue-500" /> Uploaded Resumes
      </h2>
      <div className="overflow-x-auto rounded-xl shadow bg-white/80">
        <table className="min-w-full text-sm md:text-base">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-4 py-2 text-left">Resume ID</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Skills</th>
              <th className="px-4 py-2 text-left">Uploaded</th>
              <th className="px-4 py-2 text-left">Suggestions</th>
            </tr>
          </thead>
          <tbody>
            {resumes.length > 0 ? resumes.map((resume) => (
              <tr key={resume.id} className="border-b hover:bg-blue-50 transition">
                <td className="px-4 py-2">{resume.id}</td>
                <td className="px-4 py-2 font-semibold text-indigo-700 flex items-center gap-1">
                  <StarIcon className="text-yellow-500" /> {resume.analysis?.score ?? <span className="italic text-gray-400">N/A</span>}
                </td>
                <td className="px-4 py-2">
                  {(resume.analysis?.skills || []).length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {resume.analysis.skills.map((skill: string, idx: number) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="italic text-gray-400">N/A</span>
                  )}
                </td>
                <td className="px-4 py-2"><ClientDate date={resume.createdAt} /></td>
                <td className="px-4 py-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition"
                    onClick={() => onViewSuggestions(resume)}
                  >
                    <TipsAndUpdatesIcon className="text-yellow-200" /> View Suggestions
                  </motion.button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="text-center py-4 text-gray-400">No resumes uploaded yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
} 
 
 
 