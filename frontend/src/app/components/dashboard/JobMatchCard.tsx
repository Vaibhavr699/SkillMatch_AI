"use client";

import { Briefcase, MapPin, DollarSign, Clock, Eye, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function JobMatchCard({ job }: { job: any }) {
  const [showModal, setShowModal] = useState(false);
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.04, boxShadow: '0 0 24px 4px #a78bfa55', borderColor: '#a78bfa', transition: { duration: 0.3 } }
  };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
    exit: { opacity: 0, scale: 0.85, y: 40, transition: { duration: 0.2 } }
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="bg-white border border-gray-200 shadow-sm rounded-2xl p-4 sm:p-6 mb-6 flex flex-col sm:flex-row items-start gap-4 w-full max-w-full overflow-hidden transition-all duration-300"
        style={{ minHeight: 180 }}
      >
        <div className="flex-shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-xl flex items-center justify-center">
            <Briefcase className="h-7 w-7 sm:h-8 sm:w-8 text-blue-500" />
          </div>
        </div>
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-base sm:text-lg text-gray-900 truncate">{job.title}</h3>
              <p className="text-gray-600 font-medium truncate">{job.company}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500 mb-3">
            {job.location && <span className="flex items-center truncate"><MapPin className="h-4 w-4 mr-1.5" />{job.location}</span>}
            {job.salary && <span className="flex items-center truncate"><DollarSign className="h-4 w-4 mr-1.5" />{job.salary}</span>}
            {job.posted && <span className="flex items-center truncate"><Clock className="h-4 w-4 mr-1.5" />{job.posted}</span>}
          </div>
          <div className="flex items-center flex-wrap gap-2 mb-4">
            {job.skills?.map((skill: string) => (
              <span
                key={skill}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium truncate border border-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
            <button
              className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
              onClick={() => setShowModal(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </button>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showModal && (
          <Dialog open={showModal} onClose={() => setShowModal(false)} className="fixed z-50 inset-0 overflow-y-auto">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-center justify-center min-h-screen px-4"
            >
              <div className="fixed inset-0 bg-black opacity-20" aria-hidden="true" />
              <div className="relative bg-white rounded-2xl shadow-lg p-8 max-w-md w-full z-10 border border-gray-200">
                <Dialog.Title className="text-xl font-bold text-gray-900 mb-2">
                  {job.title}
                </Dialog.Title>
                <Dialog.Description className="mb-4 text-gray-700">
                  <div className="mb-2 font-semibold text-lg text-gray-800">{job.company}</div>
                  <div className="mb-2 text-sm text-gray-600">{job.description}</div>
                  <div className="mt-4">
                    <span className="font-semibold text-gray-800">Skills:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {job.skills?.map((skill: string) => (
                        <span
                          key={skill}
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium truncate border border-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Dialog.Description>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 w-full"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}