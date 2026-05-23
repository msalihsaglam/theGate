# The Gate - Mindfulness-First Mobile App

**The Gate** is a proactive, mindfulness-focused assistant that prevents doom-scrolling by prompting users to state their intention *before* opening apps on their phone.

## 🎯 Core Philosophy

Rather than reactively reporting screen time *after* excessive use (like traditional Screen Time tools), The Gate acts as a **proactive barrier** that asks: "What brings you here?" when you unlock your device.

**Design Aesthetic:** Cyberpunk-Zen (Deep black background, muted grey text, neon blue/green accent highlights)

## 🛠️ Core Features

### 1. **The Gate Dashboard**
- **Quick-Tags**: Predefined neon buttons for common activities (Google Search, Maps, Phone Call, E-Book, etc.)
- **Custom Intent Input**: Free-text entry for intentions not in quick-tags
- **Skip/Swipe Down**: Non-restrictive design lets users bypass without force
- **Smart Tag Suggestions**: AI suggests new tags based on recurring custom intents

### 2. **Flexible Timer System**
- **Preset Durations**: Each tag has a default time goal (e.g., Google = 2m, Maps = Infinite)
- **Infinite/Flow Mode (∞)**: For activities where time limits don't make sense
- **Unobtrusive Alerts**: Elegant neon line at screen top when time expires (no interruption)
- **Active Session Forgiveness**: Won't close app if user is still in-flow (e.g., navigating)

### 3. **Minimalist Weekly Analytics**
- **Gate Open Rate**: % of intentional vs. skipped opens (minimalist ring chart)
- **Tag Usage Breakdown**: Which intents consumed most time (neon bar chart)
- **AI/Behavioral Insights**: Guilt-free suggestions ("Google searches exceeded 100m this week")
- **Habit Recognition**: Highlights efficient patterns (e.g., Maps in infinite mode works well)

## 📁 Project Structure

```
theGate/
├── src/
│   ├── screens/              # Main app screens
│   │   ├── GateDashboard.tsx # Main gate interface
│   │   ├── Analytics.tsx     # Weekly insights
│   │   └── Settings.tsx      # App preferences
│   ├── components/           # Reusable UI components
│   ├── navigation/           # Navigation configuration
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Global state (Zustand)
│   ├── services/             # API & data services
│   ├── utils/                # Utility functions
│   ├── themes/               # Design system & colors
│   ├── types/                # TypeScript definitions
│   └── assets/               # Icons, images
├── App.tsx                   # Main app entry point
├── app.json                  # Expo configuration
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── README.md
```

## 🚀 Tech Stack

- **React Native** + **Expo** - Cross-platform mobile app
- **TypeScript** - Type-safe development
- **React Navigation** - Tab-based navigation
- **Zustand** - Lightweight state management
- **Expo Notifications** - Push notifications
- **Date-fns** - Date utilities
- **React Native SVG** - Icon rendering

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`

### Setup

1. **Clone and install dependencies:**
   ```bash
   cd theGate
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on device/emulator:**
   - **Android**: Press `a` in terminal or `npm run android`
   - **iOS**: Press `i` in terminal or `npm run ios`
   - **Web**: Press `w` in terminal or `npm run web`

## 🎨 Design System

Colors follow a **Cyberpunk-Zen** palette:
- **Background**: Pure black (#000000)
- **Surface**: Deep grey (#0a0a0a - #141414)
- **Text**: Muted grey (#b0b0b0 for primary, #505050 for subtle)
- **Neon Accents**: 
  - Blue: #00d9ff (primary actions)
  - Green: #39ff14 (success/positive)
  - Purple: #bf00ff (secondary)
  - Pink: #ff006e (alerts)

## 📱 Features in Development

- [ ] Lock screen integration
- [ ] Advanced AI habit tracking
- [ ] Export analytics to CSV
- [ ] Cloud sync across devices
- [ ] Notification scheduling
- [ ] Widget integration
- [ ] Dark/Light theme toggle

## 📝 Development Notes

### State Management (Zustand)
All app state is managed through the `useAppStore` hook. Key stores:
- `currentSession` - Active gate session
- `tags` - User's custom tags
- `sessions` - Historical session data
- `preferences` - User settings

### Type System
All data types are defined in `src/types/index.ts`. New features should extend these definitions.

### Styling
Uses theme from `src/themes/theme.ts`. All colors, spacing, and typography are centralized for consistency.

## 🤝 Contributing

1. Create a feature branch
2. Follow TypeScript best practices
3. Test on both Android and iOS
4. Ensure components follow the Cyberpunk-Zen design

## 📄 License

MIT

---

**Made with mindfulness 🧘**
