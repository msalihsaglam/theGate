/**
 * Cyberpunk-Zen Design System
 * Dark theme with neon accents
 */

export const colors = {
  // Core palette
  background: '#000000', // Deep black
  surface: '#0a0a0a', // Slightly lighter black for surfaces
  surfaceAlt: '#141414', // Alternative surface color
  
  // Text colors
  text: {
    primary: '#b0b0b0', // Muted grey
    secondary: '#808080', // Darker grey
    subtle: '#505050', // Very dark grey
  },
  
  // Neon accents
  neon: {
    blue: '#00d9ff', // Cyber blue
    green: '#39ff14', // Neon green
    purple: '#bf00ff', // Cyber purple
    pink: '#ff006e', // Hot pink
    cyan: '#00f5ff', // Bright cyan
  },
  
  // Semantic colors
  success: '#39ff14',
  warning: '#ffd60a',
  error: '#ff006e',
  info: '#00d9ff',
  
  // Status colors
  border: '#2a2a2a',
  borderLight: '#3a3a3a',
  divider: '#1a1a1a',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayDark: 'rgba(0, 0, 0, 0.9)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#00d9ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#00d9ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#00d9ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const transitions = {
  fast: 150,
  normal: 300,
  slow: 500,
};

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
};
