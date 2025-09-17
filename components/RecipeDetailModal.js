import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { COLORS } from '../constants/colors';
import { useNutrition } from '../context/NutritionContext';

const RecipeDetailModal = ({ visible, recipe, onClose }) => {
  const { startTimer, updateRecipeStatus } = useNutrition();
  const [currentStep, setCurrentStep] = useState(0);

  if (!recipe) return null;

  const steps = [
    'Подготовка ингредиентов',
    'Основная готовка',
    'Финальная обработка',
    'Упаковка в контейнеры'
  ];

  const handleStartCooking = () => {
    updateRecipeStatus(recipe.id, 'cooking');
    startTimer(`${recipe.name} - готовка`, recipe.prepTime);
    Alert.alert('Готовка начата!', `Таймер на ${recipe.prepTime} минут запущен`);
  };

  const handleCompleteStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      updateRecipeStatus(recipe.id, 'completed');
      Alert.alert('Рецепт готов!', 'Блюдо можно упаковывать в контейнеры');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{recipe.name}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          {/* Информация о рецепте */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Время готовки:</Text>
              <Text style={styles.infoValue}>{recipe.prepTime} мин</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Порций:</Text>
              <Text style={styles.infoValue}>{recipe.servings}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Калории на порцию:</Text>
              <Text style={styles.infoValue}>{recipe.nutrition.calories} ккал</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Инсулин на порцию:</Text>
              <Text style={styles.infoValue}>{recipe.insulin} ед</Text>
            </View>
          </View>

          {/* Ингредиенты */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🛒 Ингредиенты</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <Text style={styles.ingredientAmount}>
                  {ingredient.amount} {ingredient.unit}
                </Text>
              </View>
            ))}
          </View>

          {/* Шаги готовки */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👨‍🍳 Процесс готовки</Text>
            {steps.map((step, index) => (
              <View
                key={index}
                style={[
                  styles.stepItem,
                  index === currentStep && styles.activeStep,
                  index < currentStep && styles.completedStep
                ]}
              >
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>
                    {index < currentStep ? '✓' : index + 1}
                  </Text>
                </View>
                <Text style={[
                  styles.stepText,
                  index === currentStep && styles.activeStepText,
                  index < currentStep && styles.completedStepText
                ]}>
                  {step}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Кнопки действий */}
        <View style={styles.actions}>
          {recipe.status === 'pending' && (
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartCooking}
            >
              <Text style={styles.startButtonText}>🚀 Начать готовку</Text>
            </TouchableOpacity>
          )}
          
          {recipe.status === 'cooking' && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleCompleteStep}
            >
              <Text style={styles.nextButtonText}>
                {currentStep < steps.length - 1 ? 'Следующий шаг' : 'Завершить рецепт'}
              </Text>
            </TouchableOpacity>
          )}
          
          {recipe.status === 'completed' && (
            <View style={styles.completedContainer}>
              <Text style={styles.completedText}>✅ Рецепт готов!</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  closeButton: {
    fontSize: 24,
    color: COLORS.textSecondary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoSection: {
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  ingredientName: {
    fontSize: 16,
    color: COLORS.text,
  },
  ingredientAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
  },
  activeStep: {
    backgroundColor: COLORS.primary + '20',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  completedStep: {
    backgroundColor: COLORS.success + '20',
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  stepText: {
    fontSize: 16,
    color: COLORS.text,
  },
  activeStepText: {
    fontWeight: '600',
    color: COLORS.primary,
  },
  completedStepText: {
    color: COLORS.success,
  },
  actions: {
    padding: 20,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
  nextButton: {
    backgroundColor: COLORS.success,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
  completedContainer: {
    padding: 15,
    alignItems: 'center',
  },
  completedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.success,
  },
});

export default RecipeDetailModal;