import React from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AttendanceCard } from '../components/AttendanceCard';
import { SectionHeader } from '../components/SectionHeader';
import { ErrorState, LoadingState } from '../components/ScreenState';
import { Avatar, Card, Divider, Pill } from '../components/ui';
import { useToday } from '../data/TodayProvider';
import { colors } from '../theme';

export default function TodayScreen() {
  const { data, loading, error, refresh } = useToday();

  if (!data) {
    if (error) return <ErrorState message={error.message} onRetry={refresh} />;
    return <LoadingState />;
  }

  const { classroom, alerts, teachers, teacherNotes, requests, requestsSummary } = data;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />}
      >
        <Text style={styles.date}>{classroom.date}</Text>
        <View style={styles.titleRow}>
          <Pressable style={styles.roomPicker}>
            <Text style={styles.room}>{classroom.name}</Text>
            <Ionicons name="chevron-down" size={22} color={colors.text} />
          </Pressable>
          <Avatar initials={classroom.userInitials} bg={colors.greenBg} fg={colors.greenFg} size={48} />
        </View>

        <AttendanceCard counts={classroom.counts} total={classroom.total} updated={classroom.updated} />

        <SectionHeader label="Needs attention" />
        <Card>
          {alerts.map((a, i) => (
            <View key={a.id}>
              {i > 0 && <Divider />}
              <View style={styles.row}>
                <View style={[styles.iconBox, { backgroundColor: a.iconBg }]}>
                  <Ionicons name={a.icon} size={24} color={a.iconFg} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.rowTitle}>{a.title}</Text>
                  <Text style={styles.rowSub}>{a.detail}</Text>
                </View>
                {a.action === 'message' ? (
                  <Pressable style={styles.outlineBtn}>
                    <Text style={styles.outlineBtnText}>Message</Text>
                  </Pressable>
                ) : (
                  <Ionicons name="chevron-forward" size={20} color={colors.muted} />
                )}
              </View>
            </View>
          ))}
        </Card>

        <SectionHeader label="Teachers in class" actionLabel="See all" />
        <Card>
          {teachers.map((t) => (
            <View key={t.name} style={styles.row}>
              <Avatar initials={t.initials} bg={t.bg} fg={t.fg} />
              <View style={styles.flex}>
                <Text style={styles.rowTitle}>
                  {t.name}
                  {t.isYou ? <Text style={styles.you}> (you)</Text> : null}
                </Text>
                <Text style={styles.rowSub}>{t.detail}</Text>
              </View>
              <Pill label="In class" bg={colors.blueBg} fg={colors.primary} />
            </View>
          ))}
          <View style={styles.notes}>
            <Divider />
            {teacherNotes.map((n) => (
              <View key={n.text} style={styles.noteRow}>
                <Ionicons name={n.icon} size={18} color={colors.muted} />
                <Text style={styles.noteText}>{n.text}</Text>
              </View>
            ))}
          </View>
        </Card>

        <SectionHeader
          label="Special requests"
          badge={`${requestsSummary.new} new`}
          actionLabel={`All ${requestsSummary.total}`}
        />
        <Card>
          {requests.map((r, i) => (
            <View key={r.initials}>
              {i > 0 && <Divider />}
              <View style={styles.row}>
                <Avatar initials={r.initials} bg={r.bg} fg={r.fg} />
                <View style={styles.flex}>
                  <Text style={styles.rowTitle}>{r.title}</Text>
                  <Text style={styles.rowSub}>{r.detail}</Text>
                </View>
                <Pill label="New" bg={colors.orangeBg} fg={colors.orangeFg} />
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  flex: { flex: 1 },
  date: { fontSize: 16, color: colors.muted, marginTop: 8 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 20 },
  roomPicker: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  room: { fontSize: 32, fontWeight: '800', color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  iconBox: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  rowTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
  rowSub: { fontSize: 14, color: colors.muted, marginTop: 2 },
  you: { fontWeight: '400', color: colors.muted },
  outlineBtn: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 },
  outlineBtnText: { fontWeight: '700', fontSize: 16, color: colors.text },
  notes: { paddingHorizontal: 16, paddingBottom: 12, gap: 10 },
  noteRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  noteText: { fontSize: 15, color: colors.text },
});
