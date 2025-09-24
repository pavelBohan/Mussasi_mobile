
// components/nutrition/RecipeDetailScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Vibration,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

const RecipeDetailScreen = ({ route, navigation }) => {
  const { recipe } = route.params;
  const [activeTab, setActiveTab] = useState('instructions');
  const [servings, setServings] = useState(recipe.servings);
  const [currentStep, setCurrentStep] = useState(0);
  const [timers, setTimers] = useState({});

  // Инициализация таймеров
  useEffect(() => {
    const initialTimers = {};
    recipe.instructions.forEach((instruction, index) => {
      if (instruction.timer) {
        initialTimers[index] = {
          duration: instruction.timer * 60,
          remaining: instruction.timer * 60,
          isRunning: false,
          isCompleted: false,
        };
      }
    });
    setTimers(initialTimers);
  }, [recipe]);

  // Обновление таймеров
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const newTimers = { ...prevTimers };
        let hasChanges = false;

        Object.keys(newTimers).forEach(stepIndex => {
          const timer = newTimers[stepIndex];
          if (timer.isRunning && timer.remaining > 0) {
            timer.remaining -= 1;
            hasChanges = true;

            if (timer.remaining === 0) {
              timer.isRunning = false;
              timer.isCompleted = true;
              showCompletionAlert(stepIndex);
              Vibration.vibrate([0, 500, 200, 500]);
            }
          }
        });

        return hasChanges ? newTimers : prevTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const showCompletionAlert = (stepIndex) => {
    const step = recipe.instructions[stepIndex];
    Alert.alert(
      '⏰ Таймер завершен!',
      `Шаг ${parseInt(stepIndex) + 1}: ${step.text}`,
      [
        { text: 'Понятно', style: 'default' },
        {
          text: 'Следующий шаг',
          style: 'default',
          onPress: () => {
            if (currentStep < recipe.instructions.length - 1) {
              setCurrentStep(currentStep + 1);
            }
          },
        },
      ]
    );
  };

  const startTimer = (stepIndex) => {
    setTimers(prev => ({
      ...prev,
      [stepIndex]: { ...prev[stepIndex], isRunning: true }
    }));
  };

  const pauseTimer = (stepIndex) => {
    setTimers(prev => ({
      ...prev,
      [stepIndex]: { ...prev[stepIndex], isRunning: false }
    }));
  };

  const resetTimer = (stepIndex) => {
    const instruction = recipe.instructions[stepIndex];
    setTimers(prev => ({
      ...prev,
      [stepIndex]: {
        duration: instruction.timer * 60,
        remaining: instruction.timer * 60,
        isRunning: false,
        isCompleted: false,
      }
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const adjustQuantity = (originalQuantity, originalServings, newServings) => {
    const ratio = newServings / originalServings;
    const adjusted = originalQuantity * ratio;
    return adjusted % 1 === 0 ? adjusted.toString() : adjusted.toFixed(1);
  };

  const renderInstructions = () => (
    <View style={styles.tabContent}>
      {recipe.instructions.map((step, index) => {
        const timer = timers[index];
        const isCurrentStep = index === currentStep;
        
        return (
          <View key={index} style={[
            styles.instructionStep,
            isCurrentStep && styles.currentStep
          ]}>
            <View style={[
              styles.stepNumber,
              isCurrentStep && styles.currentStepNumber
            ]}>
              <Text style={[
                styles.stepNumberText,
                isCurrentStep && styles.currentStepNumberText
              ]}>
                {step.step || index + 1}
              </Text>
            </View>
            
            <View style={styles.stepContent}>
              <Text style={[
                styles.stepText,
                isCurrentStep && styles.currentStepText
              ]}>
                {step.text}
              </Text>
              
              {timer && (
                <View style={styles.timerContainer}>
                  <View style={styles.timerDisplay}>
                    <Ionicons 
                      name="timer-outline" 
                      size={20} 
                      color={timer.isCompleted ? COLORS.success : COLORS.primary} 
                    />
                    <Text style={[
                      styles.timerText,
                      timer.isCompleted && styles.timerCompleted
                    ]}>
                      {formatTime(timer.remaining)}
                    </Text>
                  </View>
                  
                  <View style={styles.timerControls}>
                    {!timer.isRunning && !timer.isCompleted && (
                      <TouchableOpacity
                        style={styles.timerButton}
                        onPress={() => startTimer(index)}
                      >
                        <Ionicons name="play" size={16} color={COLORS.surface} />
                      </TouchableOpacity>
                    )}
                    
                    {timer.isRunning && (
                      <TouchableOpacity
                        style={[styles.timerButton, styles.pauseButton]}
                        onPress={() => pauseTimer(index)}
                      >
                        <Ionicons name="pause" size={16} color={COLORS.surface} />
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity
                      style={[styles.timerButton, styles.resetButton]}
                      onPress={() => resetTimer(index)}
                    >
                      <Ionicons name="refresh" size={16} color={COLORS.surface} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        );
      })}
      
      <View style={styles.stepNavigation}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentStep === 0 && styles.navButtonDisabled
          ]}
          onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          <Ionicons name="chevron-back" size={20} color={COLORS.primary} />
          <Text style={styles.navButtonText}>Назад</Text>
        </TouchableOpacity>
        
        <Text style={styles.stepCounter}>
          {currentStep + 1} из {recipe.instructions.length}
        </Text>
        
        <TouchableOpacity
          style={[
            styles.navButton,
            currentStep === recipe.instructions.length - 1 && styles.navButtonDisabled
          ]}
          onPress={() => setCurrentStep(Math.min(recipe.instructions.length - 1, currentStep + 1))}
          disabled={currentStep === recipe.instructions.length - 1}
        >
          <Text style={styles.navButtonText}>Далее</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderIngredients = () => (
    <View style={styles.tabContent}>
      {recipe.ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientItem}>
          <Text style={styles.ingredientName}>{ingredient.name}</Text>
          <Text style={styles.ingredientQuantity}>
            {adjustQuantity(ingredient.quantity, recipe.servings, servings)} {ingredient.unit}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderEquipment = () => (
    <View style={styles.tabContent}>
      {recipe.equipment.map((item, index) => (
        <View key={index} style={styles.equipmentItem}>
          <Ionicons name="hardware-chip-outline" size={20} color={COLORS.primary} />
          <Text style={styles.equipmentText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{recipe.name}</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Ionicons name="image-outline" size={80} color={COLORS.textSecondary} />
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.recipeDescription}>{recipe.description}</Text>
          
          <View style={styles.recipeStats}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <Text style={styles.statText}>{recipe.times.total} мин</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="bar-chart-outline" size={20} color={COLORS.primary} />
              <Text style={styles.statText}>
                {recipe.difficulty === 'easy' ? 'Легко' : 
                 recipe.difficulty === 'medium' ? 'Средне' : 'Сложно'}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
              <Text style={styles.statText}>{recipe.cost} ₽</Text>
            </View>
          </View>

          <View style={styles.servingsContainer}>
            <Text style={styles.servingsLabel}>Порций:</Text>
            <View style={styles.servingsControls}>
              <TouchableOpacity
                style={styles.servingsButton}
                onPress={() => setServings(Math.max(1, servings - 1))}
              >
                <Ionicons name="remove" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.servingsValue}>{servings}</Text>
              <TouchableOpacity
                style={styles.servingsButton}
                onPress={() => setServings(servings + 1)}
              >
                <Ionicons name="add" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {Math.round(recipe.nutrition.calories * servings / recipe.servings)}
              </Text>
              <Text style={styles.nutritionLabel}>ккал</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {Math.round(recipe.nutrition.protein * servings / recipe.servings)}г
              </Text>
              <Text style={styles.nutritionLabel}>белки</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {Math.round(recipe.nutrition.carbs * servings / recipe.servings)}г
              </Text>
              <Text style={styles.nutritionLabel}>углеводы</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {Math.round(recipe.nutrition.fat * servings / recipe.servings)}г
              </Text>
              <Text style={styles.nutritionLabel}>жиры</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <View style={styles.tabsHeader}>
            {[
              { id: 'instructions', label: 'Приготовление', icon: 'list-outline' },
              { id: 'ingredients', label: 'Ингредиенты', icon: 'restaurant-outline' },
              { id: 'equipment', label: 'Оборудование', icon: 'hardware-chip-outline' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Ionicons
                  name={tab.icon}
                  size={20}
                  color={activeTab === tab.id ? COLORS.primary : COLORS.textSecondary}
                />
                <Text style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'instructions' && renderInstructions()}
          {activeTab === 'ingredients' && renderIngredients()}
          {activeTab === 'equipment' && renderEquipment()}
        </View>
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Ionicons name="basket-outline" size={20} color={COLORS.surface} />
          <Text style={styles.addToCartText}>В корзину</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.startCookingButton}
          onPress={() => setActiveTab('instructions')}
        >
          <Ionicons name="play-outline" size={20} color={COLORS.surface} />
          <Text style={styles.startCookingText}>Готовить</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  favoriteButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: 200,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoSection: {
    padding: 20,
    backgroundColor: COLORS.surface,
  },
  recipeDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  recipeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 4,
    fontWeight: '500',
  },
  servingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  servingsLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  servingsControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  servingsValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  nutritionLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  tabsContainer: {
    backgroundColor: COLORS.surface,
    marginTop: 8,
  },
  tabsHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
  },
  tabContent: {
    padding: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  ingredientName: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  ingredientQuantity: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
  },
  instructionStep: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 12,
    borderRadius: 8,
  },
  currentStep: {
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  currentStepNumber: {
    backgroundColor: COLORS.primary,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
  currentStepNumberText: {
    color: COLORS.surface,
  },
  stepContent: {
    flex: 1,
  },
  stepText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  currentStepText: {
    fontWeight: '500',
    color: COLORS.text,
  },
  timerContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timerDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 8,
  },
  timerCompleted: {
    color: COLORS.success,
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timerButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseButton: {
    backgroundColor: COLORS.warning,
  },
  resetButton: {
    backgroundColor: COLORS.textSecondary,
  },
  stepNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.background,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '500',
  },
  stepCounter: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  equipmentText: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.textSecondary,
    paddingVertical: 16,
    borderRadius: 12,
    marginRight: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
    marginLeft: 8,
  },
  startCookingButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 8,
  },
  startCookingText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
    marginLeft: 8,
  },
});

export default RecipeDetailScreen;