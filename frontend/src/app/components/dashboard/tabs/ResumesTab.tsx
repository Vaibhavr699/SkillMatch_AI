"use client";
import { useResumes } from '@/hooks/useResumes';
import ResumeCard from '../ResumeCard';

export default function ResumesTab() {
  const { data: resumes = [], isLoading } = useResumes();

  if (isLoading) return <div>Loading...</div>;
  if (!resumes.length) return <div>No resumes uploaded yet.</div>;

  return (
    <div className="grid gap-4">
      {resumes.map((resume: any) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </div>
  );
} 