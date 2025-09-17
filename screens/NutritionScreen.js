import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { COLORS } from '../constants/colors';
import { useNutrition } from '../context/NutritionContext';

const NutritionScreen = () => {
  const {
    dailyStats,
    containers,
    cookingSession,
    activeTimers,
    startCookingSession,
    consumeContainer,
    completeCookingSession
  } = useNutrition();
  
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📊 Сегодня</Text>
      
      {/* Дневная статистика */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{dailyStats.calories}</Text>
          <Text style={styles.statLabel}>ккал</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{dailyStats.protein}г</Text>
          <Text style={styles.statLabel}>белки</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{dailyStats.carbs}г</Text>
          <Text style={styles.statLabel}>углеводы</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{dailyStats.insulin}</Text>
          <Text style={styles.statLabel}>ед инсулина</Text>
        </View>
      </View>

      {/* Прогресс к цели */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${Math.min((dailyStats.calories / 1760) * 100, 100)}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {dailyStats.calories}/1760 ккал ({Math.round((dailyStats.calories / 1760) * 100)}%)
        </Text>
      </View>

      {/* Готовые контейнеры */}
      <Text style={styles.sectionTitle}>🥡 Готовые контейнеры</Text>
      {containers.length === 0 ? (
        <Text style={styles.emptyText}>Нет готовых контейнеров</Text>
      ) : (
        containers.map(container => (
          <TouchableOpacity
            key={container.id}
            style={styles.containerItem}
            onPress={() => consumeContainer(container.id)}
          >
            <View style={styles.containerInfo}>
              <Text style={styles.containerName}>{container.name}</Text>
              <Text style={styles.containerDetails}>
                {container.nutrition.calories} ккал • {container.insulin} ед • {container.servings} порций
              </Text>
            </View>
            <Text style={styles.consumeButton}>Съесть</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );

  const renderMealPrep = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>👨‍🍳 Meal Prep</Text>
      
      {!cookingSession ? (
        <View style={styles.mealPrepStart}>
          <Text style={styles.mealPrepTitle}>Система "10 контейнеров"</Text>
          <Text style={styles.mealPrepDescription}>
            2 часа готовки → 2-3 дня готовой еды
          </Text>
          
          <View style={styles.planPreview}>
            <Text style={styles.planTitle}>Стандартный план:</Text>
            <Text style={styles.planItem}>• 2 творожных хлеба (20 кусков)</Text>
            <Text style={styles.planItem}>• Куриный суп (6 порций)</Text>
            <Text style={styles.planItem}>• Салат с тунцом (4 порции)</Text>
            <Text style={styles.planItem}>• 6 хачапури</Text>
            <Text style={styles.planItem}>• 4 мини-пиццы</Text>
          </View>
          
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => startCookingSession()}
          >
            <Text style={styles.startButtonText}>🚀 Начать готовку</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cookingSession}>
          <Text style={styles.sessionTitle}>Сессия готовки активна</Text>
          <Text style={styles.sessionTime}>
            Начато: {cookingSession.startTime.toLocaleTimeString()}
          </Text>
          
          {cookingSession.recipes.map(recipe => (
            <View key={recipe.id} style={styles.recipeItem}>
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <Text style={styles.recipeTime}>{recipe.prepTime} мин</Text>
              </View>
              <View style={styles.recipeStatus}>
                <Text style={[
                  styles.statusText,
                  recipe.status === 'completed' && styles.statusCompleted,
                  recipe.status === 'cooking' && styles.statusCooking
                ]}>
                  {recipe.status === 'pending' && '⏳ Ожидает'}
                  {recipe.status === 'cooking' && '🔥 Готовится'}
                  {recipe.status === 'completed' && '✅ Готово'}
                </Text>
              </View>
            </View>
          ))}
          
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => {
              Alert.alert(
                'Завершить готовку?',
                'Все готовые блюда будут добавлены в контейнеры',
                [
                  { text: 'Отмена', style: 'cancel' },
                  { text: 'Завершить', onPress: completeCookingSession }
                ]
              );
            }}
          >
            <Text style={styles.completeButtonText}>Завершить сессию</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderTimers = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>⏰ Таймеры</Text>
      
      {activeTimers.length === 0 ? (
        <Text style={styles.emptyText}>Нет активных таймеров</Text>
      ) : (
        activeTimers.map(timer => (
          <View key={timer.id} style={styles.timerItem}>
            <Text style={styles.timerName}>{timer.name}</Text>
            <Text style={styles.timerTime}>
              {Math.ceil((timer.endTime - Date.now()) / 1000 / 60)} мин
            </Text>
          </View>
        ))
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Табы */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'dashboard' && styles.activeTab]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text style={[styles.tabText, activeTab === 'dashboard' && styles.activeTabText]}>
            Сегодня
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'mealprep' && styles.activeTab]}
          onPress={() => setActiveTab('mealprep')}
        >
          <Text style={[styles.tabText, activeTab === 'mealprep' && styles.activeTabText]}>
            Meal Prep
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'timers' && styles.activeTab]}
          onPress={() => setActiveTab('timers')}
        >
          <Text style={[styles.tabText, activeTab === 'timers' && styles.activeTabText]}>
            Таймеры
          </Text>
        </TouchableOpacity>
      </View>

      {/* Контент */}
      <ScrollView style={styles.content}>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'mealprep' && renderMealPrep()}
        {activeTab === 'timers' && renderTimers()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  progressContainer: {
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  containerInfo: {
    flex: 1,
  },
  containerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  containerDetails: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  consumeButton: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
  mealPrepStart: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 12,
  },
  mealPrepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  mealPrepDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  planPreview: {
    marginBottom: 20,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 10,
  },
  planItem: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
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
  cookingSession: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 12,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  sessionTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  recipeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  recipeTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  recipeStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  statusCooking: {
    color: COLORS.warning,
  },
  statusCompleted: {
    color: COLORS.success,
  },
  completeButton: {
    backgroundColor: COLORS.success,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
  timerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  timerName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  timerTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.warning,
  },
});

export default NutritionScreen;
