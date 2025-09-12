import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useNutrition } from '../context/NutritionContext';

// Виджет текущего приема пищи
export function CurrentMealWidget({ onPress }) {
  const { getDayStats } = useNutrition();
  const stats = getDayStats();

  const nextMeal = {
    type: 'Завтрак',
    icon: '🍳',
    time: '06:00',
    prepTime: '15 мин',
  };

  return (
    <TouchableOpacity style={styles.widget} onPress={onPress}>
      <View style={styles.widgetHeader}>
        <Text style={styles.widgetTitle}>Следующий прием</Text>
        <Ionicons name="restaurant-outline" size={20} color={COLORS.primary} />
      </View>
      
      <View style={styles.mealInfo}>
        <Text style={styles.mealType}>{nextMeal.icon} {nextMeal.type}</Text>
        <Text style={styles.mealTime}>{nextMeal.time}</Text>
      </View>

      <View style={styles.mealDetails}>
        <Text style={styles.insulinText}>💉 {stats.insulinDose} ед сегодня</Text>
        <Text style={styles.prepTime}>⏱️ {nextMeal.prepTime}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Виджет прогресса питания
export function NutritionProgressWidget({ onPress }) {
  const { getDayStats } = useNutrition();
  const stats = getDayStats();

  const targets = { calories: 2000, protein: 120, carbs: 200 };
  
  const progress = {
    calories: { 
      current: Math.round(stats.calories), 
      target: targets.calories, 
      percentage: Math.min((stats.calories / targets.calories) * 100, 100) 
    },
    protein: { 
      current: Math.round(stats.protein), 
      target: targets.protein, 
      percentage: Math.min((stats.protein / targets.protein) * 100, 100) 
    },
    carbs: { 
      current: Math.round(stats.carbs), 
      target: targets.carbs, 
      percentage: Math.min((stats.carbs / targets.carbs) * 100, 100) 
    },
  };

  return (
    <TouchableOpacity style={styles.widget} onPress={onPress}>
      <View style={styles.widgetHeader}>
        <Text style={styles.widgetTitle}>Прогресс дня</Text>
        <Ionicons name="analytics-outline" size={20} color={COLORS.success} />
      </View>
      
      <View style={styles.progressList}>
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Калории</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress.calories.percentage}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {progress.calories.current}/{progress.calories.target}
          </Text>
        </View>

        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Белки</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress.protein.percentage}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {progress.protein.current}/{progress.protein.target}г
          </Text>
        </View>

        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Углеводы</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress.carbs.percentage}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {progress.carbs.current}/{progress.carbs.target}г
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Виджет покупок (пока статичный)
export function ShoppingWidget({ onPress }) {
  const shopping = {
    itemsCount: 12,
    estimatedCost: 850,
    nextTrip: 'Завтра',
  };

  return (
    <TouchableOpacity style={styles.widget} onPress={onPress}>
      <View style={styles.widgetHeader}>
        <Text style={styles.widgetTitle}>Покупки</Text>
        <Ionicons name="basket-outline" size={20} color={COLORS.warning} />
      </View>
      
      <View style={styles.shoppingInfo}>
        <Text style={styles.shoppingTrip}>{shopping.nextTrip}</Text>
        <Text style={styles.shoppingItems}>{shopping.itemsCount} товаров</Text>
      </View>

      <View style={styles.costRow}>
        <Text style={styles.costLabel}>Примерная стоимость:</Text>
        <Text style={styles.costValue}>{shopping.estimatedCost} ₽</Text>
      </View>
    </TouchableOpacity>
  );
}

// Стили остаются те же, но импортируем COLORS
const styles = StyleSheet.create({
  // ... все стили из предыдущей версии, но с импортом COLORS
});
