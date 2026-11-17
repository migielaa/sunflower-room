import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../components/ui';
import { colors } from '../theme';

export default function TeachersScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Teachers</Text>
        <Text style={styles.subtitle}>Staff on shift</Text>
        <Card style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: colors.greenBg }]}>
            <Ionicons name="person-outline" size={26} color={colors.greenFg} />
          </View>
          <Text style={styles.emptyTitle}>Teachers coming soon</Text>
          <Text style={styles.emptyText}>This screen isn't built yet.</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24 },
  title: { fontSize: 32, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 16, color: colors.muted, marginTop: 4 },
  card: { padding: 24, alignItems: 'center', marginTop: 24, gap: 10 },
  iconBox: { width: 56, height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: colors.text, marginTop: 4 },
  emptyText: { fontSize: 14, color: colors.muted },
});
