import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { COLORS } from '../../constants/colors';

const MealsTab = () => {
  // Данные приемов пищи на день
  const DAILY_MEALS = {
    breakfast: {
      time: '06:00',
      name: 'Завтрак',
      emoji: '🌅',
      dishes: [
        { name: 'Кофе', amount: '1 чашка', calories: 5, protein: 0, carbs: 1, fat: 0 },
        { name: 'Хачапури', amount: '1 шт', calories: 180, protein: 12, carbs: 15, fat: 8 },
        { name: 'Протеиновый пудинг', amount: '150 г', calories: 295, protein: 25, carbs: 14, fat: 12 }
      ],
      totalCalories: 480,
      totalProtein: 37,
      totalCarbs: 30,
      totalFat: 20,
      insulin: 6
    },
    lunch: {
      time: '10:00',
      name: 'Обед',
      emoji: '🍽️',
      dishes: [
        { name: 'Куриный суп', amount: '1 порция', calories: 200, protein: 20, carbs: 12, fat: 6 },
        { name: 'Комплексный гарнир', amount: '1 порция', calories: 600, protein: 35, carbs: 45, fat: 18 }
      ],
      totalCalories: 800,
      totalProtein: 55,
      totalCarbs: 57,
      totalFat: 24,
      insulin: 11
    },
    snack1: {
      time: '14:30',
      name: 'Перекус',
      emoji: '🍌',
      dishes: [
        { name: 'Банан', amount: '1 шт', calories: 90, protein: 1, carbs: 23, fat: 0 },
        { name: 'Протеиновый батончик', amount: '1 шт', calories: 70, protein: 8, carbs: 5, fat: 2 }
      ],
      totalCalories: 160,
      totalProtein: 9,
      totalCarbs: 28,
      totalFat: 2,
      insulin: 4
    },
    dinner: {
      time: '16:10',
      name: 'Ужин',
      emoji: '🥗',
      dishes: [
        { name: 'Большой салат с тунцом', amount: '1 порция', calories: 240, protein: 20, carbs: 8, fat: 12 }
      ],
      totalCalories: 240,
      totalProtein: 20,
      totalCarbs: 8,
      totalFat: 12,
      insulin: 2
    },
    snack2: {
      time: '18:30',
      name: 'Перекус',
      emoji: '🍕',
      dishes: [
        { name: 'Мини-пицца', amount: '1 шт', calories: 80, protein: 6, carbs: 8, fat: 3 }
      ],
      totalCalories: 80,
      totalProtein: 6,
      totalCarbs: 8,
      totalFat: 3,
      insulin: 2
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Дневная статистика */}
      <View style={styles.dailyStatsCard}>
        <Text style={styles.cardTitle}>📊 Сегодня</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1760</Text>
            <Text style={styles.statLabel}>ккал</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>127г</Text>
            <Text style={styles.statLabel}>белки</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>131г</Text>
            <Text style={styles.statLabel}>углеводы</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>61г</Text>
            <Text style={styles.statLabel}>жиры</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>25</Text>
            <Text style={styles.statLabel}>инсулин</Text>
          </View>
        </View>
      </View>

      {/* Приемы пищи */}
      {Object.entries(DAILY_MEALS).map(([key, meal]) => (
        <View key={key} style={styles.mealCard}>
          <View style={styles.mealHeader}>
            <View style={styles.mealTitleRow}>
              <Text style={styles.mealEmoji}>{meal.emoji}</Text>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealTime}>{meal.time}</Text>
            </View>
            <View style={styles.mealSummary}>
              <Text style={styles.mealCalories}>{meal.totalCalories} ккал</Text>
              <Text style={styles.mealInsulin}>{meal.insulin} ед</Text>
            </View>
          </View>
          
          {/* Блюда */}
          {meal.dishes.map((dish, index) => (
            <View key={index} style={styles.dishItem}>
              <View style={styles.dishInfo}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishAmount}>{dish.amount}</Text>
              </View>
              <Text style={styles.dishCalories}>{dish.calories} ккал</Text>
            </View>
          ))}
          
          {/* Итого по приему пищи */}
          <View style={styles.mealTotals}>
            <Text style={styles.totalsText}>
              {meal.totalCalories} ккал • {meal.totalProtein}б • {meal.totalCarbs}у • {meal.totalFat}ж
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dailyStatsCard: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  mealCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mealEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: 8,
  },
  mealTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  mealSummary: {
    alignItems: 'flex-end',
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  mealInsulin: {
    fontSize: 14,
    color: COLORS.warning,
    marginTop: 2,
  },
  dishItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    color: COLORS.text,
  },
  dishAmount: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  dishCalories: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  mealTotals: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalsText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
  },
});

export default MealsTab;