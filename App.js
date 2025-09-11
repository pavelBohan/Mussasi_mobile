import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, TextInput, Modal, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';


import { scheduleData } from './data/scheduleData';
import { scheduleUtils } from './utils/scheduleUtils';
import Schedule from './components/Schedule';
import SchedulePreview from './components/SchedulePreview';
import SettingsScreen from './components/SettingsScreen';
import StatsScreen from './components/StatsScreen';
import BottomNavigation from './components/BottomNavigation';
import LoadingScreen from './components/LoadingScreen';


// Конфигурация Telegram бота
const TELEGRAM_CONFIG = {
  BOT_TOKEN: '8159580133:AAEIxoCRVJ1zmCW62I8Yx5ty8rAiFSojY2g',
  CHAT_ID: '-1002509605358',
};

// Цветовая схема
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
  border: '#E5E5EA',
};

// Функция определения цвета глюкозы
const getGlucoseColor = (value, targetRange) => {
  if (!value) return COLORS.textSecondary;
  if (value < targetRange[0]) return COLORS.danger;
  if (value > targetRange[1]) return COLORS.warning;
  return COLORS.success;
};

// Компонент градиентной кнопки
const GradientButton = ({ colors, onPress, children, style, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, style]}>
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientButton}
    >
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

// Тестовые данные
const testData = {
  "metadata": {
    "version": "2.0",
    "type": "zoj_4.0_daily_plan",
    "user": "student_zoj_1",
    "date": "2025-09-11",
  },
  "blocks": [
    {
      "id": "mental_20250911",
      "type": "mental",
      "title": "Ментальное здоровье",
      "icon": "🧠",
      "data": {
        "mood_score": 8,
        "tasks": [
          {"id": "meditation", "text": "Утренняя медитация", "completed": true},
          {"id": "journal", "text": "Ведение дневника", "completed": false},
          {"id": "no_social", "text": "Час без соцсетей", "completed": true}
        ]
      }
    },
    {
      "id": "nutrition_20250911",
      "type": "nutrition", 
      "title": "Питание",
      "icon": "🍎",
      "data": {
        "total_calories": 1850,
        "target_calories": 2200,
        "protein_g": 120,
        "carbs_g": 200,
        "fats_g": 60
      }
    },
    {
      "id": "movement_20250911",
      "type": "movement",
      "title": "Движение", 
      "icon": "🏃",
      "data": {
        "active_minutes": 75,
        "steps": 12540,
        "target_steps": 10000,
        "workout_type": "Волейбол"
      }
    },
    {
      "id": "recovery_20250911",
      "type": "recovery",
      "title": "Восстановление",
      "icon": "🌙", 
      "data": {
        "sleep_hours": 7.5,
        "sleep_quality": 85,
        "stress_level": 3
      }
    }
  ]
};


