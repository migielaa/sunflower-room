import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AttendanceCard } from '../components/AttendanceCard';
import { SectionHeader } from '../components/SectionHeader';
import { Avatar, Card, Divider, Pill } from '../components/ui';
import { classroom, newRequests, requests, teacherNotes, teachers, totalRequests } from '../data';
import { colors } from '../theme';

export default function TodayScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.date}>{classroom.date}</Text>
        <View style={styles.titleRow}>
          <Pressable style={styles.roomPicker}>
            <Text style={styles.room}>{classroom.name}</Text>
            <Ionicons name="chevron-down" size={22} color={colors.text} />
          </Pressable>
          <Avatar initials={classroom.userInitials} bg={colors.greenBg} fg={colors.greenFg} size={48} />
        </View>

        <AttendanceCard />

        <SectionHeader label="Needs attention" />
        <Card>
          <View style={styles.row}>
            <View style={[styles.iconBox, { backgroundColor: colors.orangeBg }]}>
              <Ionicons name="alert-circle-outline" size={24} color={colors.orangeFg} />
            </View>
            <View style={styles.flex}>
              <Text style={styles.rowTitle}>2 children not arrived</Text>
              <Text style={styles.rowSub}>Isabella M. and Diego F. · no message from family</Text>
            </View>
            <Pressable style={styles.outlineBtn}>
              <Text style={styles.outlineBtnText}>Message</Text>
            </Pressable>
          </View>
          <Divider />
          <Pressable style={styles.row}>
            <View style={[styles.iconBox, { backgroundColor: colors.blueBg }]}>
              <Ionicons name="medkit-outline" size={22} color={colors.primary} />
            </View>
            <View style={styles.flex}>
              <Text style={styles.rowTitle}>Leo's inhaler at 12:00</Text>
              <Text style={styles.rowSub}>2 puffs before lunch · medication form on file</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.muted} />
          </Pressable>
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

        <SectionHeader label="Special requests" badge={`${newRequests} new`} actionLabel={`All ${totalRequests}`} />
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
