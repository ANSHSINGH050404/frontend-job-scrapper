import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';

interface Approval {
  _id: string;
  type: 'email' | 'form_submission' | 'application';
  entityId: string;
  entityData: any;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  reviewedAt?: string;
}

export function useApprovals() {
  return useQuery({
    queryKey: ['approvals'],
    queryFn: async () => {
      const { data } = await apiClient.get<Approval[]>('/approvals');
      return data;
    },
    refetchInterval: 5000, // Poll every 5 seconds for new approvals
  });
}

export function useApproval(id: string) {
  return useQuery({
    queryKey: ['approval', id],
    queryFn: async () => {
      const { data } = await apiClient.get<Approval>(`/approvals/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useApproveAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (approvalId: string) => {
      const { data } = await apiClient.post(`/approvals/${approvalId}/approve`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvals'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
}

export function useRejectAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ approvalId, reason }: { approvalId: string; reason?: string }) => {
      const { data } = await apiClient.post(`/approvals/${approvalId}/reject`, { reason });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvals'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
}