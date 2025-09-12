import React, { createContext, useContext, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NutritionContext = createContext();

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within NutritionProvider');
  }
  return context;
};

export const NutritionProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных при старте
  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      const savedMeals = await AsyncStorage.getItem('meals');
      if (savedMeals) {
        setMeals(JSON.parse(savedMeals));
      }
    } catch (error) {
      console.error('Error loading meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveMeals = async (newMeals) => {
    try {
      await AsyncStorage.setItem('meals', JSON.stringify(newMeals));
      setMeals(newMeals);
    } catch (error) {
      console.error('Error saving meals:', error);
    }
  };

  const addMeal = (meal) => {
    const newMeals = [...meals, { ...meal, id: Date.now() }];
    saveMeals(newMeals);
  };

  const deleteMeal = (mealId) => {
    const newMeals = meals.filter(meal => meal.id !== mealId);
    saveMeals(newMeals);
  };

  // Расчет дневной статистики
  const getDayStats = () => {
    const today = new Date().toDateString();
    const todayMeals = meals.filter(meal => 
      new Date(meal.timestamp).toDateString() === today
    );

    const totals = todayMeals.reduce((acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.fat += meal.fat;
      acc.carbs += meal.carbs;
      return acc;
    }, { calories: 0, protein: 0, fat: 0, carbs: 0 });

    const insulinDose = Math.round(totals.carbs / 5);
    return { ...totals, insulinDose, mealsCount: todayMeals.length };
  };

  const value = {
    meals,
    loading,
    addMeal,
    deleteMeal,
    getDayStats,
  };

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  );
};