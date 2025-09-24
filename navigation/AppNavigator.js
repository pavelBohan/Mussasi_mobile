
// navigation/AppNavigator.js - ДОБАВЬТЕ ИМПОРТ И ЭКРАН

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

// Импорт экранов
import HomeScreen from '../screens/HomeScreen';
import NutritionScreen from '../screens/NutritionScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Импорт компонента детального просмотра рецепта
import RecipeDetailScreen from '../components/nutrition/RecipeDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Стек навигатор для экрана питания
const NutritionStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="NutritionMain" component={NutritionScreen} />
    <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Nutrition':
            iconName = focused ? 'restaurant' : 'restaurant-outline';
            break;
          case 'Schedule':
            iconName = focused ? 'calendar' : 'calendar-outline';
            break;
          case 'Stats':
            iconName = focused ? 'analytics' : 'analytics-outline';
            break;
          case 'Settings':
            iconName = focused ? 'settings' : 'settings-outline';
            break;
          default:
            iconName = 'circle';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textSecondary,
      tabBarStyle: {
        backgroundColor: COLORS.surface,
        borderTopColor: COLORS.border,
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{ tabBarLabel: 'Главная' }}
    />
    <Tab.Screen 
      name="Nutrition" 
      component={NutritionStack}
      options={{ tabBarLabel: 'Питание' }}
    />
    <Tab.Screen 
      name="Schedule" 
      component={ScheduleScreen}
      options={{ tabBarLabel: 'Расписание' }}
    />
    <Tab.Screen 
      name="Stats" 
      component={StatsScreen}
      options={{ tabBarLabel: 'Статистика' }}
    />
    <Tab.Screen 
      name="Settings" 
      component={SettingsScreen}
      options={{ tabBarLabel: 'Настройки' }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default AppNavigator;