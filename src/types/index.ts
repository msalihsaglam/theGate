/**
 * Core type definitions for The Gate app
 */

// Quick Tag / Intent
export interface QuickTag {
  id: string;
  label: string;
  icon?: string;
  defaultDuration: number; // in seconds
  isInfinite: boolean;
  color?: string;
  createdAt: Date;
  usageCount: number;
}

// Session / Gate Entry
export interface GateSession {
  id: string;
  tagId: string;
  customIntent?: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in seconds
  isSkipped: boolean;
  isDurationExceeded: boolean;
}

// Daily Analytics
export interface DailyAnalytics {
  date: Date;
  totalGateOpens: number;
  intentionalOpens: number;
  skippedOpens: number;
  sessions: GateSession[];
}

// Weekly Insights
export interface WeeklyInsights {
  weekStart: Date;
  weekEnd: Date;
  totalOpens: number;
  intentionRate: number; // percentage
  tagAnalytics: TagAnalytic[];
  topTags: QuickTag[];
  totalScreenTime: number; // in seconds
}

// Tag Analytics
export interface TagAnalytic {
  tagId: string;
  tagLabel: string;
  usageCount: number;
  totalDuration: number; // in seconds
  averageDuration: number; // in seconds
  percentage: number; // of total usage
}

// Behavioral Insights
export interface BehavioralInsight {
  id: string;
  type: 'warning' | 'praise' | 'suggestion';
  title: string;
  message: string;
  data?: any;
  timestamp: Date;
}

// User Preferences
export interface UserPreferences {
  enableNotifications: boolean;
  enableHapticFeedback: boolean;
  theme: 'dark' | 'light'; // Default: dark (Cyberpunk-Zen)
  soundEnabled: boolean;
  defaultInfiniteTags: string[];
}

// Store State
export interface AppState {
  currentSession: GateSession | null;
  tags: QuickTag[];
  sessions: GateSession[];
  analytics: DailyAnalytics[];
  insights: BehavioralInsight[];
  preferences: UserPreferences;
  isLoading: boolean;
  error: string | null;
}
