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
} from 'react-native';
import { useAppStore } from '@store/appStore';
import { theme } from '@themes/theme';

export default function GateDashboardScreen() {
  const tags = useAppStore((state) => state.tags);
  const startSession = useAppStore((state) => state.startSession);
  const [customIntent, setCustomIntent] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleTagPress = (tagId: string) => {
    startSession(tagId);
    // Navigation to session screen would happen here
  };

  const handleCustomIntent = () => {
    if (customIntent.trim()) {
      startSession('custom', customIntent);
      setCustomIntent('');
      setShowCustomInput(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to The Gate</Text>
          <Text style={styles.subtitle}>What brings you here?</Text>
        </View>

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

        {/* Skip Button */}
        <Pressable style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip →</Text>
        </Pressable>
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
});
