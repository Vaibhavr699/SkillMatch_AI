import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';

export function useDeleteResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resumeId: string | number) => {
      await api.delete(`/resumes/${resumeId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
  });
}
