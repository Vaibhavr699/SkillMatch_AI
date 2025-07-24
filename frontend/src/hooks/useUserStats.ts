import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export function useUserStats(options = {}) {
  return useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      const { data } = await api.get('/users/stats');
      return data;
    },
    ...options,
  });
}
