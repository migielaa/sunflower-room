import type { TodayData } from '../models';
import type { ClassroomRepository } from './repository';

// Minimal REST implementation: GETs `${baseUrl}/today.json` and returns it as
// TodayData. Point baseUrl at any backend that serves the same shape — a static
// file (GitHub Pages), a REST API, a serverless function, etc.
export function createRestRepository(baseUrl: string): ClassroomRepository {
  const root = baseUrl.replace(/\/+$/, '');
  return {
    async getToday() {
      const res = await fetch(`${root}/today.json`);
      if (!res.ok) {
        throw new Error(`Failed to load classroom (${res.status})`);
      }
      return (await res.json()) as TodayData;
    },
  };
}
