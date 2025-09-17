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

// Базовые рецепты системы "10 контейнеров"
const MEAL_PREP_RECIPES = {
  // Завтрак
  protein_pudding: {
    id: 'protein_pudding',
    name: 'Протеиновый пудинг',
    category: 'breakfast',
    servings: 4,
    prepTime: 15,
    nutrition: { calories: 120, protein: 15, carbs: 8, fat: 3 },
    insulin: 2,
    ingredients: [
      { name: 'Творог 0%', amount: 200, unit: 'г' },
      { name: 'Овсяные хлопья', amount: 40, unit: 'г' },
      { name: 'Банан', amount: 0.5, unit: 'шт' }
    ]
  },
  khachapuri: {
    id: 'khachapuri',
    name: 'Хачапури из творожного теста',
    category: 'breakfast',
    servings: 6,
    prepTime: 30,
    nutrition: { calories: 180, protein: 12, carbs: 15, fat: 8 },
    insulin: 3,
    ingredients: [
      { name: 'Творог 5%', amount: 300, unit: 'г' },
      { name: 'Овсяная мука', amount: 100, unit: 'г' },
      { name: 'Яйцо', amount: 2, unit: 'шт' },
      { name: 'Сыр легкий', amount: 100, unit: 'г' }
    ]
  },
  
  // Обед
  chicken_soup: {
    id: 'chicken_soup',
    name: 'Куриный суп с овощами',
    category: 'lunch',
    servings: 6,
    prepTime: 45,
    nutrition: { calories: 200, protein: 20, carbs: 12, fat: 6 },
    insulin: 3,
    ingredients: [
      { name: 'Куриное филе', amount: 400, unit: 'г' },
      { name: 'Морковь', amount: 2, unit: 'шт' },
      { name: 'Лук', amount: 1, unit: 'шт' },
      { name: 'Брокколи', amount: 200, unit: 'г' }
    ]
  },
  complex_garnish: {
    id: 'complex_garnish',
    name: 'Комплексный гарнир',
    category: 'lunch',
    servings: 6,
    prepTime: 40,
    nutrition: { calories: 350, protein: 25, carbs: 30, fat: 12 },
    insulin: 6,
    ingredients: [
      { name: 'Гречка', amount: 200, unit: 'г' },
      { name: 'Куриное филе', amount: 300, unit: 'г' },
      { name: 'Морковь', amount: 1, unit: 'шт' },
      { name: 'Лук', amount: 1, unit: 'шт' }
    ]
  },

  // Салаты
  tuna_salad: {
    id: 'tuna_salad',
    name: 'Салат с тунцом',
    category: 'dinner',
    servings: 4,
    prepTime: 15,
    nutrition: { calories: 240, protein: 20, carbs: 8, fat: 12 },
    insulin: 2,
    ingredients: [
      { name: 'Тунец в с/с', amount: 200, unit: 'г' },
      { name: 'Огурцы', amount: 2, unit: 'шт' },
      { name: 'Помидоры', amount: 2, unit: 'шт' },
      { name: 'Листья салата', amount: 100, unit: 'г' }
    ]
  },

  // Перекусы
  mini_pizza: {
    id: 'mini_pizza',
    name: 'Мини-пицца',
    category: 'snack',
    servings: 8,
    prepTime: 25,
    nutrition: { calories: 80, protein: 6, carbs: 8, fat: 3 },
    insulin: 2,
    ingredients: [
      { name: 'Творожное тесто', amount: 200, unit: 'г' },
      { name: 'Томатная паста', amount: 50, unit: 'г' },
      { name: 'Сыр легкий', amount: 100, unit: 'г' }
    ]
  },

  protein_bar: {
    id: 'protein_bar',
    name: 'Протеиновый батончик',
    category: 'snack',
    servings: 8,
    prepTime: 20,
    nutrition: { calories: 90, protein: 8, carbs: 10, fat: 2 },
    insulin: 2,
    ingredients: [
      { name: 'Творог 0%', amount: 200, unit: 'г' },
      { name: 'Овсяные хлопья', amount: 100, unit: 'г' },
      { name: 'Заменитель сахара', amount: 20, unit: 'г' }
    ]
  }
};

