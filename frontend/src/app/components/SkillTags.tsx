"use client";

function getProficiencyColor(level: string) {
  switch (level) {
    case 'Very High': return 'bg-green-100 text-green-700';
    case 'High': return 'bg-blue-100 text-blue-700';
    case 'Medium': return 'bg-yellow-100 text-yellow-700';
    case 'Low': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}

export default function SkillTags({ skills }: { skills: (string | { name: string, proficiency?: string })[] }) {
  if (!skills || skills.length === 0) return <span className="italic text-gray-400">N/A</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {skills.map((skill, idx) => {
        if (typeof skill === 'string') {
          return (
            <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
              {skill}
            </span>
          );
        } else {
          return (
            <span key={idx} className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getProficiencyColor(skill.proficiency || '')}`}>
              {skill.name}
              {skill.proficiency && (
                <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/70 border border-gray-200">
                  {skill.proficiency}
                </span>
              )}
            </span>
          );
        }
      })}
    </div>
  );
} 