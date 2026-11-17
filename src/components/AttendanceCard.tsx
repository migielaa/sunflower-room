import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './ui';
import type { AttendanceCounts } from '../models';
import { colors } from '../theme';

type Props = {
  counts: AttendanceCounts;
  total: number;
  updated: string;
  onCheckIn?: () => void;
};

export function AttendanceCard({ counts, total, updated, onCheckIn }: Props) {
  const legend = [
    { label: 'In class', value: counts.inClass, color: colors.inClass },
    { label: 'Picked up', value: counts.pickedUp, color: colors.pickedUp },
    { label: 'Not arrived', value: counts.notArrived, color: colors.notArrived },
    { label: 'Absent', value: counts.absent, color: colors.absent, outline: true },
  ];
  const segments = [
    { v: counts.inClass, c: colors.inClass },
    { v: counts.pickedUp, c: colors.pickedUp },
    { v: counts.notArrived, c: colors.notArrived },
    { v: counts.absent, c: colors.absent },
  ];
  return (
    <Card style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.title}>Children in class</Text>
        <Text style={styles.updated}>Updated {updated}</Text>
      </View>
      <View style={styles.big}>
        <Text style={styles.bigNum}>{counts.inClass}</Text>
        <Text style={styles.of}>of {total} children</Text>
      </View>
      <View style={styles.bar}>
        {segments.map((s, i) => (
          <View key={i} style={{ flex: s.v, backgroundColor: s.c, marginLeft: i ? 3 : 0 }} />
        ))}
      </View>
      <View style={styles.legend}>
        {legend.map((l) => (
          <View key={l.label} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: l.color }, l.outline && styles.dotOutline]} />
            <Text style={styles.legendLabel}>{l.label}</Text>
            <Text style={styles.legendValue}>{l.value}</Text>
          </View>
        ))}
      </View>
      <Pressable style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]} onPress={onCheckIn}>
        <Text style={styles.buttonText}>Check children in & out</Text>
        <Ionicons name="chevron-forward" size={18} color="#fff" />
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 24 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '600', color: colors.muted },
  updated: { fontSize: 14, color: colors.muted },
  big: { flexDirection: 'row', alignItems: 'baseline', gap: 10, marginTop: 12 },
  bigNum: { fontSize: 64, fontWeight: '800', color: colors.text, lineHeight: 72 },
  of: { fontSize: 20, color: colors.muted },
  bar: { flexDirection: 'row', height: 14, borderRadius: 7, overflow: 'hidden', marginTop: 12 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 18, rowGap: 10 },
  legendItem: { width: '50%', flexDirection: 'row', alignItems: 'center', paddingRight: 16 },
  dot: { width: 12, height: 12, borderRadius: 3, marginRight: 8 },
  dotOutline: { borderWidth: 1, borderColor: '#BDB8AC' },
  legendLabel: { flex: 1, fontSize: 16, color: colors.text },
  legendValue: { fontSize: 16, fontWeight: '600', color: colors.text },
  button: {
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 14,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
