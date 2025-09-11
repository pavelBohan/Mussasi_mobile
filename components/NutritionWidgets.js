import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6', 
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#1D1D1F',
  textSecondary: '#8E8E93',
  border: '#E5E5EA',
};

// Виджет текущего приема пищи
export function CurrentMealWidget({ onPress }) {
  const nextMeal = {
    type: 'Завтрак',
    icon: '🍳',
    time: '06:00',
    calories: 450,
    protein: 25,
    fat: 15,
    carbs: 45,
    insulin: 9,
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

      <View style={styles.macroRow}>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{nextMeal.calories}</Text>
          <Text style={styles.macroLabel}>ккал</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{nextMeal.protein}</Text>
          <Text style={styles.macroLabel}>Б</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{nextMeal.fat}</Text>
          <Text style={styles.macroLabel}>Ж</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{nextMeal.carbs}</Text>
          <Text style={styles.macroLabel}>У</Text>
        </View>
      </View>

      <View style={styles.mealDetails}>
        <Text style={styles.insulinText}>💉 {nextMeal.insulin} ед</Text>
        <Text style={styles.prepTime}>⏱️ {nextMeal.prepTime}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Виджет покупок
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

// Виджет прогресса питания
export function NutritionProgressWidget({ onPress }) {
  const progress = {
    calories: { current: 1250, target: 2000, percentage: 62 },
    protein: { current: 85, target: 120, percentage: 71 },
    carbs: { current: 140, target: 200, percentage: 70 },
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

const styles = StyleSheet.create({
  widget: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  widgetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  mealInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealType: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  mealTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  macroLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  mealDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  insulinText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.warning,
  },
  prepTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  shoppingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  shoppingTrip: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  shoppingItems: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  costValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.warning,
  },
  progressList: {
    gap: 10,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    width: 60,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    width: 60,
    textAlign: 'right',
  },
});
