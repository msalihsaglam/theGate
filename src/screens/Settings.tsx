/**
 * Settings Screen
 * App preferences and configuration
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Pressable, SafeAreaView } from 'react-native';
import { useAppStore } from '@store/appStore';
import { theme } from '@themes/theme';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const preferences = useAppStore((state) => state.preferences);
  const setPreferences = useAppStore((state) => state.setPreferences);
  const reset = useAppStore((state) => state.reset);

  const handleToggle = (key: string, value: boolean) => {
    setPreferences({ [key]: value });
  };

  const handleReset = () => {
    reset();
    alert('All data has been reset');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Text style={styles.settingText}>Enable Notifications</Text>
            </View>
            <Switch
              value={preferences.enableNotifications}
              onValueChange={(value) => handleToggle('enableNotifications', value)}
              trackColor={{ false: theme.colors.border, true: theme.colors.neon.blue }}
              thumbColor={preferences.enableNotifications ? theme.colors.neon.cyan : theme.colors.text.secondary}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Text style={styles.settingText}>Sound</Text>
            </View>
            <Switch
              value={preferences.soundEnabled}
              onValueChange={(value) => handleToggle('soundEnabled', value)}
              trackColor={{ false: theme.colors.border, true: theme.colors.neon.blue }}
              thumbColor={preferences.soundEnabled ? theme.colors.neon.cyan : theme.colors.text.secondary}
            />
          </View>
        </View>

        {/* Haptics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feedback</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Text style={styles.settingText}>Haptic Feedback</Text>
            </View>
            <Switch
              value={preferences.enableHapticFeedback}
              onValueChange={(value) => handleToggle('enableHapticFeedback', value)}
              trackColor={{ false: theme.colors.border, true: theme.colors.neon.blue }}
              thumbColor={preferences.enableHapticFeedback ? theme.colors.neon.cyan : theme.colors.text.secondary}
            />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.appName}>The Gate</Text>
            <Text style={styles.appVersion}>Version 0.1.0</Text>
            <Text style={styles.appDescription}>
              A mindfulness-focused proactive assistant for conscious phone usage
            </Text>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <Pressable
            style={styles.dangerButton}
            onPress={handleReset}
          >
            <Ionicons name="trash-bin" size={18} color={theme.colors.error} />
            <Text style={styles.dangerButtonText}>Reset All Data</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.neon.blue,
    marginBottom: theme.spacing.md,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  settingLabel: {
    flex: 1,
  },
  settingText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
  },
  aboutCard: {
    backgroundColor: theme.colors.surfaceAlt,
    borderColor: theme.colors.neon.green,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  appName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.neon.green,
    marginBottom: theme.spacing.sm,
  },
  appVersion: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  appDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.error,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  dangerButtonText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.error,
    fontWeight: '500',
  },
});