export default function App() {
  const [blocks, setBlocks] = useState(testData.blocks);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [dayStatus, setDayStatus] = useState({});
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);




  useEffect(() => {
    const todaySchedule = scheduleData.getTodaySchedule();
    setCurrentSchedule(todaySchedule);
    setDayStatus(scheduleUtils.getDayStatus(todaySchedule));
  }, []);

  const handleLoadingComplete = () => {
  setIsLoading(false);
  };


  // Вспомогательные функции
  const getDayName = (dayOfWeek) => {
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    return days[dayOfWeek];
  };

  const getGoalsForDay = (dayOfWeek, hasVolleyball, hasPE) => {
    const baseGoals = [
      {id: "glucose_stable", text: "Стабильная глюкоза", completed: false, xp: 25},
      {id: "insulin_schedule", text: "Инсулин по расписанию", completed: false, xp: 20}
    ];

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return [
        ...baseGoals,
        {id: "biomachine_full", text: "Зарядка BIOMACHINE (полная)", completed: false, xp: 50},
        {id: "week_plan", text: "Планирование недели", completed: false, xp: 30},
        {id: "rest_time", text: "Время для отдыха", completed: false, xp: 20}
      ];
    } else {
      const weekdayGoals = [
        ...baseGoals,
        {id: "biomachine_express", text: "Зарядка BIOMACHINE (экспресс)", completed: false, xp: 30},
        {id: "university_attendance", text: "Посещение всех пар", completed: false, xp: 40},
        {id: "homework_progress", text: "Выполнение домашних заданий", completed: false, xp: 35}
      ];

      if (hasVolleyball) {
        weekdayGoals.push({id: "volleyball_training", text: "Тренировка по волейболу", completed: false, xp: 45});
        weekdayGoals.push({id: "pre_workout_snack", text: "Перекус перед тренировкой", completed: false, xp: 15});
      }

      if (hasPE) {
        weekdayGoals[2] = {id: "biomachine_antistress", text: "Зарядка BIOMACHINE (анти-стресс)", completed: false, xp: 25};
        weekdayGoals.push({id: "pe_class", text: "Физкультура в университете", completed: false, xp: 30});
      }

      return weekdayGoals;
    }
  };

  const generateDailyPlan = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const dateStr = now.toISOString().split('T')[0];
    
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const hasVolleyball = dayOfWeek === 2 || dayOfWeek === 4;
    const hasPE = dayOfWeek === 3;
    
    const planTemplate = {
      metadata: {
        version: "1.0",
        created: now.toISOString(),
        type: "zoj_daily_plan",
        user: "student_diabetes_1",
        date: dateStr,
        day_type: isWeekend ? "weekend" : "weekday",
        has_volleyball: hasVolleyball,
        has_pe: hasPE
      },
      blocks: []
    };

    const glucoseBlock = {
      id: `glucose_${dateStr}`,
      type: "tracker",
      title: `Контроль глюкозы`,
      icon: "📊",
      data: {
        target_range: [4.0, 8.0],
        unit: "ммоль/л",
        measurements: [
          {time: "07:00", value: null, note: "Натощак"},
          {time: "10:00", value: null, note: "После завтрака"},
          {time: "12:30", value: null, note: "Перед обедом"},
          {time: "16:00", value: null, note: "Полдник"},
          {time: "21:30", value: null, note: "Перед сном"}
        ]
      }
    };

    const goalsBlock = {
      id: `goals_${dateStr}`,
      type: "checklist",
      title: `Цели дня`,
      icon: "🎯",
      data: {
        items: getGoalsForDay(dayOfWeek, hasVolleyball, hasPE)
      }
    };

    const mealsBlock = {
      id: `meals_${dateStr}`,
      type: "form",
      title: `Питание и инсулин`,
      icon: "🍽️",
      data: {
        meals: [
          {time: "08:00", type: "Завтрак", food: "", carbs: null, insulin: null, notes: ""},
          {time: "12:30", type: "Обед", food: "", carbs: null, insulin: null, notes: ""},
          {time: "16:15", type: "Перекус", food: "", carbs: null, insulin: null, notes: ""},
          {time: "18:30", type: "Ужин", food: "", carbs: null, insulin: null, notes: ""}
        ]
      }
    };

    planTemplate.blocks = [glucoseBlock, goalsBlock, mealsBlock];
    return planTemplate;
  };

  const applyGeneratedPlan = () => {
    const newPlan = generateDailyPlan();
    setBlocks(newPlan.blocks);
    Alert.alert('🎯 План создан!', `Сгенерирован план на ${getDayName(new Date().getDay())}`);
  };

  const sendToTelegram = async () => {
    try {
      const updatedData = { ...testData, blocks };
      const jsonString = JSON.stringify(updatedData, null, 2);
      
      const message = `🤖 Автоматическая отправка из Mussasi\n📅 ${new Date().toLocaleString('ru-RU')}\n\n\`\`\`json\n${jsonString}\n\`\`\``;
      
      const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CONFIG.CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (response.ok) {
        Alert.alert('✅ Успех!', 'Данные отправлены в группу Mussasi');
      } else {
        const error = await response.text();
        Alert.alert('❌ Ошибка отправки', error);
      }
    } catch (error) {
      Alert.alert('❌ Ошибка', error.message);
    }
  };

  const openInputModal = (blockIndex, measurementIndex) => {
    setCurrentEdit({ blockIndex, measurementIndex });
    setInputValue(blocks[blockIndex].data.measurements[measurementIndex].value?.toString() || '');
    setModalVisible(true);
  };

  const saveValue = () => {
    if (currentEdit) {
      const newBlocks = [...blocks];
      newBlocks[currentEdit.blockIndex].data.measurements[currentEdit.measurementIndex].value = 
        parseFloat(inputValue) || null;
      setBlocks(newBlocks);
    }
    setModalVisible(false);
    setCurrentEdit(null);
    setInputValue('');
  };

  const renderActiveScreen = () => {
  switch (activeTab) {
    case 'home':
      return renderHomeContent();
    case 'schedule':
      return <Schedule />;
    case 'stats':
      return <StatsScreen />;
    case 'settings':
      return <SettingsScreen />;
    case 'stats':
      return <StatsScreen blocks={blocks} />
    default:
      return renderHomeContent();
  }
};

