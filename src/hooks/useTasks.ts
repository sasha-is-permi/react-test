import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasksApi';
import { Task } from '../types/task';

export function useTasks() {
  const queryClient = useQueryClient();

  const query = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: () => tasksApi.getTasks(),
  });

  const createMutation = useMutation({
    mutationFn: (text: string) => tasksApi.createTask(text),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: {id:string, updates: Partial<Omit<Task,'id'>>}) =>
      tasksApi.updateTask(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => tasksApi.deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return {
    ...query,
    createTask: createMutation.mutateAsync,
    updating: updateMutation.isPending,
    updateTask: updateMutation.mutateAsync,
    deleting: deleteMutation.isPending,
    deleteTask: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
}
