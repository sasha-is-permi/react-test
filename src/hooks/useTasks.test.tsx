// Первый тест проверяет, что задачи загружаются.
//  Второй — что задача добавляется и список обновляется.

import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTasks } from './useTasks';

// Обертка для провайдера react-query
const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useTasks', () => {
  beforeEach(() => {
    // Очистка localStorage перед каждым тестом для изоляции
    localStorage.clear();
  });

  it('должен получать список задач', async () => {
    const { result } = renderHook(() => useTasks(), { wrapper: createWrapper() });

    // Ждем загрузки данных
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(Array.isArray(result.current.data)).toBe(true);
    expect(result.current.data?.length).toBeGreaterThan(0);
    expect(result.current.data?.[0]).toHaveProperty('id');
  });

  it('должен добавлять новую задачу и обновлять список', async () => {
    const { result } = renderHook(() => useTasks(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const prevLength = result.current.data!.length;

    await act(async () => {
      await result.current.createTask('Новая задача');
    });

    // Ждем, когда список обновится после мутации
    await waitFor(() => {
      expect(result.current.data?.length).toBe(prevLength + 1);
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(result.current.data?.[0].text).toBe('Новая задача');
    });
  });
});
