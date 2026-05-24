/**
 * Session Timer Screen
 * Shows countdown timer and session controls
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Dimensions,
} from 'react-native';
import { useAppStore } from '@store/appStore';
import { theme } from '@themes/theme';
import { useTag } from '@hooks/useGate';

const { height: screenHeight } = Dimensions.get('window');

interface SessionTimerScreenProps {
  route?: {
    params?: {
      tagId?: string;
    };
  };
  navigation?: any;
}

export default function SessionTimerScreen({
  route,
  navigation,
}: SessionTimerScreenProps) {
  const currentSession = useAppStore((state) => state.currentSession);
  const skipGate = useAppStore((state) => state.skipGate);
  const endSession = useAppStore((state) => state.endSession);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const tagId = route?.params?.tagId || currentSession?.tagId;
  const tag = useTag(tagId || '');

  // Timer interval
  useEffect(() => {
    if (!isActive || !currentSession) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, currentSession]);

  const handleSkip = () => {
    skipGate();
    navigation?.goBack();
  };

  const handleEndSession = () => {
    if (currentSession) {
      endSession(currentSession.id);
      navigation?.navigate('Gate');
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  if (!currentSession) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No active session</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Tag/Intent Display */}
      <View style={styles.header}>
        <Text style={styles.tagLabel}>
          {currentSession.customIntent || tag?.label || 'Session'}
        </Text>
        {tag && !currentSession.customIntent && (
          <Text style={styles.tagDuration}>
            {tag.isInfinite ? '∞' : `${tag.defaultDuration / 60}m`}
          </Text>
        )}
      </View>

      {/* Timer Display */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(elapsedSeconds)}</Text>
        <Text style={styles.timerLabel}>Elapsed</Text>
      </View>

      {/* Session Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Started:</Text>
          <Text style={styles.infoValue}>
            {currentSession.startTime.toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text
            style={[
              styles.infoValue,
              currentSession.isSkipped && { color: theme.colors.neon.blue },
            ]}
          >
            {currentSession.isSkipped ? 'Skipped' : 'Active'}
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <Pressable
          style={[styles.button, styles.skipButton]}
          onPress={handleSkip}
        >
          <Text style={styles.skipButtonText}>Skip (↑)</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.endButton]}
          onPress={handleEndSession}
        >
          <Text style={styles.endButtonText}>End Session</Text>
        </Pressable>
      </View>

      {/* Gesture Hint */}
      <View style={styles.hint}>
        <Text style={styles.hintText}>Swipe up to skip</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  tagLabel: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: '700',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  tagDuration: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.neon.blue,
    fontWeight: '600',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.xxl,
  },
  timerText: {
    fontSize: 72,
    fontWeight: '700',
    color: theme.colors.neon.blue,
    fontVariant: ['tabular-nums'],
  },
  timerLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.md,
  },
  infoContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  infoLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
  },
  infoValue: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  controlsContainer: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  button: {
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.neon.blue,
  },
  skipButtonText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.neon.blue,
    fontWeight: '600',
  },
  endButton: {
    backgroundColor: theme.colors.neon.green,
  },
  endButtonText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.background,
    fontWeight: '700',
  },
  hint: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
  hintText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neon.blue,
    fontWeight: '500',
  },
  errorText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
