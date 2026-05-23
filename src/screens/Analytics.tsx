/**
 * Analytics Screen
 * Weekly insights and behavioral analysis
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAnalytics } from '@hooks/useGate';
import { theme } from '@themes/theme';

export default function AnalyticsScreen() {
  const analytics = useAnalytics(7);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Weekly Insights</Text>
          <Text style={styles.subtitle}>Last 7 days</Text>
        </View>

        {/* Summary Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Gate Opens</Text>
            <Text style={styles.statValue}>{analytics.totalOpens}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Intention Rate</Text>
            <Text style={styles.statValue}>{analytics.intentionRate.toFixed(0)}%</Text>
          </View>
        </View>

        {/* Tag Analytics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tag Usage</Text>
          <View style={styles.tagList}>
            {analytics.tagAnalytics
              .filter((item) => item.usageCount > 0)
              .map((item) => (
                <View key={item.tag.id} style={styles.tagItem}>
                  <View style={styles.tagInfo}>
                    <Text style={styles.tagName}>{item.tag.label}</Text>
                    <Text style={styles.tagStats}>
                      {item.usageCount} times • {(item.totalDuration / 60).toFixed(1)}m
                    </Text>
                  </View>
                  <View style={styles.tagBar}>
                    <View
                      style={[
                        styles.tagBarFill,
                        { width: `${(item.usageCount / Math.max(...analytics.tagAnalytics.map(t => t.usageCount), 1)) * 100}%` }
                      ]}
                    />
                  </View>
                </View>
              ))}
          </View>
        </View>

        {/* Mindful Message */}
        <View style={styles.messageSection}>
          <Text style={styles.messageTitle}>Mindful Reflection</Text>
          <Text style={styles.messageText}>
            You opened the gate {analytics.totalOpens} times this week with {analytics.intentionRate.toFixed(0)}% intentional opens.
            Keep practicing mindfulness! 🧘
          </Text>
        </View>
      </ScrollView>
    </View>
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
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surfaceAlt,
    borderColor: theme.colors.neon.blue,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  statValue: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.neon.blue,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  tagList: {
    gap: theme.spacing.md,
  },
  tagItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  tagInfo: {
    marginBottom: theme.spacing.sm,
  },
  tagName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  tagStats: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  tagBar: {
    height: 4,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: 2,
    overflow: 'hidden',
  },
  tagBarFill: {
    height: '100%',
    backgroundColor: theme.colors.neon.green,
  },
  messageSection: {
    backgroundColor: theme.colors.surfaceAlt,
    borderColor: theme.colors.neon.purple,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
  },
  messageTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.neon.purple,
    marginBottom: theme.spacing.sm,
  },
  messageText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.lineHeight.relaxed,
  },
});
