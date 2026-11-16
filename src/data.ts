export const classroom = {
  date: 'Friday, 13 November',
  name: 'Sunflower Room',
  userInitials: 'AT',
  updated: '10:15',
  total: 20,
  counts: { inClass: 15, notArrived: 3, pickedUp: 1, absent: 1 },
};

export type Teacher = {
  initials: string;
  name: string;
  isYou?: boolean;
  detail: string;
  bg: string;
  fg: string;
};

export const teachers: Teacher[] = [
  { initials: 'AT', name: 'Ana Torres', isYou: true, detail: 'Lead teacher · until 3:30', bg: '#DDF0E6', fg: '#1F6B4A' },
  { initials: 'CD', name: 'Claire Dubois', detail: 'Covering for Marta · until 1:00', bg: '#EADCF3', fg: '#6B3A8C' },
];

export const teacherNotes = [
  { icon: 'cafe-outline', text: 'Javier is on break · back at 10:30' },
  { icon: 'time-outline', text: 'Priya starts at 12:00' },
] as const;

export type SpecialRequest = {
  initials: string;
  title: string;
  detail: string;
  bg: string;
  fg: string;
};

export const requests: SpecialRequest[] = [
  { initials: 'EF', title: 'Emma · early pickup at 1:00', detail: 'Pickup change · from mom, 7:45', bg: '#FBE9D8', fg: '#C0651A' },
  { initials: 'OT', title: 'Olivia · wake from nap by 2:00', detail: 'Nap · from dad, 8:20', bg: '#FBF0C4', fg: '#8A6A00' },
];

export const totalRequests = 6;
export const newRequests = 2;
