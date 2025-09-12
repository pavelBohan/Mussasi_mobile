import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NutritionProvider } from './context/NutritionContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <NutritionProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </NutritionProvider>
  );
}
