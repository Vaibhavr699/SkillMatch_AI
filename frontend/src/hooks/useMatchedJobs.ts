import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export function useMatchedJobs(options = {}) {
  return useQuery({
    queryKey: ['matchedJobs'],
    queryFn: async () => {
      const { data } = await api.get('/jobs/matched');
      return data;
    },
    ...options,
  });
} 