/**
 * The Gate Dashboard Screen
 * Main entry point where users see quick tags and set their intent
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  SafeAreaView,
  Modal,
  BackHandler,
  Alert,
} from 'react-native';
import uuid from 'react-native-uuid';
import { useAppStore } from '@store/appStore';
import { GateSession } from '@types/index';
import { theme } from '@themes/theme';

export default function GateDashboardScreen() {
  const tags = useAppStore((state) => state.tags);
  const currentSession = useAppStore((state) => state.currentSession);
  const startSession = useAppStore((state) => state.startSession);
  const endSession = useAppStore((state) => state.endSession);
  const continueSession = useAppStore((state) => state.continueSession);
  const skipGate = useAppStore((state) => state.skipGate);
  const sessionCompletionModal = useAppStore(
    (state) => state.sessionCompletionModal
  );
  const hideSessionCompletionModal = useAppStore(
    (state) => state.hideSessionCompletionModal
  );
  const [customIntent, setCustomIntent] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleTagPress = (tagId: string) => {
    const session = startSession(tagId);
    console.log('Session started:', session);
  };

  const handleCustomIntent = () => {
    if (customIntent.trim()) {
      const session = startSession('custom', customIntent);
      console.log('Custom session started:', session);
      setCustomIntent('');
      setShowCustomInput(false);
    }
  };

  const handleSkip = () => {
    console.log('Skip button pressed - Current session:', currentSession);
    
    if (currentSession) {
      console.log('Calling skipGate() - Session exists');
      skipGate();
    } else {
      console.log('Skip pressed with NO session - Recording as dopamine-driven skip');
      // Create a skip record even without session
      // This counts as a "Gate bypass" attempt
      const skipSession: GateSession = {
        id: uuid.v4() as string,
        tagId: 'skip-only',
        customIntent: 'Skipped without intent',
        startTime: new Date(),
        endTime: new Date(),
        duration: 0,
        isSkipped: true,
        isDurationExceeded: false,
      };
      useAppStore.setState((state) => ({
        sessions: [...state.sessions, skipSession],
      }));
      console.log('Skip-only session recorded');
    }
    
    console.log('⚠️ User bypassed Gate - Mindfulness score decreased');
    console.log('Updated sessions:', useAppStore.getState().sessions);
    hideSessionCompletionModal();
  };

  const handleTaskFinished = () => {
    if (currentSession) {
      endSession(currentSession.id);
      hideSessionCompletionModal();
      console.log('Session ended - task finished');
    }
  };

  const handleContinue = () => {
    continueSession(); // Reset timer
    hideSessionCompletionModal();
    console.log('Session continues - timer reset');
  };

  const handleDifferentTask = () => {
    if (currentSession) {
      endSession(currentSession.id);
    }
    hideSessionCompletionModal();
    // User can now select a different tag
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to The Gate</Text>
          <Text style={styles.subtitle}>What brings you here?</Text>
        </View>

        {/* Active Session Indicator */}
        {currentSession && (
          <View style={styles.activeSessionCard}>
            <Text style={styles.activeSessionLabel}>🟢 Active Session</Text>
            <Text style={styles.activeSessionValue}>
              {currentSession.customIntent ||
                useAppStore.getState().tags.find((t) => t.id === currentSession.tagId)
                  ?.label}
            </Text>
            <Text style={styles.activeSessionTime}>
              Started: {new Date(currentSession.startTime).toLocaleTimeString()}
            </Text>
          </View>
        )}

        {/* Quick Tags */}
        <View style={styles.tagsSection}>
          {tags.map((tag) => (
            <Pressable
              key={tag.id}
              style={styles.tagButton}
              onPress={() => handleTagPress(tag.id)}
            >
              <Text style={styles.tagLabel}>{tag.label}</Text>
              <Text style={styles.tagDuration}>
                {tag.isInfinite ? '∞' : `${tag.defaultDuration / 60}m`}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Custom Intent Section */}
        <View style={styles.customSection}>
          <Pressable
            style={styles.customButton}
            onPress={() => setShowCustomInput(!showCustomInput)}
          >
            <Text style={styles.customButtonText}>+ Custom Intent</Text>
          </Pressable>

          {showCustomInput && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="What's your intention?"
                placeholderTextColor={theme.colors.text.secondary}
                value={customIntent}
                onChangeText={setCustomIntent}
              />
              <Pressable style={styles.confirmButton} onPress={handleCustomIntent}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Skip Button - Always accessible */}
        <Pressable 
          style={styles.skipButton} 
          onPress={handleSkip}
        >
          <Text style={styles.skipButtonText}>
            {currentSession ? '⬇️ Skip Gate' : '⬇️ Skip (Direct)'}
          </Text>
        </Pressable>
      </ScrollView>

      {/* Session Completion Modal */}
      <Modal
        visible={sessionCompletionModal.isVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>⏰ Time's Up!</Text>
            <Text style={styles.modalSubtitle}>
              {sessionCompletionModal.tagLabel} ({sessionCompletionModal.duration / 60}m)
            </Text>
            <Text style={styles.modalQuestion}>Is your task finished?</Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.finishedButton]}
                onPress={handleTaskFinished}
              >
                <Text style={styles.finishedButtonText}>✓ Task Finished</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.continueButton]}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>→ Continue</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.differentButton]}
                onPress={handleDifferentTask}
              >
                <Text style={styles.differentButtonText}>↻ Different Task</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.modalSkipButton]}
                onPress={handleSkip}
              >
                <Text style={styles.modalSkipButtonText}>⚡ Skip (Bypass Gate)</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  activeSessionCard: {
    backgroundColor: theme.colors.surface,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.neon.green,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  activeSessionLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neon.green,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  activeSessionValue: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  activeSessionTime: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  tagsSection: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  tagButton: {
    backgroundColor: theme.colors.surfaceAlt,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  tagDuration: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neon.blue,
    fontWeight: '600',
  },
  customSection: {
    marginBottom: theme.spacing.xl,
  },
  customButton: {
    backgroundColor: theme.colors.neon.blue,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  customButtonText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.background,
    fontWeight: '600',
  },
  inputContainer: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.neon.blue,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.base,
  },
  confirmButton: {
    backgroundColor: theme.colors.neon.green,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.background,
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  skipButtonText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
  },
  // Modal Skip Button
  modalSkipButton: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.text.secondary,
    borderWidth: 2,
  },
  modalSkipButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xxl,
    width: '85%',
    borderWidth: 2,
    borderColor: theme.colors.neon.blue,
  },
  modalTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.neon.blue,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  modalSubtitle: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.primary,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  modalQuestion: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  modalButtons: {
    gap: theme.spacing.md,
  },
  modalButton: {
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 2,
  },
  finishedButton: {
    backgroundColor: theme.colors.neon.green,
    borderColor: theme.colors.neon.green,
  },
  finishedButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '700',
    color: theme.colors.background,
  },
  continueButton: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.neon.blue,
  },
  continueButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.neon.blue,
  },
  differentButton: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.text.secondary,
  },
  differentButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
});
