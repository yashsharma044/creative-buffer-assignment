# Creative Buffer - React Native Machine Coding Assignment

This is a React Native app built for the machine coding assignment using Expo, React Navigation, React Query, and Zustand.

## Features

- **Home Screen**:
  - Displays recently viewed products in a horizontal scrollable list.
  - Limits recently viewed items to a maximum of 5 products (newest views automatically pushed to top/front).
  - Empty state handled when no products have been viewed yet.
  - "Explore Products" button navigating directly to the product catalog.

- **Explore Products Screen**:
  - Fetches product list from FakeStore API.
  - Displays products in a 2-column responsive grid layout 
  - Shows activity loader during initial fetch and handles error / empty list states.
  - Long-pressing any product opens a confirmation modal to remove it from the list.

- **Product Detail Screen**:
  - Shows complete product details including image, title, price, rating, reviews count, description, and category.
  - Viewing a detail screen automatically appends/updates the product in the Recently Viewed state.

## Tech Stack & Architecture

- **Framework**: Expo 
- **Navigation**: React Navigation 
- **State Management**: Zustand with `AsyncStorage` 
- **Data Fetching**: TanStack React Query 
- **Safe Area**: `react-native-safe-area-context` for bottom and top notch insets
- **Styling**: `StyleSheet.create` with responsive helper (`StyleHelper` scaling functions)

## Project Structure

```
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── src
    ├── components
    │   ├── ConfirmationModal.tsx
    │   └── ProductCard.tsx
    ├── config
    │   └── api.ts
    ├── constants
    │   └── colors.ts
    ├── libs
    │   └── StyleHelper.ts
    ├── navigation
    │   ├── AppNavigator.tsx
    │   └── types.ts
    ├── screens
    │   ├── ExploreScreen.tsx
    │   ├── HomeScreen.tsx
    │   └── ProductDetailScreen.tsx
    ├── services
    │   └── useProduct.ts
    ├── store
    │   └── UseProductStore.ts
    ├── translation
    │   ├── en.json
    │   └── index.ts
    └── types
        └── product.ts
```

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npx expo start
   ```

3. **Run on Emulator / Device**:
   - Press `a` for Android Emulator.
   - Press `i` for iOS Simulator.
   - Scan the QR code using Expo Go app on your physical device.

## Scripts

- `npm run start` - Starts Expo development server
- `npm run android` - Runs app on Android
- `npm run ios` - Runs app on iOS
- `npx tsc --noEmit` - Runs TypeScript type checking
