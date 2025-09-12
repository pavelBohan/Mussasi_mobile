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

