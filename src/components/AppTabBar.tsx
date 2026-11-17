import React from 'react';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { TabBar, type Tab } from './TabBar';

export function AppTabBar({ state, navigation }: BottomTabBarProps) {
  const active = state.routes[state.index].name as Tab;
  return <TabBar active={active} onChange={(t) => navigation.navigate(t)} />;
}
