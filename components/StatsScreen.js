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
};

const StatsScreen = ({ blocks }) => {
  // Анализ данных глюкозы
  const glucoseBlock = blocks.find(block => block.type === 'tracker');
  const measurements = glucoseBlock?.data.measurements || [];
  const filledMeasurements = measurements.filter(m => m.value !== null);
  
  // Анализ целей
  const goalsBlock = blocks.find(block => block.type === 'checklist');
  const goals = goalsBlock?.data.items || [];
  const completedGoals = goals.filter(g => g.completed);
  const totalXP = completedGoals.reduce((sum, goal) => sum + goal.xp, 0);
  
  // Статистика глюкозы
  const avgGlucose = filledMeasurements.length > 0 
    ? (filledMeasurements.reduce((sum, m) => sum + m.value, 0) / filledMeasurements.length).toFixed(1)
    : 0;
  
  const inRangeCount = filledMeasurements.filter(m => 
    m.value >= glucoseBlock?.data.target_range[0] && 
    m.value <= glucoseBlock?.data.target_range[1]
  ).length;
  
  const inRangePercent = filledMeasurements.length > 0 
    ? Math.round((inRangeCount / filledMeasurements.length) * 100)
    : 0;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.header}
      >
        <Text style={styles.title}>📊 Статистика</Text>
        <Text style={styles.subtitle}>Анализ вашего прогресса</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Карточка глюкозы */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🩸 Контроль глюкозы</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{avgGlucose}</Text>
              <Text style={styles.statLabel}>Средняя</Text>
              <Text style={styles.statUnit}>ммоль/л</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: COLORS.success }]}>
                {inRangePercent}%
              </Text>
              <Text style={styles.statLabel}>В норме</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{filledMeasurements.length}</Text>
              <Text style={styles.statLabel}>Измерений</Text>
              <Text style={styles.statUnit}>из {measurements.length}</Text>
            </View>
          </View>
        </View>

        {/* Карточка целей */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Выполнение целей</Text>
          <View style={styles.goalsProgress}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercent}>
                {Math.round((completedGoals.length / goals.length) * 100)}%
              </Text>
              <Text style={styles.progressLabel}>выполнено</Text>
            </View>
            <View style={styles.goalsStats}>
              <Text style={styles.goalsStat}>
                ✅ Выполнено: {completedGoals.length}/{goals.length}
              </Text>
              <Text style={styles.goalsStat}>
                🏆 Заработано XP: {totalXP}
              </Text>
            </View>
          </View>
        </View>

        {/* Детальная статистика */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📈 Детальная статистика</Text>
          {filledMeasurements.map((measurement, index) => (
            <View key={index} style={styles.measurementItem}>
              <Text style={styles.measurementTime}>{measurement.time}</Text>
              <Text style={styles.measurementNote}>{measurement.note}</Text>
              <Text style={[
                styles.measurementValue,
                { color: getGlucoseColor(measurement.value, glucoseBlock?.data.target_range) }
              ]}>
                {measurement.value} ммоль/л
              </Text>
            </View>
          ))}
        </View>

        {/* Рекомендации */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💡 Рекомендации</Text>
          {inRangePercent < 70 && (
            <Text style={styles.recommendation}>
              🔴 Обратите внимание на контроль глюкозы. Менее 70% измерений в целевом диапазоне.
            </Text>
          )}
          {completedGoals.length < goals.length / 2 && (
            <Text style={styles.recommendation}>
              🎯 Попробуйте выполнить больше целей для лучшего результата.
            </Text>
          )}
          {filledMeasurements.length < measurements.length && (
            <Text style={styles.recommendation}>
              📊 Не забывайте регулярно измерять глюкозу для точной статистики.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const getGlucoseColor = (value, targetRange) => {
  if (!value || !targetRange) return COLORS.textSecondary;
  if (value < targetRange[0]) return COLORS.danger;
  if (value > targetRange[1]) return COLORS.warning;
  return COLORS.success;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
    fontWeight: '500',
  },
  
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  statItem: {
    alignItems: 'center',
  },
  
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
  },
  
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  
  statUnit: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  
  goalsProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  
  progressPercent: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.success,
  },
  
  progressLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  
  goalsStats: {
    flex: 1,
  },
  
  goalsStat: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
  },
  
  measurementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  
  measurementTime: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    width: 60,
  },
  
  measurementNote: {
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 1,
    marginLeft: 12,
  },
  
  measurementValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  
  recommendation: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default StatsScreen;