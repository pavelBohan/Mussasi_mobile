import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NutritionProvider } from './context/NutritionContext';
import { AppProvider } from './context/AppContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <AppProvider>
      <NutritionProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </NutritionProvider>
    </AppProvider>
  );
}