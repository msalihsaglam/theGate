/**
 * Global state management using Zustand
 */

import { create } from 'zustand';
import { AppState, GateSession, QuickTag, BehavioralInsight } from '@types/index';
import uuid from 'react-native-uuid';

const DEFAULT_TAGS: QuickTag[] = [
  {
    id: uuid.v4() as string,
    label: 'Google Search',
    defaultDuration: 5, // 5 seconds for testing
    isInfinite: false,
    color: '#00d9ff',
    createdAt: new Date(),
    usageCount: 0,
  },
  {
    id: uuid.v4() as string,
    label: 'Maps',
    defaultDuration: 300,
    isInfinite: true,
    color: '#39ff14',
    createdAt: new Date(),
    usageCount: 0,
  },
  {
    id: uuid.v4() as string,
    label: 'Phone Call',
    defaultDuration: 300,
    isInfinite: false,
    color: '#bf00ff',
    createdAt: new Date(),
    usageCount: 0,
  },
  {
    id: uuid.v4() as string,
    label: 'E-Book',
    defaultDuration: 600,
    isInfinite: true,
    color: '#ff006e',
    createdAt: new Date(),
    usageCount: 0,
  },
];

interface AppStore extends AppState {
  // Session actions
  startSession: (tagId: string, customIntent?: string) => GateSession;
  endSession: (sessionId: string) => void;
  skipGate: () => void;
  continueSession: (additionalTime?: number) => void;
  
  // Tag actions
  addTag: (tag: Omit<QuickTag, 'id' | 'createdAt' | 'usageCount'>) => void;
  removeTag: (tagId: string) => void;
  updateTag: (tagId: string, updates: Partial<QuickTag>) => void;
  getTags: () => QuickTag[];
  
  // Analytics actions
  getWeeklyAnalytics: () => any;
  getInsights: () => BehavioralInsight[];
  
  // Preferences
  setPreferences: (prefs: Partial<any>) => void;
  
  // UI State
  sessionCompletionModal: {
    isVisible: boolean;
    tagLabel: string;
    duration: number;
  };
  showSessionCompletionModal: (tagLabel: string, duration: number) => void;
  hideSessionCompletionModal: () => void;
  
  // Utility
  reset: () => void;
}

const DEFAULT_PREFERENCES = {
  enableNotifications: true,
  enableHapticFeedback: true,
  theme: 'dark' as const,
  soundEnabled: true,
  defaultInfiniteTags: [],
};

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  currentSession: null,
  tags: DEFAULT_TAGS,
  sessions: [],
  analytics: [],
  insights: [],
  preferences: DEFAULT_PREFERENCES,
  isLoading: false,
  error: null,
  sessionCompletionModal: {
    isVisible: false,
    tagLabel: '',
    duration: 0,
  },
  
  // Session actions
  startSession: (tagId: string, customIntent?: string) => {
    const session: GateSession = {
      id: uuid.v4() as string,
      tagId,
      customIntent,
      startTime: new Date(),
      duration: 0,
      isSkipped: false,
      isDurationExceeded: false,
    };
    
    set({ currentSession: session });
    return session;
  },
  
  endSession: (sessionId: string) => {
    const { currentSession, sessions } = get();
    if (currentSession && currentSession.id === sessionId) {
      const endedSession = {
        ...currentSession,
        endTime: new Date(),
        duration: (new Date().getTime() - currentSession.startTime.getTime()) / 1000,
      };
      
      set({
        currentSession: null,
        sessions: [...sessions, endedSession],
      });
    }
  },
  
  skipGate: () => {
    const { currentSession, sessions } = get();
    if (currentSession) {
      const endedSession = {
        ...currentSession,
        endTime: new Date(),
        duration: (new Date().getTime() - currentSession.startTime.getTime()) / 1000,
        isSkipped: true,
      };
      
      set({
        currentSession: null,
        sessions: [...sessions, endedSession],
      });
    }
  },

  continueSession: (additionalTime?: number) => {
    const { currentSession } = get();
    if (currentSession) {
      // Reset start time to give fresh time
      set({
        currentSession: {
          ...currentSession,
          startTime: new Date(),
        },
      });
      console.log('Session continued - timer reset');
    }
  },
  
  // Tag actions
  addTag: (tag) => {
    const newTag: QuickTag = {
      ...tag,
      id: uuid.v4() as string,
      createdAt: new Date(),
      usageCount: 0,
    };
    set((state) => ({
      tags: [...state.tags, newTag],
    }));
  },
  
  removeTag: (tagId: string) => {
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== tagId),
    }));
  },
  
  updateTag: (tagId: string, updates: Partial<QuickTag>) => {
    set((state) => ({
      tags: state.tags.map((tag) =>
        tag.id === tagId ? { ...tag, ...updates } : tag
      ),
    }));
  },
  
  getTags: () => get().tags,
  
  // Analytics
  getWeeklyAnalytics: () => {
    const { sessions } = get();
    // TODO: Implement weekly analytics calculation
    return {};
  },
  
  getInsights: () => get().insights,
  
  // Preferences
  setPreferences: (prefs) => {
    set((state) => ({
      preferences: { ...state.preferences, ...prefs },
    }));
  },

  // UI State
  showSessionCompletionModal: (tagLabel: string, duration: number) => {
    set({
      sessionCompletionModal: {
        isVisible: true,
        tagLabel,
        duration,
      },
    });
  },

  hideSessionCompletionModal: () => {
    set({
      sessionCompletionModal: {
        isVisible: false,
        tagLabel: '',
        duration: 0,
      },
    });
  },
  
  // Utility
  reset: () => {
    set({
      currentSession: null,
      tags: DEFAULT_TAGS,
      sessions: [],
      analytics: [],
      insights: [],
      preferences: DEFAULT_PREFERENCES,
      isLoading: false,
      error: null,
      sessionCompletionModal: {
        isVisible: false,
        tagLabel: '',
        duration: 0,
      },
    });
  },
}));
