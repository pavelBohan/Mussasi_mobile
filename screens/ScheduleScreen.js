import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { COLORS } from '../constants/colors';

// Данные расписания
const SCHEDULE_DATA = {
  week3: {
    monday: [
      { time: '13:10-14:30', subject: 'Деловые коммуникации', teacher: 'Макарова Ю.Л.', room: '4 пара' },
      { time: '14:50-16:10', subject: 'Вычислительные системы', teacher: 'Ягодкин Д.А.', room: '5 пара' },
      { time: '16:40-18:00', subject: 'Вычислительные системы (пр)', teacher: 'Ягодкин Д.А.', room: '6 пара' }
    ],
    tuesday: [
      { time: '13:10-14:30', subject: 'Математический анализ', teacher: 'Крюкова О.А.', room: '4 пара' },
      { time: '14:50-16:10', subject: 'Математический анализ (пр)', teacher: 'Крюкова О.А.', room: '5 пара' }
    ],
    wednesday: [
      { time: '11:30-12:50', subject: 'Теория вероятностей', teacher: 'Шмаркова Л.И.', room: '3 пара' },
      { time: '13:10-14:30', subject: 'Технологии программирования', teacher: 'Савина А.Г.', room: '4 пара' },
      { time: '14:50-18:00', subject: 'Физкультура', teacher: 'Дрожжаков А.И.', room: '5-6 пары' }
    ],
    thursday: [
      { time: '13:10-16:10', subject: 'Теория вероятностей', teacher: 'Шмаркова Л.И.', room: '4-5 пары' }
    ],
    friday: [
      { time: '9:40-12:50', subject: 'Иностранный язык', teacher: 'Лепешкина Г.Г.', room: '2-3 пары' },
      { time: '13:10-14:30', subject: 'Технологии программирования (пр)', teacher: 'Бессонова М.П.', room: '4 пара' },
      { time: '14:50-16:10', subject: 'Деловые коммуникации (пр)', teacher: 'Макарова Ю.Л.', room: '5 пара' }
    ],
    saturday: [
      { time: '8:00-11:00', subject: 'Теория систем', teacher: 'Логинов И.В.', room: '1-2 пары' },
      { time: '11:30-14:30', subject: 'Методы проектирования ИС', teacher: 'Зимина Л.В.', room: '3-4 пары' }
    ]
  },
  week4: {
    monday: [
      { time: '13:10-14:30', subject: 'Теория вероятностей', teacher: 'Шмаркова Л.И.', room: '4 пара' },
      { time: '14:50-16:10', subject: 'Методы проектирования ИС', teacher: 'Зимина Л.В.', room: '5 пара' },
      { time: '16:40-18:00', subject: 'Теория вероятностей (пр)', teacher: 'Шмаркова Л.И.', room: '6 пара' }
    ],
    tuesday: [
      { time: '13:10-14:30', subject: 'Методы проектирования ИС (пр)', teacher: 'Зимина Л.В.', room: '4 пара' },
      { time: '14:50-18:00', subject: 'Математический анализ', teacher: 'Крюкова О.А.', room: '5-6 пары' },
      { time: '18:20-19:40', subject: 'Деловые коммуникации', teacher: 'Макарова Ю.Л.', room: '7 пара' }
    ],
    wednesday: [
      { time: '13:10-14:30', subject: 'Технологии программирования', teacher: 'Савина А.Г.', room: '4 пара' },
      { time: '14:50-18:00', subject: 'Физкультура', teacher: 'Дрожжаков А.И.', room: '5-6 пары' }
    ],
    thursday: [
      { time: '11:30-12:50', subject: 'Технологии программирования (пр)', teacher: 'Бессонова М.П.', room: '3 пара' },
      { time: '13:10-14:30', subject: 'Методы проектирования ИС', teacher: 'Зимина Л.В.', room: '4 пара' }
    ],
    friday: [
      { time: '9:40-12:50', subject: 'Иностранный язык', teacher: 'Лепешкина Г.Г.', room: '2-3 пары' },
      { time: '13:10-16:10', subject: 'Вычислительные системы', teacher: 'Ягодкин Д.А.', room: '4-5 пары' }
    ],
    saturday: [
      { time: '8:00-11:00', subject: 'Теория систем', teacher: 'Логинов И.В.', room: '1-2 пары' },
      { time: '11:30-12:50', subject: 'Вычислительные системы', teacher: 'Ягодкин Д.А.', room: '3 пара' }
    ]
  }
};

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const DAY_NAMES = {
  monday: 'Понедельник',
  tuesday: 'Вторник', 
  wednesday: 'Среда',
  thursday: 'Четверг',
  friday: 'Пятница',
  saturday: 'Суббота'
};