const renderHomeContent = () => (
  <>
    {/* Кнопки действий */}
    <View style={styles.actionsContainer}>
      <GradientButton
        colors={['#0088cc', '#005999']}
        onPress={sendToTelegram}
        style={styles.actionButton}
      >
        📱 Отправить в Mussasi
      </GradientButton>

      <GradientButton
        colors={[COLORS.success, '#30A14E']}
        onPress={applyGeneratedPlan}
        style={styles.actionButton}
      >
        🎯 Сгенерировать план дня
      </GradientButton>
    </View>

    {/* Превью расписания */}
    <View style={styles.scheduleContainer}>
      <SchedulePreview 
        schedule={currentSchedule}
        dayStatus={dayStatus}
        onPress={() => setActiveTab('schedule')}
      />
    </View>

    {/* Блоки данных */}
    {blocks.map((block, blockIndex) => (
      <BlockComponent 
        key={block.id} 
        block={block} 
        blockIndex={blockIndex}
        onUpdate={(updatedBlock) => {
          const newBlocks = [...blocks];
          newBlocks[blockIndex] = updatedBlock;
          setBlocks(newBlocks);
        }}
        onOpenInput={openInputModal}
      />
    ))}
  </>
);


if (isLoading) {
  return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
}

  return (
  <View style={styles.container}>
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {renderActiveScreen()}
    </ScrollView>

    <BottomNavigation 
      activeTab={activeTab} 
      onTabPress={setActiveTab} 
    />

    {/* Модальное окно */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>📊 Введите значение глюкозы</Text>
          <TextInput
            style={styles.textInput}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Например: 5.2"
            keyboardType="numeric"
            autoFocus={true}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>
            <GradientButton
              colors={[COLORS.success, '#30A14E']}
              onPress={saveValue}
              style={styles.saveButton}
            >
              Сохранить
            </GradientButton>
          </View>
        </View>
      </View>
    </Modal>
  </View>
)};


// Компонент для отображения блока
function BlockComponent({ block, blockIndex, onUpdate, onOpenInput }) {
  const renderBlock = () => {
    switch (block.type) {
      case 'tracker':
        return <TrackerBlock block={block} blockIndex={blockIndex} onOpenInput={onOpenInput} />;
      case 'checklist':
        return <ChecklistBlock block={block} onUpdate={onUpdate} />;
      case 'form':
        return <FormBlock block={block} onUpdate={onUpdate} />;
      default:
        return <Text>Неизвестный тип блока: {block.type}</Text>;
    }
  };

  return (
    <View style={styles.blockContainer}>
      <Text style={styles.blockTitle}>
        {block.icon} {block.title}
      </Text>
      {renderBlock()}
    </View>
  );
}

