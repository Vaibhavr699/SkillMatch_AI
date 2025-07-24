"use client";
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Tooltip from '@mui/material/Tooltip';

function getScoreColor(score: number) {
  if (score >= 90) return 'from-green-300 to-green-500 text-green-900';
  if (score >= 75) return 'from-yellow-200 to-yellow-400 text-yellow-900';
  if (score >= 50) return 'from-orange-200 to-orange-400 text-orange-900';
  return 'from-red-200 to-red-400 text-red-900';
}

export default function AIScore({ score }: { score: number }) {
  let label = 'Good';
  let icon = <StarIcon className="text-yellow-600" fontSize="small" />;
  if (score >= 90) {
    label = 'Excellent';
    icon = <CheckCircleIcon className="text-green-600" fontSize="small" />;
  } else if (score < 50) {
    label = 'Needs Improvement';
    icon = <WarningAmberIcon className="text-red-600" fontSize="small" />;
  }
  return (
    <Tooltip title={`AI Score: ${score}/100 (${label})`} arrow>
      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${getScoreColor(score)} font-bold shadow text-sm`}>
        {icon}
        {score}/100
      </div>
    </Tooltip>
  );
} 