import type { TodayData } from '../models';
import { colors } from '../theme';

// Static sample data. This is the single source the mock repository returns;
// a real backend implementation can produce the same TodayData shape.
export const todaySeed: TodayData = {
  classroom: {
    id: 'sunflower',
    name: 'Sunflower Room',
    date: 'Friday, 13 November',
    userInitials: 'AT',
    updated: '10:15',
    total: 20,
    counts: { inClass: 15, notArrived: 3, pickedUp: 1, absent: 1 },
  },
  alerts: [
    {
      id: 'a1',
      icon: 'alert-circle-outline',
      iconBg: colors.orangeBg,
      iconFg: colors.orangeFg,
      title: '2 children not arrived',
      detail: 'Isabella M. and Diego F. · no message from family',
      action: 'message',
    },
    {
      id: 'a2',
      icon: 'medkit-outline',
      iconBg: colors.blueBg,
      iconFg: colors.primary,
      title: "Leo's inhaler at 12:00",
      detail: '2 puffs before lunch · medication form on file',
      action: 'chevron',
    },
  ],
  teachers: [
    { initials: 'AT', name: 'Ana Torres', isYou: true, detail: 'Lead teacher · until 3:30', bg: '#DDF0E6', fg: '#1F6B4A' },
    { initials: 'CD', name: 'Claire Dubois', detail: 'Covering for Marta · until 1:00', bg: '#EADCF3', fg: '#6B3A8C' },
  ],
  teacherNotes: [
    { icon: 'cafe-outline', text: 'Javier is on break · back at 10:30' },
    { icon: 'time-outline', text: 'Priya starts at 12:00' },
  ],
  requests: [
    { initials: 'EF', title: 'Emma · early pickup at 1:00', detail: 'Pickup change · from mom, 7:45', bg: '#FBE9D8', fg: '#C0651A' },
    { initials: 'OT', title: 'Olivia · wake from nap by 2:00', detail: 'Nap · from dad, 8:20', bg: '#FBF0C4', fg: '#8A6A00' },
  ],
  requestsSummary: { total: 6, new: 2 },
};
