// components/SchedulePreview.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scheduleUtils } from '../utils/scheduleUtils';
import { COLORS } from '../constants/colors';

const SchedulePreview = ({ schedule, dayStatus, onPress }) => {
  if (!schedule || schedule.length === 0) {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.title}>📅 Сегодня</Text>
        <Text style={styles.freeDay}>Выходной день</Text>
        <Text style={styles.viewMore}>Нажмите для подробного расписания →</Text>
      </TouchableOpacity>
    );
  }

  const nextClass = scheduleUtils.getNextClass(schedule);
  const hasVolleyball = scheduleUtils.hasVolleyball(schedule);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>📅 Сегодня</Text>
      <Text style={styles.status}>
        {dayStatus.status} • до {dayStatus.endTime}
        {hasVolleyball && ' • 🏐 Волейбол'}
      </Text>
      
      {nextClass && (
        <View style={styles.nextClass}>
          <Text style={styles.nextTime}>{nextClass.time}</Text>
          <Text style={styles.nextSubject}>
            {scheduleUtils.getShortSubject(nextClass.subject)}
          </Text>
          <Text style={styles.nextRoom}>{nextClass.room}</Text>
        </View>
      )}
      
      <View style={styles.allClasses}>
        {schedule.map((item, index) => (
          <View 
            key={index} 
            style={[
              styles.classItem,
              scheduleUtils.isClassActive(item.time) && styles.activeClass
            ]}
          >
            <Text style={[
              styles.classTime,
              scheduleUtils.isClassActive(item.time) && styles.activeText
            ]}>
              {item.time}
            </Text>
            <Text style={[
              styles.className,
              scheduleUtils.isClassActive(item.time) && styles.activeText
            ]}>
              {scheduleUtils.getShortSubject(item.subject)}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.viewMore}>Нажмите для подробного расписания →</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  freeDay: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: '500',
  },
  nextClass: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  nextTime: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextSubject: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  nextRoom: {
    color: '#cce7ff',
    fontSize: 12,
    marginTop: 2,
  },
  allClasses: {
    gap: 4,
  },
  classItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  activeClass: {
    backgroundColor: '#28a745',
  },
  classTime: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  className: {
    fontSize: 12,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  viewMore: {
    fontSize: 12,
    color: '#007bff',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default SchedulePreview;