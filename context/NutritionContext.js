import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NutritionContext = createContext();

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};

export const NutritionProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [dailyStats, setDailyStats] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    insulin: 0
  });

  // Загрузка данных
  useEffect(() => {
    loadNutritionData();
  }, []);

  const loadNutritionData = async () => {
    try {
      const storedMeals = await AsyncStorage.getItem('meals');
      if (storedMeals) {
        const parsedMeals = JSON.parse(storedMeals);
        setMeals(parsedMeals);
        calculateDailyStats(parsedMeals);
      }
    } catch (error) {
      console.error('Error loading nutrition data:', error);
    }
  };

  const saveNutritionData = async (newMeals) => {
    try {
      await AsyncStorage.setItem('meals', JSON.stringify(newMeals));
    } catch (error) {
      console.error('Error saving nutrition data:', error);
    }
  };

  const calculateDailyStats = (mealsList) => {
    const stats = mealsList.reduce((acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
      insulin: acc.insulin + meal.insulin
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, insulin: 0 });
    
    setDailyStats(stats);
  };

  const addMeal = (meal) => {
    const newMeals = [...meals, { ...meal, id: Date.now(), timestamp: new Date() }];
    setMeals(newMeals);
    calculateDailyStats(newMeals);
    saveNutritionData(newMeals);
  };

  const value = {
    meals,
    dailyStats,
    addMeal,
    calculateInsulin: (carbs) => Math.round(carbs / 5),
    getTotalDailyNutrition: () => dailyStats
  };

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  );
};
