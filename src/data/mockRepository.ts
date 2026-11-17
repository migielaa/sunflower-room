import type { ClassroomRepository } from './repository';
import { todaySeed } from './seed';

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// In-memory implementation. The artificial delay exercises the loading and
// pull-to-refresh states so they behave the same against a real backend.
export const mockRepository: ClassroomRepository = {
  async getToday() {
    await delay(600);
    return todaySeed;
  },
};