// Готовые планы meal prep
const MEAL_PREP_PLANS = {
  standard: {
    id: 'standard',
    name: 'Стандартный план (1760 ккал)',
    totalCalories: 1760,
    totalInsulin: 25,
    recipes: [
      { recipeId: 'protein_pudding', servings: 1 },
      { recipeId: 'khachapuri', servings: 1 },
      { recipeId: 'chicken_soup', servings: 1 },
      { recipeId: 'complex_garnish', servings: 1 },
      { recipeId: 'tuna_salad', servings: 1 },
      { recipeId: 'mini_pizza', servings: 1 },
      { recipeId: 'protein_bar', servings: 1 }
    ],
    schedule: {
      breakfast: ['protein_pudding', 'khachapuri'],
      lunch: ['chicken_soup', 'complex_garnish'],
      snack1: ['protein_bar'],
      dinner: ['tuna_salad'],
      snack2: ['mini_pizza']
    }
  }
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
  
  // Meal Prep состояние
  const [mealPrepPlan, setMealPrepPlan] = useState(MEAL_PREP_PLANS.standard);
  const [containers, setContainers] = useState([]);
  const [cookingSession, setCookingSession] = useState(null);
  const [activeTimers, setActiveTimers] = useState([]);

  // Загрузка данных
  useEffect(() => {
    loadNutritionData();
  }, []);

  const loadNutritionData = async () => {
    try {
      const storedMeals = await AsyncStorage.getItem('meals');
      const storedContainers = await AsyncStorage.getItem('containers');
      
      if (storedMeals) {
        const parsedMeals = JSON.parse(storedMeals);
        setMeals(parsedMeals);
        calculateDailyStats(parsedMeals);
      }
      
      if (storedContainers) {
        setContainers(JSON.parse(storedContainers));
      }
    } catch (error) {
      console.error('Error loading nutrition data:', error);
    }
  };

  const saveNutritionData = async (newMeals, newContainers = containers) => {
    try {
      await AsyncStorage.setItem('meals', JSON.stringify(newMeals));
      await AsyncStorage.setItem('containers', JSON.stringify(newContainers));
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

  // Meal Prep функции
  const startCookingSession = (planId = 'standard') => {
    const plan = MEAL_PREP_PLANS[planId];
    const session = {
      id: Date.now(),
      planId,
      startTime: new Date(),
      recipes: plan.recipes.map(item => ({
        ...MEAL_PREP_RECIPES[item.recipeId],
        servings: item.servings,
        status: 'pending' // pending, cooking, completed
      })),
      totalTime: 120, // 2 часа
      status: 'active'
    };
    
    setCookingSession(session);
    return session;
  };

  const updateRecipeStatus = (recipeId, status) => {
    if (!cookingSession) return;
    
    const updatedSession = {
      ...cookingSession,
      recipes: cookingSession.recipes.map(recipe =>
        recipe.id === recipeId ? { ...recipe, status } : recipe
      )
    };
    
    setCookingSession(updatedSession);
  };

  const completeCookingSession = () => {
    if (!cookingSession) return;
    
    // Создаем контейнеры из готовых рецептов
    const newContainers = cookingSession.recipes
      .filter(recipe => recipe.status === 'completed')
      .map(recipe => ({
        id: `${recipe.id}_${Date.now()}`,
        recipeId: recipe.id,
        name: recipe.name,
        servings: recipe.servings,
        nutrition: recipe.nutrition,
        insulin: recipe.insulin,
        preparedAt: new Date(),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 дня
        status: 'fresh'
      }));
    
    const updatedContainers = [...containers, ...newContainers];
    setContainers(updatedContainers);
    saveNutritionData(meals, updatedContainers);
    
    setCookingSession(null);
    return newContainers;
  };

  const consumeContainer = (containerId) => {
    const container = containers.find(c => c.id === containerId);
    if (!container) return;
    
    // Добавляем в дневной рацион
    const meal = {
      id: Date.now(),
      name: container.name,
      calories: container.nutrition.calories,
      protein: container.nutrition.protein,
      carbs: container.nutrition.carbs,
      fat: container.nutrition.fat,
      insulin: container.insulin,
      timestamp: new Date(),
      source: 'meal_prep'
    };
    
    const updatedMeals = [...meals, meal];
    setMeals(updatedMeals);
    calculateDailyStats(updatedMeals);
    
    // Уменьшаем количество порций в контейнере
    const updatedContainers = containers.map(c =>
      c.id === containerId
        ? { ...c, servings: c.servings - 1 }
        : c
    ).filter(c => c.servings > 0);
    
    setContainers(updatedContainers);
    saveNutritionData(updatedMeals, updatedContainers);
    
    return meal;
  };

  // Таймеры для готовки
  const startTimer = (name, duration) => {
    const timer = {
      id: Date.now(),
      name,
      duration,
      startTime: Date.now(),
      endTime: Date.now() + duration * 60 * 1000
    };
    
    setActiveTimers([...activeTimers, timer]);
    return timer;
  };

  const removeTimer = (timerId) => {
    setActiveTimers(activeTimers.filter(t => t.id !== timerId));
  };

  const value = {
    // Существующие функции
    meals,
    dailyStats,
    addMeal: (meal) => {
      const newMeals = [...meals, { ...meal, id: Date.now(), timestamp: new Date() }];
      setMeals(newMeals);
      calculateDailyStats(newMeals);
      saveNutritionData(newMeals);
    },
    
    // Meal Prep функции
    mealPrepPlan,
    containers,
    cookingSession,
    activeTimers,
    recipes: MEAL_PREP_RECIPES,
    plans: MEAL_PREP_PLANS,
    
    startCookingSession,
    updateRecipeStatus,
    completeCookingSession,
    consumeContainer,
    startTimer,
    removeTimer,
    
    // Утилиты
    calculateInsulin: (carbs) => Math.round(carbs / 5),
    getTotalDailyNutrition: () => dailyStats
  };

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  );
};
