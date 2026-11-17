import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../theme';

export type Tab = 'today' | 'children' | 'requests' | 'teachers';

const tabs: { key: Tab; label: string; icon: keyof typeof Ionicons.glyphMap; badge?: number }[] = [
  { key: 'today', label: 'Today', icon: 'sunny-outline' },
  { key: 'children', label: 'Children', icon: 'people-outline' },
  { key: 'requests', label: 'Requests', icon: 'clipboard-outline', badge: 2 },
  { key: 'teachers', label: 'Teachers', icon: 'person-outline' },
];

export function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: 6 + insets.bottom }]}>
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <Pressable key={t.key} style={styles.item} onPress={() => onChange(t.key)}>
            <View style={[styles.iconWrap, on && styles.iconWrapActive]}>
              <Ionicons name={t.icon} size={24} color={on ? colors.primary : colors.muted} />
              {t.badge ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{t.badge}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, on && { color: colors.primary, fontWeight: '700' }]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    paddingBottom: 6,
  },
  item: { flex: 1, alignItems: 'center', gap: 2 },
  iconWrap: { width: 64, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  iconWrapActive: { backgroundColor: colors.blueBg },
  label: { fontSize: 13, color: colors.muted },
  badge: {
    position: 'absolute',
    top: -4,
    right: 8,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.badgeBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.bg,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
