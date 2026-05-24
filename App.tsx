import React, { useEffect, useCallback } from 'react';
import { View, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@themes/theme';
import AppNavigator from '@navigation/AppNavigator';
import { useAppStore } from '@store/appStore';

function AppContent() {
  const navigation = useNavigation<any>();
  const appState = React.useRef(AppState.currentState);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const showSessionCompletionModal = useAppStore(
    (state) => state.showSessionCompletionModal
  );

  // Start background timer
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const session = useAppStore.getState().currentSession;
      if (!session) return;

      // Get tag details
      const tags = useAppStore.getState().getTags();
      const tag = tags.find((t) => t.id === session.tagId);
      if (!tag) return;

      // If tag is infinite, don't check time limit
      if (tag.isInfinite) return;

      // Calculate elapsed time
      const elapsedSeconds =
        (new Date().getTime() - session.startTime.getTime()) / 1000;

      // Check if time exceeded
      if (elapsedSeconds >= tag.defaultDuration) {
        // Show modal directly
        showSessionCompletionModal(tag.label, tag.defaultDuration);
        console.log(`⏰ Time's up for ${tag.label}`);
      }
    }, 1000);
  }, [showSessionCompletionModal]);

  // Start timer on mount
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showSessionCompletionModal]);

  // Handle app state changes
  const handleAppStateChange = useCallback((nextAppState: string) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      // App came to foreground - restart timer to ensure it's running
      console.log('App came to foreground - restarting timer');
      startTimer();
      navigation.navigate('Gate');
    }
    appState.current = nextAppState;
  }, [startTimer, navigation]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [handleAppStateChange]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="light" />
      <AppNavigator />
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
