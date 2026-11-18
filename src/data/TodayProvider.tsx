import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import type { TodayData } from '../models';
import { defaultRepository } from './defaultRepository';
import type { ClassroomRepository } from './repository';

type TodayState = {
  data: TodayData | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
};

const TodayContext = createContext<TodayState | undefined>(undefined);

export function TodayProvider({
  children,
  repository = defaultRepository,
}: {
  children: React.ReactNode;
  repository?: ClassroomRepository;
}) {
  const [data, setData] = useState<TodayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(() => {
    let active = true;
    setLoading(true);
    setError(null);
    repository.getToday().then(
      (result) => {
        if (!active) return;
        setData(result);
        setLoading(false);
      },
      (err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      },
    );
    return () => {
      active = false;
    };
  }, [repository]);

  useEffect(() => load(), [load]);

  const refresh = useCallback(() => {
    load();
  }, [load]);

  return <TodayContext.Provider value={{ data, loading, error, refresh }}>{children}</TodayContext.Provider>;
}

export function useToday(): TodayState {
  const ctx = useContext(TodayContext);
  if (!ctx) {
    throw new Error('useToday must be used within a TodayProvider');
  }
  return ctx;
}