const ScheduleScreen = () => {
  const [currentWeek, setCurrentWeek] = useState('week3');
  const [selectedDay, setSelectedDay] = useState('monday');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Определяем текущий день недели
    const today = new Date();
    const dayIndex = today.getDay(); // 0 = воскресенье, 1 = понедельник, и т.д.
    
    if (dayIndex >= 1 && dayIndex <= 6) {
      const dayKey = DAYS[dayIndex - 1];
      setSelectedDay(dayKey);
    }
  }, []);

  const getDaySchedule = (week, day) => {
    try {
      const schedule = SCHEDULE_DATA[week]?.[day] || [];
      return schedule;
    } catch (err) {
      console.error('Error getting day schedule:', err);
      setError('Ошибка загрузки расписания');
      return [];
    }
  };

  const renderScheduleItem = (item, index) => (
    <View key={index} style={styles.scheduleItem}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{item.time}</Text>
        <Text style={styles.roomText}>{item.room}</Text>
      </View>
      <View style={styles.subjectContainer}>
        <Text style={styles.subjectText}>{item.subject}</Text>
        <Text style={styles.teacherText}>{item.teacher}</Text>
      </View>
    </View>
  );

  const renderDayButton = (day) => (
    <TouchableOpacity
      key={day}
      style={[
        styles.dayButton,
        selectedDay === day && styles.selectedDayButton
      ]}
      onPress={() => setSelectedDay(day)}
    >
      <Text style={[
        styles.dayButtonText,
        selectedDay === day && styles.selectedDayButtonText
      ]}>
        {DAY_NAMES[day]}
      </Text>
    </TouchableOpacity>
  );

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ {error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setError(null);
              setIsLoading(false);
            }}
          >
            <Text style={styles.retryButtonText}>Попробовать снова</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const todaySchedule = getDaySchedule(currentWeek, selectedDay);

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <View style={styles.header}>
        <Text style={styles.title}>📅 Расписание</Text>
        <Text style={styles.subtitle}>2 ИСОСП (б) • РАНХиГС</Text>
      </View>

      {/* Переключатель недель */}
      <View style={styles.weekSelector}>
        <TouchableOpacity
          style={[
            styles.weekButton,
            currentWeek === 'week3' && styles.selectedWeekButton
          ]}
          onPress={() => setCurrentWeek('week3')}
        >
          <Text style={[
            styles.weekButtonText,
            currentWeek === 'week3' && styles.selectedWeekButtonText
          ]}>
            Неделя 3
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.weekButton,
            currentWeek === 'week4' && styles.selectedWeekButton
          ]}
          onPress={() => setCurrentWeek('week4')}
        >
          <Text style={[
            styles.weekButtonText,
            currentWeek === 'week4' && styles.selectedWeekButtonText
          ]}>
            Неделя 4
          </Text>
        </TouchableOpacity>
      </View>

      {/* Дни недели */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.daysContainer}
        contentContainerStyle={styles.daysContent}
      >
        {DAYS.map(renderDayButton)}
      </ScrollView>

      {/* Расписание на день */}
      <ScrollView style={styles.scheduleContainer}>
        <Text style={styles.dayTitle}>
          {DAY_NAMES[selectedDay]} • {currentWeek === 'week3' ? 'Неделя 3' : 'Неделя 4'}
        </Text>
        
        {todaySchedule.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>🎉 Сегодня пар нет!</Text>
            <Text style={styles.emptySubtext}>Можно отдохнуть или заняться проектами</Text>
          </View>
        ) : (
          todaySchedule.map(renderScheduleItem)
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  weekSelector: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  weekButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedWeekButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  weekButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  selectedWeekButtonText: {
    color: COLORS.surface,
  },
  daysContainer: {
    maxHeight: 60,
  },
  daysContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedDayButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  selectedDayButtonText: {
    color: COLORS.surface,
  },
  scheduleContainer: {
    flex: 1,
    padding: 20,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  scheduleItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  timeContainer: {
    width: 100,
    marginRight: 16,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  roomText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  subjectContainer: {
    flex: 1,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  teacherText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.danger,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ScheduleScreen;
