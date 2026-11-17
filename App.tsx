import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TodayScreen from './src/screens/TodayScreen';
import ChildrenScreen from './src/screens/ChildrenScreen';
import RequestsScreen from './src/screens/RequestsScreen';
import TeachersScreen from './src/screens/TeachersScreen';
import { AppTabBar } from './src/components/AppTabBar';
import type { Tab as TabName } from './src/components/TabBar';

type RootTabParamList = Record<TabName, undefined>;

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="today"
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <AppTabBar {...props} />}
        >
          <Tab.Screen name="today" component={TodayScreen} />
          <Tab.Screen name="children" component={ChildrenScreen} />
          <Tab.Screen name="requests" component={RequestsScreen} />
          <Tab.Screen name="teachers" component={TeachersScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
