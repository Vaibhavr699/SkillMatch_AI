"use client";

export default function StatsCards({ stats }: { stats: { label: string, value: string | number, icon: React.ReactNode, color: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className={`flex flex-col items-center justify-center bg-${stat.color}-50 rounded-xl shadow p-4 text-center`}>
          <div className={`text-2xl font-bold text-${stat.color}-700 mb-1 flex items-center gap-2`}>{stat.icon}{stat.value}</div>
          <div className="text-gray-600 text-xs font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
} 

export default function StatsCards({ stats }: { stats: { label: string, value: string | number, icon: React.ReactNode, color: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className={`flex flex-col items-center justify-center bg-${stat.color}-50 rounded-xl shadow p-4 text-center`}>
          <div className={`text-2xl font-bold text-${stat.color}-700 mb-1 flex items-center gap-2`}>{stat.icon}{stat.value}</div>
          <div className="text-gray-600 text-xs font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
} 
 
 
 