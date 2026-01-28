import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  score: number;
  status: string;
  description: string;
  requirements: string[];
  metadata: {
    remote: boolean;
    salary?: {
      min: number;
      max: number;
      currency: string;
    };
  };
}

interface UseJobsParams {
  status?: string;
  minScore?: number;
}

export function useJobs(params?: UseJobsParams) {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: async () => {
      const { data } = await apiClient.get<Job[]>('/jobs', { params });
      return data;
    },
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await apiClient.get<Job>(`/jobs/${id}`);
      return data;
    },
    enabled: !!id,
  });
}