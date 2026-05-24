/**
 * Navigation structure for The Gate app
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@themes/theme';

// Screens (to be created)
import GateDashboardScreen from '@screens/GateDashboard';
import AnalyticsScreen from '@screens/Analytics';
import SettingsScreen from '@screens/Settings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GateStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.neon.blue,
        headerTitleStyle: {
          fontWeight: '600',
          color: theme.colors.text.primary,
        },
      }}
    >
      <Stack.Screen
        name="GateDashboard"
        component={GateDashboardScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Gate"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.neon.blue,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';

          if (route.name === 'Gate') {
            iconName = focused ? 'door' : 'door-outline';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Gate"
        component={GateStackNavigator}
        options={{
          title: 'The Gate',
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          title: 'Analytics',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
