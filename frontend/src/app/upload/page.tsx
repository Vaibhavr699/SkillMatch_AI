"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import AIScore from "../components/AIScore";
import SkillTags from "../components/SkillTags";
import ImprovementTips from "../components/ImprovementTips";
import MatchedJobs from "../components/MatchedJobs";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setResult(null);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("http://localhost:5000/resumes/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) {
        toast.error("Upload failed. Please try again.");
        setUploading(false);
        return;
      }
      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((r) => setTimeout(r, 30));
      }
      const data = await res.json();
      setResult(data);
      toast.success("Resume uploaded and analyzed!");
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setUploading(false);
      setProgress(100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 px-2 sm:px-4 md:px-8 py-8">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl mx-auto bg-white/90 rounded-3xl shadow-2xl px-6 py-8 sm:px-10 sm:py-12"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 text-center">Upload Your Resume</h1>
        <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white/70'}`}>
          <input {...getInputProps()} />
          {file ? (
            <div className="text-blue-700 font-semibold">{file.name}</div>
          ) : isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Drag & drop a PDF or DOCX file here, or click to select a file</p>
          )}
        </div>
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="mt-6 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload & Analyze"}
        </button>
        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        )}
        {result && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">Parsed Resume</h2>
                <div className="bg-gray-50 rounded-lg p-4 shadow text-sm text-gray-700 whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {result.parsedText || "No parsed text available."}
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <AIScore score={result.analysis?.score ?? 0} />
                <SkillTags skills={result.analysis?.skills ?? []} />
              </div>
            </div>
            <ImprovementTips tips={result.analysis?.improvementTips ?? []} />
            <MatchedJobs jobs={result.matchedJobs ?? []} />
          </div>
        )}
      </motion.div>
    </div>
  );
} 