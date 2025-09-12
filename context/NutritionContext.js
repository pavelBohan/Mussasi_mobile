import React, { createContext, useContext, useState, useEffect } from 'react';
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

// В конце файла заменить пустой StyleSheet на:
const styles = StyleSheet.create({
  widget: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  mealInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  mealType: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  mealTime: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  mealDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  insulinText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  prepTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  progressList: {
    gap: 12,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressLabel: {
    width: 80,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    minWidth: 60,
    textAlign: 'right',
  },
  shoppingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  shoppingTrip: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.warning,
  },
  shoppingItems: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  costLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  costValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
});
