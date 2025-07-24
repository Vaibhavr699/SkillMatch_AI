import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export function useResumes(options = {}) {
  return useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const { data } = await api.get('/resumes');
      return data;
    },
    ...options,
  });
}
 
 
 
 
 