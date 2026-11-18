import { API_URL } from '../config';
import { mockRepository } from './mockRepository';
import type { ClassroomRepository } from './repository';
import { createRestRepository } from './restRepository';

// Use the REST backend when EXPO_PUBLIC_API_URL is set; otherwise fall back to
// the bundled mock so the app always runs with no configuration.
export const defaultRepository: ClassroomRepository = API_URL
  ? createRestRepository(API_URL)
  : mockRepository;
