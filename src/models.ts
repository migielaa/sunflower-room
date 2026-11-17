import type { Ionicons } from '@expo/vector-icons';

export type IoniconName = keyof typeof Ionicons.glyphMap;

export type AttendanceCounts = {
  inClass: number;
  notArrived: number;
  pickedUp: number;
  absent: number;
};

export type Classroom = {
  id: string;
  name: string;
  date: string;
  userInitials: string;
  updated: string;
  total: number;
  counts: AttendanceCounts;
};

export type Teacher = {
  initials: string;
  name: string;
  isYou?: boolean;
  detail: string;
  bg: string;
  fg: string;
};

export type TeacherNote = {
  icon: IoniconName;
  text: string;
};

export type Alert = {
  id: string;
  icon: IoniconName;
  iconBg: string;
  iconFg: string;
  title: string;
  detail: string;
  action: 'message' | 'chevron';
};

export type SpecialRequest = {
  initials: string;
  title: string;
  detail: string;
  bg: string;
  fg: string;
};

export type RequestsSummary = {
  total: number;
  new: number;
};

export type TodayData = {
  classroom: Classroom;
  alerts: Alert[];
  teachers: Teacher[];
  teacherNotes: TeacherNote[];
  requests: SpecialRequest[];
  requestsSummary: RequestsSummary;
};
