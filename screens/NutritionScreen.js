import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
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

// Минимальная база продуктов (на 100г)
const FOOD_DATABASE = [
  { id: 1, name: 'Гречка вареная', calories: 132, protein: 4.5, fat: 2.3, carbs: 25.0 },
  { id: 2, name: 'Рис вареный', calories: 116, protein: 2.2, fat: 0.5, carbs: 22.9 },
  { id: 3, name: 'Куриная грудка', calories: 165, protein: 31.0, fat: 3.6, carbs: 0 },
  { id: 4, name: 'Яйцо куриное', calories: 157, protein: 12.7, fat: 11.5, carbs: 0.7 },
  { id: 5, name: 'Творог 5%', calories: 121, protein: 17.2, fat: 5.0, carbs: 1.8 },
  { id: 6, name: 'Молоко 2.5%', calories: 52, protein: 2.8, fat: 2.5, carbs: 4.7 },
  { id: 7, name: 'Хлеб черный', calories: 214, protein: 6.6, fat: 1.2, carbs: 40.7 },
  { id: 8, name: 'Банан', calories: 96, protein: 1.5, fat: 0.2, carbs: 21.0 },
  { id: 9, name: 'Яблоко', calories: 47, protein: 0.4, fat: 0.4, carbs: 9.8 },
  { id: 10, name: 'Овсянка на воде', calories: 88, protein: 3.0, fat: 1.7, carbs: 15.0 },
  { id: 11, name: 'Макароны вареные', calories: 112, protein: 3.5, fat: 0.4, carbs: 23.0 },
  { id: 12, name: 'Картофель вареный', calories: 82, protein: 2.0, fat: 0.4, carbs: 16.3 },
  { id: 13, name: 'Говядина', calories: 187, protein: 18.9, fat: 12.4, carbs: 0 },
  { id: 14, name: 'Рыба (судак)', calories: 84, protein: 18.4, fat: 1.1, carbs: 0 },
  { id: 15, name: 'Масло подсолнечное', calories: 899, protein: 0, fat: 99.9, carbs: 0 },
  { id: 16, name: 'Огурец', calories: 15, protein: 0.8, fat: 0.1, carbs: 2.5 },
  { id: 17, name: 'Помидор', calories: 20, protein: 0.6, fat: 0.2, carbs: 4.2 },
  { id: 18, name: 'Морковь', calories: 35, protein: 1.3, fat: 0.1, carbs: 6.9 },
  { id: 19, name: 'Капуста белокочанная', calories: 27, protein: 1.8, fat: 0.1, carbs: 4.7 },
  { id: 20, name: 'Кефир 2.5%', calories: 51, protein: 3.0, fat: 2.5, carbs: 4.0 },
];

const MEAL_TYPES = [
  { id: 'breakfast', name: 'Завтрак', icon: '🍳', time: '06:00' },
  { id: 'snack1', name: 'Перекус', icon: '🥨', time: '11:00' },
  { id: 'lunch', name: 'Обед', icon: '🍽️', time: '13:00' },
  { id: 'snack2', name: 'Перекус', icon: '🍎', time: '17:00' },
  { id: 'dinner', name: 'Ужин', icon: '🍲', time: '19:00' },
];