// Улучшенный компонент трекера
function TrackerBlock({ block, blockIndex, onOpenInput }) {
  return (
    <View>
      <Text style={styles.targetRange}>
        🎯 Целевой диапазон: {block.data.target_range[0]}-{block.data.target_range[1]} {block.data.unit}
      </Text>
      {block.data.measurements.map((measurement, index) => {
        const glucoseColor = getGlucoseColor(measurement.value, block.data.target_range);
        return (
          <View key={index} style={styles.measurementRow}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{measurement.time}</Text>
              <Text style={styles.noteText}>{measurement.note}</Text>
            </View>
            <TouchableOpacity 
              style={[
                styles.valueButton,
                { borderColor: glucoseColor },
                measurement.value ? { backgroundColor: `${glucoseColor}15` } : null
              ]}
              onPress={() => onOpenInput(blockIndex, index)}
            >
              <Text style={[styles.valueText, { color: measurement.value ? glucoseColor : COLORS.textSecondary }]}>
                {measurement.value ? `${measurement.value} ${block.data.unit}` : 'Не заполнено'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

// Улучшенный компонент чек-листа
function ChecklistBlock({ block, onUpdate }) {
  const toggleItem = (index) => {
    const updatedBlock = { ...block };
    updatedBlock.data.items[index].completed = !updatedBlock.data.items[index].completed;
    onUpdate(updatedBlock);
  };

  const completedCount = block.data.items.filter(item => item.completed).length;
  const totalXP = block.data.items.filter(item => item.completed).reduce((sum, item) => sum + item.xp, 0);
  const progress = completedCount / block.data.items.length;

  return (
    <View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Выполнено: {completedCount}/{block.data.items.length} • XP: {totalXP}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>
      
      {block.data.items.map((item, index) => (
        <TouchableOpacity 
          key={item.id} 
          style={[
            styles.checklistItem,
            item.completed ? styles.checklistItemCompleted : null
          ]}
          onPress={() => toggleItem(index)}
        >
          <Text style={[
            styles.checkboxText,
            item.completed ? styles.completedText : null
          ]}>
            {item.completed ? '✅' : '⬜'} {item.text}
          </Text>
          <Text style={styles.xpText}>+{item.xp} XP</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Улучшенный компонент формы
function FormBlock({ block, onUpdate }) {
  return (
    <View>
      {block.data.meals.map((meal, index) => (
        <View key={index} style={styles.mealCard}>
          <View style={styles.mealHeader}>
            <Text style={styles.mealTime}>{meal.time}</Text>
            <Text style={styles.mealType}>{meal.type}</Text>
          </View>
          <View style={styles.mealDetails}>
            <Text style={styles.mealDetailText}>
              🍽️ Еда: <Text style={styles.mealValue}>{meal.food || 'Не указано'}</Text>
            </Text>
            <Text style={styles.mealDetailText}>
              🍞 Углеводы: <Text style={styles.mealValue}>{meal.carbs || 'Не указано'} г</Text>
            </Text>
            <Text style={styles.mealDetailText}>
              💉 Инсулин: <Text style={styles.mealValue}>{meal.insulin || 'Не указано'} ед</Text>
            </Text>
            {meal.notes && (
              <Text style={styles.mealNotes}>📝 {meal.notes}</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: COLORS.background,
  paddingTop: 50,
  },
  content: {
    flex: 1,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  
  buttonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  
  gradientButton: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  actionButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  
  scheduleContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  
  blockContainer: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  
  blockTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: COLORS.text,
    letterSpacing: 0.3,
  },
  
  targetRange: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
    fontWeight: '500',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 12,
    textAlign: 'center',
  },
  
  measurementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  
  timeContainer: {
    flex: 1,
  },
  
  timeText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  
  noteText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  
  valueButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: COLORS.background,
  },
  
  valueText: {
    fontSize: 14,
    fontWeight: '600',
  },
  
  progressContainer: {
    marginBottom: 16,
  },
  
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: COLORS.text,
  },
  
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
  
  checklistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  
  checklistItemCompleted: {
    backgroundColor: '#E8F5E8',
    borderColor: COLORS.success,
  },
  
  checkboxText: {
    fontSize: 16,
    flex: 1,
    color: COLORS.text,
    fontWeight: '500',
  },
  
  completedText: {
    textDecorationLine: 'line-through',
    color: COLORS.success,
    fontWeight: '600',
  },
  
  xpText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  
  mealCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  mealTime: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  
  mealType: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  
  mealDetails: {
    gap: 6,
  },
  
  mealDetailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  
  mealValue: {
    fontWeight: '600',
    color: COLORS.text,
  },
  
  mealNotes: {
    fontSize: 12,
    color: COLORS.warning,
    fontStyle: 'italic',
    marginTop: 4,
  },
  
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  
  modalContent: {
    backgroundColor: COLORS.surface,
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: COLORS.text,
    textAlign: 'center',
  },
  
  textInput: {
    borderWidth: 2,
    borderColor: COLORS.border,
    padding: 16,
    borderRadius: 12,
    width: '100%',
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: COLORS.background,
    textAlign: 'center',
    fontWeight: '600',
  },
  
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  
  cancelButton: {
    backgroundColor: COLORS.textSecondary,
    padding: 16,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  
  saveButton: {
    flex: 1,
  },
});