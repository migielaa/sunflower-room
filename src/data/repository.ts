import type { TodayData } from '../models';

// The async boundary the UI depends on. Swap mockRepository for a real
// implementation (REST, Supabase, Firebase, ...) without touching screens.
export interface ClassroomRepository {
  getToday(): Promise<TodayData>;
}
