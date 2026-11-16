import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = { label: string; actionLabel?: string; badge?: string; onAction?: () => void };

export function SectionHeader({ label, actionLabel, badge, onAction }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.title}>{label}</Text>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      {actionLabel ? (
        <Text style={styles.action} onPress={onAction}>
          {actionLabel}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, marginBottom: 12 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontSize: 20, fontWeight: '700', color: colors.text },
  action: { fontSize: 16, fontWeight: '600', color: colors.link },
  badge: { backgroundColor: colors.orangeBg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  badgeText: { color: colors.orangeFg, fontSize: 12, fontWeight: '600' },
});
