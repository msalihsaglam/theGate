/**
 * Custom hooks for The Gate app
 */

import { useEffect, useState } from 'react';
import { useAppStore } from '@store/appStore';
import { GateSession } from '@types/index';

/**
 * Hook to manage a gate session with timer
 */
export function useGateSession(sessionId?: string) {
  const [elapsed, setElapsed] = useState(0);
  const currentSession = useAppStore((state) => state.currentSession);
  const endSession = useAppStore((state) => state.endSession);
  
  useEffect(() => {
    if (!currentSession) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const start = currentSession.startTime.getTime();
      setElapsed((now - start) / 1000);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentSession]);
  
  return {
    session: currentSession,
    elapsed,
    endSession,
  };
}

/**
 * Hook to get tag details
 */
export function useTag(tagId: string) {
  const tags = useAppStore((state) => state.tags);
  return tags.find((tag) => tag.id === tagId);
}

/**
 * Hook for screen time tracking
 */
export function useScreenTimeToday() {
  const sessions = useAppStore((state) => state.sessions);
  const today = new Date().toDateString();
  
  const todaySessions = sessions.filter(
    (session) => session.startTime.toDateString() === today
  );
  
  const totalScreenTime = todaySessions.reduce(
    (sum, session) => sum + session.duration,
    0
  );
  
  return {
    totalScreenTime,
    sessionCount: todaySessions.length,
    sessions: todaySessions,
  };
}

/**
 * Hook for analytics
 */
export function useAnalytics(days: number = 7) {
  const sessions = useAppStore((state) => state.sessions);
  const tags = useAppStore((state) => state.tags);
  
  const now = new Date();
  const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  
  const recentSessions = sessions.filter(
    (session) => new Date(session.startTime) >= pastDate
  );
  
  // Calculate tag analytics
  const tagAnalytics = tags.map((tag) => {
    const tagSessions = recentSessions.filter(
      (session) => session.tagId === tag.id && !session.isSkipped
    );
    
    const totalDuration = tagSessions.reduce(
      (sum, session) => sum + session.duration,
      0
    );
    
    return {
      tag,
      usageCount: tagSessions.length,
      totalDuration,
      averageDuration: tagSessions.length > 0 ? totalDuration / tagSessions.length : 0,
    };
  });
  
  const totalOpens = recentSessions.length;
  const skippedOpens = recentSessions.filter((s) => s.isSkipped).length;
  const completedOpens = totalOpens - skippedOpens;
  const mindfulnessScore = totalOpens > 0 ? (completedOpens / totalOpens) * 100 : 100;
  const skipRate = totalOpens > 0 ? (skippedOpens / totalOpens) * 100 : 0;
  
  console.log('📊 Analytics Debug:', {
    totalOpens,
    completedOpens,
    skippedOpens,
    mindfulnessScore: mindfulnessScore.toFixed(0) + '%',
    recentSessions: recentSessions.map((s) => ({
      tagId: s.tagId,
      isSkipped: s.isSkipped,
      duration: s.duration,
    })),
  });
  
  return {
    totalOpens,
    completedOpens,
    skippedOpens,
    mindfulnessScore,
    skipRate,
    tagAnalytics,
    recentSessions,
  };
}
