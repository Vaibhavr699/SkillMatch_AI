'use client';

import { Card, CardContent, Typography } from '@mui/material';
import { useResumes } from '@/app/utils/hooks';

export function StatsOverview() {
  const { data: resumes, isLoading } = useResumes();

  if (isLoading) return <div>Loading...</div>;

  const stats = [
    { name: 'Total Resumes', value: resumes?.length || 0 },
    { 
      name: 'Average Score', 
      value: resumes?.reduce((acc, curr) => acc + curr.score, 0) / resumes?.length || 0 
    },
    { name: 'Jobs Matched', value: resumes?.reduce((acc, curr) => acc + (curr.matches?.length || 0), 0) },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.name} className="hover:shadow-lg">
          <CardContent>
            <Typography variant="body2" className="text-gray-500">
              {stat.name}
            </Typography>
            <Typography variant="h4" className="font-bold">
              {typeof stat.value === 'number' ? stat.value.toFixed(1) : stat.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}