export default function NutritionScreen() {
  const [meals, setMeals] = useState([]);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodAmount, setFoodAmount] = useState('100');
  const [showFoodPicker, setShowFoodPicker] = useState(false);

  // Расчет дневной статистики
  const getDayStats = () => {
    const totals = meals.reduce((acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.fat += meal.fat;
      acc.carbs += meal.carbs;
      return acc;
    }, { calories: 0, protein: 0, fat: 0, carbs: 0 });

    // Расчет инсулина (1 ед на 5г углеводов)
    const insulinDose = Math.round(totals.carbs / 5);

    return { ...totals, insulinDose };
  };

  const addMeal = () => {
    if (!selectedMealType || !selectedFood || !foodAmount) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    const amount = parseFloat(foodAmount);
    const multiplier = amount / 100;

    const meal = {
      id: Date.now(),
      type: selectedMealType,
      food: selectedFood,
      amount: amount,
      calories: Math.round(selectedFood.calories * multiplier),
      protein: Math.round(selectedFood.protein * multiplier * 10) / 10,
      fat: Math.round(selectedFood.fat * multiplier * 10) / 10,
      carbs: Math.round(selectedFood.carbs * multiplier * 10) / 10,
      timestamp: new Date(),
    };

    setMeals([...meals, meal]);
    
    // Сброс формы
    setSelectedMealType(null);
    setSelectedFood(null);
    setFoodAmount('100');
    setShowAddMeal(false);
  };

  const deleteMeal = (mealId) => {
    setMeals(meals.filter(meal => meal.id !== mealId));
  };

  const dayStats = getDayStats();

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Питание</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddMeal(true)}
        >
          <Ionicons name="add" size={24} color={COLORS.surface} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Дневная статистика */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Сегодня</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{Math.round(dayStats.calories)}</Text>
              <Text style={styles.statLabel}>ккал</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dayStats.protein.toFixed(1)}</Text>
              <Text style={styles.statLabel}>белки</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dayStats.fat.toFixed(1)}</Text>
              <Text style={styles.statLabel}>жиры</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{dayStats.carbs.toFixed(1)}</Text>
              <Text style={styles.statLabel}>углеводы</Text>
            </View>
          </View>
          <View style={styles.insulinRow}>
            <Text style={styles.insulinText}>
              💉 Инсулин: {dayStats.insulinDose} ед
            </Text>
          </View>
        </View>

        {/* Список приемов пищи */}
        <View style={styles.mealsSection}>
          <Text style={styles.sectionTitle}>Приемы пищи</Text>
          {meals.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Добавьте первый прием пищи</Text>
            </View>
          ) : (
            meals.map((meal) => (
              <View key={meal.id} style={styles.mealCard}>
                <View style={styles.mealHeader}>
                  <Text style={styles.mealType}>
                    {MEAL_TYPES.find(t => t.id === meal.type)?.icon} {MEAL_TYPES.find(t => t.id === meal.type)?.name}
                  </Text>
                  <TouchableOpacity onPress={() => deleteMeal(meal.id)}>
                    <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.mealFood}>
                  {meal.food.name} - {meal.amount}г
                </Text>
                <View style={styles.mealStats}>
                  <Text style={styles.mealStat}>{meal.calories} ккал</Text>
                  <Text style={styles.mealStat}>Б: {meal.protein}</Text>
                  <Text style={styles.mealStat}>Ж: {meal.fat}</Text>
                  <Text style={styles.mealStat}>У: {meal.carbs}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Модальное окно добавления приема пищи */}
      <Modal
        visible={showAddMeal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddMeal(false)}>
              <Text style={styles.modalCancel}>Отмена</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Добавить прием пищи</Text>
            <TouchableOpacity onPress={addMeal}>
              <Text style={styles.modalSave}>Сохранить</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Выбор типа приема пищи */}
            <Text style={styles.fieldLabel}>Тип приема пищи</Text>
            <View style={styles.mealTypeGrid}>
              {MEAL_TYPES.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.mealTypeButton,
                    selectedMealType?.id === type.id && styles.mealTypeButtonSelected
                  ]}
                  onPress={() => setSelectedMealType(type)}
                >
                  <Text style={styles.mealTypeIcon}>{type.icon}</Text>
                  <Text style={styles.mealTypeName}>{type.name}</Text>
                  <Text style={styles.mealTypeTime}>{type.time}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Выбор продукта */}
            <Text style={styles.fieldLabel}>Продукт</Text>
            <TouchableOpacity
              style={styles.foodSelector}
              onPress={() => setShowFoodPicker(true)}
            >
              <Text style={[styles.foodSelectorText, !selectedFood && styles.placeholder]}>
                {selectedFood ? selectedFood.name : 'Выберите продукт'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>

            {/* Количество */}
            <Text style={styles.fieldLabel}>Количество (г)</Text>
            <TextInput
              style={styles.amountInput}
              value={foodAmount}
              onChangeText={setFoodAmount}
              keyboardType="numeric"
              placeholder="100"
            />

            {/* Предварительный расчет */}
            {selectedFood && foodAmount && (
              <View style={styles.previewCard}>
                <Text style={styles.previewTitle}>Пищевая ценность</Text>
                <View style={styles.previewStats}>
                  <Text style={styles.previewStat}>
                    Калории: {Math.round(selectedFood.calories * parseFloat(foodAmount) / 100)} ккал
                  </Text>
                  <Text style={styles.previewStat}>
                    Белки: {(selectedFood.protein * parseFloat(foodAmount) / 100).toFixed(1)} г
                  </Text>
                  <Text style={styles.previewStat}>
                    Жиры: {(selectedFood.fat * parseFloat(foodAmount) / 100).toFixed(1)} г
                  </Text>
                  <Text style={styles.previewStat}>
                    Углеводы: {(selectedFood.carbs * parseFloat(foodAmount) / 100).toFixed(1)} г
                  </Text>
                  <Text style={styles.previewInsulin}>
                    💉 Инсулин: {Math.round(selectedFood.carbs * parseFloat(foodAmount) / 100 / 5)} ед
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* Модальное окно выбора продукта */}
      <Modal
        visible={showFoodPicker}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowFoodPicker(false)}>
              <Text style={styles.modalCancel}>Отмена</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Выбор продукта</Text>
            <View style={{ width: 60 }} />
          </View>

          <FlatList
            data={FOOD_DATABASE}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.foodItem}
                onPress={() => {
                  setSelectedFood(item);
                  setShowFoodPicker(false);
                }}
              >
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodStats}>
                  {item.calories} ккал | Б: {item.protein} Ж: {item.fat} У: {item.carbs}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.surface,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  insulinRow: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  insulinText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.warning,
    textAlign: 'center',
  },
  mealsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 15,
  },
  emptyState: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  mealCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealType: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  mealFood: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  mealStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealStat: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalCancel: {
    fontSize: 16,
    color: COLORS.danger,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  modalSave: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 10,
    marginTop: 20,
  },
  mealTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mealTypeButton: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  mealTypeButtonSelected: {
    borderColor: COLORS.primary,
  },
  mealTypeIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  mealTypeName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  mealTypeTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  foodSelector: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodSelectorText: {
    fontSize: 16,
    color: COLORS.text,
  },
  placeholder: {
    color: COLORS.textSecondary,
  },
  amountInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: COLORS.text,
  },
  previewCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 10,
  },
  previewStats: {
    gap: 5,
  },
  previewStat: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  previewInsulin: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.warning,
    marginTop: 5,
  },
  foodItem: {
    backgroundColor: COLORS.surface,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
  },
  foodStats: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
