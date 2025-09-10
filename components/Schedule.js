// components/Schedule.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { scheduleData } from '../data/scheduleData';
import { scheduleUtils } from '../utils/scheduleUtils';

const { width } = Dimensions.get('window');

const Schedule = () => {
  const [selectedWeek, setSelectedWeek] = useState(scheduleData.getCurrentWeek());
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Обновление времени каждую минуту
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const days = [
    { key: 'monday', name: 'ПН', fullName: 'Понедельник' },
    { key: 'tuesday', name: 'ВТ', fullName: 'Вторник' },
    { key: 'wednesday', name: 'СР', fullName: 'Среда' },
    { key: 'thursday', name: 'ЧТ', fullName: 'Четверг' },
    { key: 'friday', name: 'ПТ', fullName: 'Пятница' },
    { key: 'saturday', name: 'СБ', fullName: 'Суббота' },
    { key: 'sunday', name: 'ВС', fullName: 'Воскресенье' }
  ];

  const getCurrentDay = () => {
    const dayIndex = new Date().getDay();
    const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return dayKeys[dayIndex];
  };

  const renderWeekSelector = () => (
    <View style={styles.weekSelector}>
      <TouchableOpacity
        style={[styles.weekButton, selectedWeek === 1 && styles.weekButtonActive]}
        onPress={() => setSelectedWeek(1)}
      >
        <Text style={[styles.weekButtonText, selectedWeek === 1 && styles.weekButtonTextActive]}>
          1-я неделя
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.weekButton, selectedWeek === 2 && styles.weekButtonActive]}
        onPress={() => setSelectedWeek(2)}
      >
        <Text style={[styles.weekButtonText, selectedWeek === 2 && styles.weekButtonTextActive]}>
          2-я неделя
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderDayTabs = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.dayTabs}
      contentContainerStyle={styles.dayTabsContent}
    >
      {days.map((day) => {
        const daySchedule = scheduleData.getDaySchedule(day.key, selectedWeek);
        const isToday = day.key === getCurrentDay() && selectedWeek === scheduleData.getCurrentWeek();
        const hasClasses = daySchedule.length > 0;
        const hasVolleyball = scheduleUtils.hasVolleyball(daySchedule);
        
        return (
          <TouchableOpacity
            key={day.key}
            style={[
              styles.dayTab,
              isToday && styles.dayTabToday,
              selectedDay === day.key && styles.dayTabSelected
            ]}
            onPress={() => setSelectedDay(selectedDay === day.key ? null : day.key)}
          >
            <Text style={[
              styles.dayTabText,
              isToday && styles.dayTabTextToday,
              selectedDay === day.key && styles.dayTabTextSelected
            ]}>
              {day.name}
            </Text>
            {hasClasses && (
              <View style={styles.dayIndicators}>
                <View style={[styles.classIndicator, isToday && styles.classIndicatorToday]} />
                {hasVolleyball && <Text style={styles.volleyballIndicator}>🏐</Text>}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const renderClassCard = (classItem, index, dayKey) => {
    const isActive = scheduleUtils.isClassActive(classItem.time) && 
                    dayKey === getCurrentDay() && 
                    selectedWeek === scheduleData.getCurrentWeek();
    const isVolleyball = classItem.period === 'volleyball';

    return (
      <View key={index} style={[
        styles.classCard,
        isActive && styles.classCardActive,
        isVolleyball && styles.volleyballCard
      ]}>
        <View style={styles.classHeader}>
          <Text style={[styles.classTime, isActive && styles.classTimeActive]}>
            {classItem.time}
          </Text>
          {isVolleyball ? (
            <Text style={styles.volleyballBadge}>🏐 ВОЛЕЙБОЛ</Text>
          ) : (
            <Text style={[styles.classPeriod, isActive && styles.classPeriodActive]}>
              {classItem.period}-я пара
            </Text>
          )}
        </View>
        
        <Text style={[styles.classSubject, isActive && styles.classSubjectActive]}>
          {classItem.subject}
        </Text>
        
        {classItem.teacher && (
          <Text style={[styles.classTeacher, isActive && styles.classTeacherActive]}>
            👨‍🏫 {classItem.teacher}
          </Text>
        )}
        
        <Text style={[styles.classRoom, isActive && styles.classRoomActive]}>
          📍 {classItem.room}
        </Text>
        
        {isActive && (
          <View style={styles.activeIndicator}>
            <Text style={styles.activeText}>СЕЙЧАС</Text>
          </View>
        )}
      </View>
    );
  };

  const renderDaySchedule = (dayKey) => {
    const day = days.find(d => d.key === dayKey);
    const daySchedule = scheduleData.getDaySchedule(dayKey, selectedWeek);
    const dayStatus = scheduleUtils.getDayStatus(daySchedule);
    const isToday = dayKey === getCurrentDay() && selectedWeek === scheduleData.getCurrentWeek();

    return (
      <View style={styles.daySchedule}>
        <View style={styles.dayHeader}>
          <Text style={styles.dayTitle}>
            {day.fullName}
            {isToday && <Text style={styles.todayBadge}> • СЕГОДНЯ</Text>}
          </Text>
          <Text style={styles.dayStatus}>
            {dayStatus.status}
            {dayStatus.endTime && ` • до ${dayStatus.endTime}`}
          </Text>
        </View>

        {daySchedule.length === 0 ? (
          <View style={styles.emptyDay}>
            <Text style={styles.emptyDayText}>🎉 Выходной день</Text>
            <Text style={styles.emptyDaySubtext}>Время для отдыха и личных проектов</Text>
          </View>
        ) : (
          <View style={styles.classList}>
            {daySchedule.map((classItem, index) => 
              renderClassCard(classItem, index, dayKey)
            )}
          </View>
        )}
      </View>
    );
  };

  const renderWeekOverview = () => (
    <View style={styles.weekOverview}>
      <Text style={styles.overviewTitle}>
        📅 {selectedWeek}-я неделя • Обзор
      </Text>
      
      <View style={styles.weekGrid}>
        {days.map((day) => {
          const daySchedule = scheduleData.getDaySchedule(day.key, selectedWeek);
          const dayStatus = scheduleUtils.getDayStatus(daySchedule);
          const isToday = day.key === getCurrentDay() && selectedWeek === scheduleData.getCurrentWeek();
          const hasVolleyball = scheduleUtils.hasVolleyball(daySchedule);

          return (
            <TouchableOpacity
              key={day.key}
              style={[styles.weekDayCard, isToday && styles.weekDayCardToday]}
              onPress={() => setSelectedDay(day.key)}
            >
              <Text style={[styles.weekDayName, isToday && styles.weekDayNameToday]}>
                {day.name}
              </Text>
              <Text style={styles.weekDayStatus}>
                {dayStatus.classCount === 0 ? '🎉' : `${dayStatus.classCount} ${dayStatus.classCount === 1 ? 'пара' : 'пары'}`}
              </Text>
              {hasVolleyball && <Text style={styles.weekVolleyball}>🏐</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderWeekSelector()}
      {renderDayTabs()}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedDay ? renderDaySchedule(selectedDay) : renderWeekOverview()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  weekSelector: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 4,
  },
  weekButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  weekButtonActive: {
    backgroundColor: '#007bff',
  },
  weekButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  weekButtonTextActive: {
    color: 'white',
  },
  dayTabs: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  dayTabsContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  dayTab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 50,
  },
  dayTabToday: {
    backgroundColor: '#e3f2fd',
  },
  dayTabSelected: {
    backgroundColor: '#007bff',
  },
  dayTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  dayTabTextToday: {
    color: '#1976d2',
  },
  dayTabTextSelected: {
    color: 'white',
  },
  dayIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  classIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#28a745',
    marginRight: 4,
  },
  classIndicatorToday: {
    backgroundColor: '#1976d2',
  },
  volleyballIndicator: {
    fontSize: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  weekOverview: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  weekGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  weekDayCard: {
    width: (width - 64) / 3 - 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  weekDayCardToday: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#1976d2',
  },
  weekDayName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  weekDayNameToday: {
    color: '#1976d2',
  },
  weekDayStatus: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  weekVolleyball: {
    fontSize: 10,
    marginTop: 2,
  },
  daySchedule: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  dayHeader: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  todayBadge: {
    color: '#1976d2',
    fontSize: 16,
  },
  dayStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyDay: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyDayText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#28a745',
  },
  emptyDaySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  classList: {
    gap: 12,
  },
  classCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#dee2e6',
  },
  classCardActive: {
    backgroundColor: '#d4edda',
    borderLeftColor: '#28a745',
  },
  volleyballCard: {
    backgroundColor: '#fff3cd',
    borderLeftColor: '#ffc107',
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  classTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
  },
  classTimeActive: {
    color: '#155724',
  },
  classPeriod: {
    fontSize: 12,
    color: '#6c757d',
    backgroundColor: '#e9ecef',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  classPeriodActive: {
    backgroundColor: '#c3e6cb',
    color: '#155724',
  },
  volleyballBadge: {
    fontSize: 12,
    color: '#856404',
    backgroundColor: '#ffeaa7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: 'bold',
  },
  classSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  classSubjectActive: {
    color: '#155724',
  },
  classTeacher: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  classTeacherActive: {
    color: '#155724',
  },
  classRoom: {
    fontSize: 14,
    color: '#6c757d',
  },
  classRoomActive: {
    color: '#155724',
  },
  activeIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#28a745',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Schedule;
