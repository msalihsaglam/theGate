/**
 * Local storage service
 * Handles persisting data using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  TAGS: '@theGate_tags',
  SESSIONS: '@theGate_sessions',
  PREFERENCES: '@theGate_preferences',
  ANALYTICS: '@theGate_analytics',
};

export const storageService = {
  // Tags
  async saveTags(tags: any) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(tags));
    } catch (error) {
      console.error('Error saving tags:', error);
    }
  },

  async getTags() {
    try {
      const tags = await AsyncStorage.getItem(STORAGE_KEYS.TAGS);
      return tags ? JSON.parse(tags) : null;
    } catch (error) {
      console.error('Error getting tags:', error);
      return null;
    }
  },

  // Sessions
  async saveSessions(sessions: any) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving sessions:', error);
    }
  },

  async getSessions() {
    try {
      const sessions = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error('Error getting sessions:', error);
      return [];
    }
  },

  // Preferences
  async savePreferences(preferences: any) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.PREFERENCES,
        JSON.stringify(preferences)
      );
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  },

  async getPreferences() {
    try {
      const prefs = await AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return prefs ? JSON.parse(prefs) : null;
    } catch (error) {
      console.error('Error getting preferences:', error);
      return null;
    }
  },

  // Clear all
  async clearAll() {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
