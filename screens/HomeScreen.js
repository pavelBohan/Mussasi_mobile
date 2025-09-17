import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

const HomeScreen = () => {
  const [dailyGoals, setDailyGoals] = useState([
    { id: 1, title: 'Измерить глюкозу утром', completed: false, type: 'health' },
    { id: 2, title: 'Зарядка BIOMACHINE', completed: false, type: 'fitness' },
    { id: 3, title: 'Завтрак + инсулин', completed: false, type: 'nutrition' },
    { id: 4, title: 'Посетить все пары', completed: false, type: 'education' },
    { id: 5, title: 'Домашние задания', completed: false, type: 'education' },
  ]);

  const toggleGoal = (goalId) => {
    setDailyGoals(prev => 
      prev.map(goal => 
        goal.id === goalId 
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  };

  const completedGoals = dailyGoals.filter(goal => goal.completed).length;
  const totalGoals = dailyGoals.length;
  const progressPercentage = (completedGoals / totalGoals) * 100;

  return (
    <ScrollView style={styles.container}>
      {/* Заголовок дня */}
      <View style={styles.header}>
        <Text style={styles.dateText}>Суббота, 13 сентября</Text>
        <Text style={styles.weekText}>Выходной день</Text>
      </View>

      {/* Прогресс дня */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Прогресс дня</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
        </View>
        <Text style={styles.progressText}>{completedGoals}/{totalGoals} целей выполнено</Text>
      </View>

      {/* Цели дня */}
      <View style={styles.goalsCard}>
        <Text style={styles.cardTitle}>Цели дня</Text>
        {dailyGoals.map(goal => (
          <TouchableOpacity 
            key={goal.id} 
            style={styles.goalItem}
            onPress={() => toggleGoal(goal.id)}
          >
            <View style={[
              styles.checkbox, 
              goal.completed && styles.checkboxCompleted
            ]}>
              {goal.completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={[
              styles.goalText,
              goal.completed && styles.goalTextCompleted
            ]}>
              {goal.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Следующие события */}
      <View style={styles.eventsCard}>
        <Text style={styles.cardTitle}>Сегодня</Text>
        <View style={styles.eventItem}>
          <Text style={styles.eventTime}>07:00</Text>
          <Text style={styles.eventTitle}>Подъем + глюкоза</Text>
        </View>
        <View style={styles.eventItem}>
          <Text style={styles.eventTime}>07:05</Text>
          <Text style={styles.eventTitle}>Зарядка BIOMACHINE (полная)</Text>
        </View>
        <View style={styles.eventItem}>
          <Text style={styles.eventTime}>08:00</Text>
          <Text style={styles.eventTitle}>Завтрак + инсулин</Text>
        </View>
      </View>

      {/* XP и достижения */}
      <View style={styles.xpCard}>
        <Text style={styles.cardTitle}>Опыт (XP)</Text>
        <Text style={styles.xpText}>+25 XP за сегодня</Text>
        <Text style={styles.xpTotal}>Всего: 1,247 XP</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  weekText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  progressCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
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
  },
  goalsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  checkmark: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalText: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  goalTextCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  eventsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  eventTime: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    width: 60,
  },
  eventTitle: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  xpCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  xpText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.success,
  },
  xpTotal: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});

export default HomeScreen;
