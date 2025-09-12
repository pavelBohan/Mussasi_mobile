import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { useNutrition } from '../context/NutritionContext';
import { COLORS } from '../constants/colors';

const FOOD_DATABASE = [
  { name: 'Овсянка', calories: 68, protein: 2.4, fat: 1.4, carbs: 12, per: '100г' },
  { name: 'Куриная грудка', calories: 165, protein: 31, fat: 3.6, carbs: 0, per: '100г' },
  { name: 'Рис', calories: 130, protein: 2.7, fat: 0.3, carbs: 28, per: '100г' },
  { name: 'Банан', calories: 89, protein: 1.1, fat: 0.3, carbs: 23, per: '1 шт' },
  { name: 'Яйцо', calories: 155, protein: 13, fat: 11, carbs: 1.1, per: '1 шт' },
  { name: 'Хлеб', calories: 265, protein: 9, fat: 3.2, carbs: 49, per: '100г' },
  { name: 'Молоко', calories: 42, protein: 3.4, fat: 1, carbs: 4.8, per: '100мл' },
  { name: 'Яблоко', calories: 52, protein: 0.3, fat: 0.2, carbs: 14, per: '1 шт' },
];

export default function NutritionScreen() {
  const { meals, addMeal, deleteMeal, getDayStats } = useNutrition();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const [mealType, setMealType] = useState('breakfast');

  const dayStats = getDayStats();

  const handleAddMeal = () => {
    if (!selectedFood || !quantity) {
      Alert.alert('Ошибка', 'Выберите продукт и укажите количество');
      return;
    }

    const multiplier = parseFloat(quantity);
    const meal = {
      id: Date.now().toString(),
      name: selectedFood.name,
      quantity: multiplier,
      unit: selectedFood.per,
      calories: selectedFood.calories * multiplier,
      protein: selectedFood.protein * multiplier,
      fat: selectedFood.fat * multiplier,
      carbs: selectedFood.carbs * multiplier,
      type: mealType,
      timestamp: new Date().toISOString(),
    };

    addMeal(meal);
    setModalVisible(false);
    setSelectedFood(null);
    setQuantity('1');
  };

  const renderMealTypeButton = (type, label) => (
    <TouchableOpacity
      style={[
        styles.mealTypeButton,
        mealType === type && styles.mealTypeButtonActive
      ]}
      onPress={() => setMealType(type)}
    >
      <Text style={[
        styles.mealTypeText,
        mealType === type && styles.mealTypeTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderFoodItem = (food) => (
    <TouchableOpacity
      key={food.name}
      style={[
        styles.foodItem,
        selectedFood?.name === food.name && styles.foodItemSelected
      ]}
      onPress={() => setSelectedFood(food)}
    >
      <Text style={styles.foodName}>{food.name}</Text>
      <Text style={styles.foodDetails}>
        {food.calories} ккал | Б: {food.protein}г | Ж: {food.fat}г | У: {food.carbs}г
      </Text>
      <Text style={styles.foodPortion}>на {food.per}</Text>
    </TouchableOpacity>
  );

  const renderMeal = (meal) => (
    <View key={meal.id} style={styles.mealItem}>
      <View style={styles.mealHeader}>
        <Text style={styles.mealName}>{meal.name}</Text>
        <TouchableOpacity
          onPress={() => deleteMeal(meal.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>×</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.mealDetails}>
        {meal.quantity} {meal.unit} | {Math.round(meal.calories)} ккал
      </Text>
      <Text style={styles.mealMacros}>
        Б: {meal.protein.toFixed(1)}г | Ж: {meal.fat.toFixed(1)}г | У: {meal.carbs.toFixed(1)}г
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Статистика дня */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Статистика дня</Text>
          <View style={styles.statsGrid}>
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
          <View style={styles.insulinContainer}>
            <Text style={styles.insulinText}>
              Инсулин: {Math.round(dayStats.carbs / 5)} ед
            </Text>
          </View>
        </View>

        {/* Список приемов пищи */}
        <View style={styles.mealsContainer}>
          <Text style={styles.sectionTitle}>Приемы пищи</Text>
          {meals.length === 0 ? (
            <Text style={styles.emptyText}>Нет записей о питании</Text>
          ) : (
            meals.map(renderMeal)
          )}
        </View>
      </ScrollView>

      {/* Кнопка добавления */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Добавить прием пищи</Text>
      </TouchableOpacity>

      {/* Модальное окно добавления */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButton}>Отмена</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Добавить прием пищи</Text>
            <TouchableOpacity onPress={handleAddMeal}>
              <Text style={styles.saveButton}>Сохранить</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Тип приема пищи */}
            <Text style={styles.sectionTitle}>Тип приема пищи</Text>
            <View style={styles.mealTypeContainer}>
              {renderMealTypeButton('breakfast', 'Завтрак')}
              {renderMealTypeButton('lunch', 'Обед')}
              {renderMealTypeButton('dinner', 'Ужин')}
              {renderMealTypeButton('snack', 'Перекус')}
            </View>

            {/* Выбор продукта */}
            <Text style={styles.sectionTitle}>Выберите продукт</Text>
            {FOOD_DATABASE.map(renderFoodItem)}

            {/* Количество */}
            {selectedFood && (
              <View style={styles.quantityContainer}>
                <Text style={styles.sectionTitle}>Количество</Text>
                <TextInput
                  style={styles.quantityInput}
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                  placeholder="1"
                />
                <Text style={styles.quantityUnit}>{selectedFood.per}</Text>
              </View>
            )}
          </ScrollView>
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
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  insulinContainer: {
    backgroundColor: COLORS.warning + '20',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  insulinText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.warning,
  },
  mealsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginTop: 20,
  },
  mealItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealDetails: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  mealMacros: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  cancelButton: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  saveButton: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  mealTypeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    marginRight: 8,
    alignItems: 'center',
  },
  mealTypeButtonActive: {
    backgroundColor: COLORS.primary,
  },
  mealTypeText: {
    color: COLORS.text,
    fontSize: 14,
  },
  mealTypeTextActive: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  foodItem: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  foodItemSelected: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  foodDetails: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  foodPortion: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  quantityContainer: {
    marginTop: 24,
  },
  quantityInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  quantityUnit: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
