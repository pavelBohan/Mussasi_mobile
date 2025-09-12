import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
  mental: '#5AC8FA',
  nutrition: '#FF9500',
  movement: '#FF2D55',
  recovery: '#5856D6',
};

// Вспомогательный компонент для карточки статистики
const StatCard = ({ icon, title, color, children }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={[styles.cardIcon, { backgroundColor: `${color}20`, color }]}>{icon}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <View style={styles.cardContent}>
      {children}
    </View>
  </View>
);

// Вспомогательный компонент для отображения отдельного показателя
const StatItem = ({ label, value, unit = '' }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value} <Text style={styles.statUnit}>{unit}</Text></Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const StatsScreen = ({ blocks = [] }) => {
  // Безопасный поиск данных для каждого блока
  const mentalBlock = blocks.find(b => b.type === 'mental')?.data || {};
  const nutritionBlock = blocks.find(b => b.type === 'nutrition')?.data || {};
  const movementBlock = blocks.find(b => b.type === 'movement')?.data || {};
  const recoveryBlock = blocks.find(b => b.type === 'recovery')?.data || {};

  // Расчет статистики с проверками на наличие данных
  const mentalScore = mentalBlock.mood_score || 0;
  const completedTasks = (mentalBlock.tasks || []).filter(t => t.completed).length;
  const totalTasks = (mentalBlock.tasks || []).length;
  const taskCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalCalories = nutritionBlock.total_calories || 0;
  const targetCalories = nutritionBlock.target_calories || 2000;
  const calorieProgress = targetCalories > 0 ? Math.min(Math.round((totalCalories / targetCalories) * 100), 100) : 0;

  const activeMinutes = movementBlock.active_minutes || 0;
  const steps = movementBlock.steps || 0;
  const targetSteps = movementBlock.target_steps || 10000;
  const stepsProgress = targetSteps > 0 ? Math.min(Math.round((steps / targetSteps) * 100), 100) : 0;

  const sleepHours = recoveryBlock.sleep_hours || 0;
  const sleepQuality = recoveryBlock.sleep_quality || 0; // в %

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.header}>
        <Text style={styles.title}>📊 Ваш Прогресс</Text>
        <Text style={styles.subtitle}>Статистика по системе ЗОЖ 4.0</Text>
      </LinearGradient>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <StatCard icon="🧠" title="Ментальное здоровье" color={COLORS.mental}>
          <StatItem label="Оценка настроения" value={mentalScore} unit="/ 10" />
          <StatItem label="Выполнено задач" value={`${completedTasks} из ${totalTasks}`} />
          <StatItem label="Прогресс" value={taskCompletion} unit="%" />
        </StatCard>

        <StatCard icon="🍎" title="Питание" color={COLORS.nutrition}>
          <StatItem label="Потреблено калорий" value={totalCalories} unit="ккал" />
          <StatItem label="Цель" value={targetCalories} unit="ккал" />
          <StatItem label="Прогресс" value={calorieProgress} unit="%" />
        </StatCard>

        <StatCard icon="🏃" title="Движение" color={COLORS.movement}>
          <StatItem label="Активные минуты" value={activeMinutes} unit="мин" />
          <StatItem label="Шаги" value={steps.toLocaleString('ru-RU')} />
          <StatItem label="Прогресс по шагам" value={stepsProgress} unit="%" />
        </StatCard>

        <StatCard icon="🌙" title="Восстановление" color={COLORS.recovery}>
          <StatItem label="Сон" value={sleepHours.toFixed(1)} unit="часов" />
          <StatItem label="Качество сна" value={sleepQuality} unit="%" />
          <StatItem label="Эффективность" value={Math.round(sleepHours * (sleepQuality / 100) * 10)} unit="/ 10" />
        </StatCard>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 60, paddingBottom: 30, paddingHorizontal: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  title: { fontSize: 32, fontWeight: '800', textAlign: 'center', color: '#FFFFFF', letterSpacing: 1 },
  subtitle: { fontSize: 16, textAlign: 'center', color: 'rgba(255, 255, 255, 0.8)', marginTop: 5, fontWeight: '500' },
  content: { flex: 1, padding: 20, paddingBottom: 100 },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  cardIcon: { fontSize: 24, marginRight: 12, padding: 8, borderRadius: 12 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  cardContent: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  statUnit: { fontSize: 16, fontWeight: '600', color: COLORS.textSecondary },
  statLabel: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4, textAlign: 'center' },
});

export default StatsScreen;
