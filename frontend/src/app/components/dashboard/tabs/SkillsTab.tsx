"use client";
import { useState } from 'react';
import { 
  Star, 
  TrendingUp, 
  Zap, 
  Target, 
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Code2,
  Brain,
  Info
} from 'lucide-react';

function getProficiencyColor(level: string) {
  switch (level) {
    case 'Very High': 
      return {
        bg: 'bg-gradient-to-r from-emerald-50 to-green-50',
        text: 'text-emerald-800',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-700 border-emerald-300',
        icon: 'text-emerald-600',
        glow: 'hover:shadow-emerald-200/50'
      };
    case 'High': 
      return {
        bg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
        text: 'text-blue-800',
        border: 'border-blue-200',
        badge: 'bg-blue-100 text-blue-700 border-blue-300',
        icon: 'text-blue-600',
        glow: 'hover:shadow-blue-200/50'
      };
    case 'Medium': 
      return {
        bg: 'bg-gradient-to-r from-amber-50 to-yellow-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-700 border-amber-300',
        icon: 'text-amber-600',
        glow: 'hover:shadow-amber-200/50'
      };
    case 'Low': 
      return {
        bg: 'bg-gradient-to-r from-rose-50 to-red-50',
        text: 'text-rose-800',
        border: 'border-rose-200',
        badge: 'bg-rose-100 text-rose-700 border-rose-300',
        icon: 'text-rose-600',
        glow: 'hover:shadow-rose-200/50'
      };
    default: 
      return {
        bg: 'bg-gradient-to-r from-gray-50 to-slate-50',
        text: 'text-gray-800',
        border: 'border-gray-200',
        badge: 'bg-gray-100 text-gray-700 border-gray-300',
        icon: 'text-gray-600',
        glow: 'hover:shadow-gray-200/50'
      };
  }
}

function getProficiencyIcon(level: string) {
  switch (level) {
    case 'Very High': return <Award className="w-3 h-3" />;
    case 'High': return <TrendingUp className="w-3 h-3" />;
    case 'Medium': return <Target className="w-3 h-3" />;
    case 'Low': return <Zap className="w-3 h-3" />;
    default: return <Star className="w-3 h-3" />;
  }
}

export default function SkillTags({ 
  skills = [
    'JavaScript',
    'React',
    { name: 'TypeScript', proficiency: 'Very High' },
    { name: 'Node.js', proficiency: 'High' },
    'Python',
    { name: 'CSS', proficiency: 'Medium' },
    { name: 'Docker', proficiency: 'Low' },
    'MongoDB',
    { name: 'AWS', proficiency: 'High' },
    'Tailwind CSS'
  ],
  showCount = true,
  collapsible = true,
  maxInitialDisplay = 6
}: { 
  skills: (string | { name: string, proficiency?: string })[];
  showCount?: boolean;
  collapsible?: boolean;
  maxInitialDisplay?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  if (!skills || skills.length === 0) {
    return (
      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
        <Info className="w-4 h-4 text-gray-400" />
        <span className="italic text-gray-500 font-medium">No skills specified</span>
      </div>
    );
  }

  const displayedSkills = collapsible && !isExpanded 
    ? skills.slice(0, maxInitialDisplay) 
    : skills;
  
  const hasMoreSkills = skills.length > maxInitialDisplay && collapsible;
  const remainingCount = skills.length - maxInitialDisplay;

  return (
    <div className="w-full">
      {/* Header */}
      {showCount && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg shadow-md">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Skills & Expertise</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-full border border-indigo-200">
            <Code2 className="w-4 h-4 text-indigo-600" />
            <span className="text-indigo-700 font-semibold text-sm">
              {skills.length} Skills
            </span>
          </div>
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
        {displayedSkills.map((skill, idx) => {
          const isString = typeof skill === 'string';
          const skillName = isString ? skill : skill.name;
          const proficiency = isString ? undefined : skill.proficiency;
          const colors = getProficiencyColor(proficiency || '');
          const isHovered = hoveredSkill === idx;

          return (
            <div
              key={idx}
              className={`
                relative group cursor-pointer transition-all duration-300 transform
                ${colors.bg} ${colors.border} ${colors.glow}
                border rounded-xl p-3 hover:scale-105 hover:shadow-lg
                ${isHovered ? 'ring-2 ring-violet-300 ring-opacity-50' : ''}
                animate-in fade-in slide-in-from-bottom-2 duration-500
              `}
              style={{ animationDelay: `${idx * 50}ms` }}
              onMouseEnter={() => setHoveredSkill(idx)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill Content */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {proficiency && (
                    <div className={`flex-shrink-0 ${colors.icon}`}>
                      {getProficiencyIcon(proficiency)}
                    </div>
                  )}
                  <span className={`${colors.text} font-semibold text-sm truncate`}>
                    {skillName}
                  </span>
                </div>
                
                {proficiency && (
                  <div className={`
                    flex-shrink-0 px-2 py-1 rounded-lg text-xs font-bold border
                    ${colors.badge} transition-all duration-200
                    ${isHovered ? 'scale-110' : ''}
                  `}>
                    {proficiency}
                  </div>
                )}
              </div>

              {/* Hover Effect - Sparkle Animation */}
              <div className={`
                absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                pointer-events-none rounded-xl
              `}>
                <Sparkles className={`
                  absolute top-2 right-2 w-3 h-3 ${colors.icon}
                  animate-pulse opacity-0 group-hover:opacity-100
                  transition-opacity duration-500 delay-200
                `} />
              </div>

              {/* Proficiency Level Indicator */}
              {proficiency && (
                <div className="mt-2">
                  <div className="w-full bg-white/60 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`
                        h-full rounded-full transition-all duration-700 delay-300
                        ${proficiency === 'Very High' ? 'w-full bg-emerald-500' : ''}
                        ${proficiency === 'High' ? 'w-3/4 bg-blue-500' : ''}
                        ${proficiency === 'Medium' ? 'w-1/2 bg-amber-500' : ''}
                        ${proficiency === 'Low' ? 'w-1/4 bg-rose-500' : ''}
                        ${!proficiency ? 'w-0' : ''}
                      `}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Expand/Collapse Button */}
      {hasMoreSkills && (
        <div className="flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
              transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg
              ${isExpanded 
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600' 
                : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700'
              }
            `}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show {remainingCount} More Skills
              </>
            )}
          </button>
        </div>
      )}

      {/* Skills Summary (when collapsed) */}
      {!isExpanded && hasMoreSkills && (
        <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {skills.slice(maxInitialDisplay, maxInitialDisplay + 3).map((skill, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full border-2 border-white flex items-center justify-center shadow-md"
                >
                  <span className="text-white text-xs font-bold">
                    {(typeof skill === 'string' ? skill : skill.name).charAt(0).toUpperCase()}
                  </span>
                </div>
              ))}
              {remainingCount > 3 && (
                <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                  <span className="text-gray-600 text-xs font-bold">
                    +{remainingCount - 3}
                  </span>
                </div>
              )}
            </div>
            <span className="text-indigo-700 font-medium text-sm">
              and {remainingCount} more skills waiting to be explored
            </span>
          </div>
        </div>
      )}

      {/* Legend for Proficiency Levels */}
      {skills.some(skill => typeof skill !== 'string' && skill.proficiency) && (
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Proficiency Legend
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { level: 'Very High', desc: 'Expert' },
              { level: 'High', desc: 'Advanced' },
              { level: 'Medium', desc: 'Intermediate' },
              { level: 'Low', desc: 'Beginner' }
            ].map(({ level, desc }) => {
              const colors = getProficiencyColor(level);
              return (
                <div key={level} className="flex items-center gap-2">
                  <div className={`flex-shrink-0 ${colors.icon}`}>
                    {getProficiencyIcon(level)}
                  </div>
                  <div>
                    <span className={`text-xs font-semibold ${colors.text}`}>{level}</span>
                    <span className="text-xs text-gray-500 block">{desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
 
 
 
 