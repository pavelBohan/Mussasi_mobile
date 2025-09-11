import { scheduleUtils } from '../utils/scheduleUtils';

// Маппинг строковых ключей дней на числовые, используемые в данных
const dayKeyMapping = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

export const scheduleData = {
  // Расписание для 2-й недели (текущая неделя 9-15 сентября)
  week2: {
    1: [], // Понедельник - нет пар
    2: [ // Вторник
      { time: '18:30-20:20', period: 'volleyball', subject: '🏐 Волейбол', teacher: 'Тренировка', room: 'Спорт зал', isVolleyball: true },
    ],
    3: [], // Среда - нет пар
    4: [ // Четверг 11 сентября
      { time: '13:10-14:30', period: 4, subject: 'Методы и средства проектирования информационных систем', teacher: 'Зимина Л.В.', room: 'О_213-2' },
      { time: '14:50-16:10', period: 5, subject: 'Технологии программирования', teacher: 'Савина А.Г.', room: 'О=319' },
      { time: '16:40-18:00', period: 6, subject: 'Теория вероятностей и математическая статистика', teacher: 'Шмаркова Л.И.', room: 'О=307' },
      { time: '18:30-20:20', period: 'volleyball', subject: '🏐 Волейбол', teacher: 'Тренировка', room: 'Спорт зал', isVolleyball: true },
    ],
    5: [ // Пятница 12 сентября
      { time: '11:30-12:50', period: 3, subject: 'Иностранный язык', teacher: 'Лепешкина Г.Г.', room: 'О_316-2' },
      { time: '13:10-14:30', period: 4, subject: 'Иностранный язык', teacher: 'Лепешкина Г.Г.', room: 'О_316-2' },
      { time: '14:50-16:10', period: 5, subject: 'Математический анализ', teacher: 'Крюкова О.А.', room: 'О=307' },
      { time: '16:40-18:00', period: 6, subject: 'Теория вероятностей и математическая статистика', teacher: 'Шмаркова Л.И.', room: 'О=307' },
    ],
    6: [ // Суббота 13 сентября
      { time: '11:30-12:50', period: 3, subject: 'Вычислительные системы, сети и коммуникации', teacher: 'Ягодкин Д.А.', room: 'О=245' },
      { time: '13:10-14:30', period: 4, subject: 'Вычислительные системы, сети и коммуникации', teacher: 'Ягодкин Д.А.', room: 'О=245' },
    ],
    7: [], // Воскресенье
  },
  
  // Расписание для 1-й недели (предыдущая неделя 1-7 сентября)
  week1: {
    1: [ // Понедельник
      { time: '13:10-14:30', period: 4, subject: 'Теория вероятностей и математическая статистика', teacher: 'Шмаркова Л.И.', room: 'О=307' },
      { time: '14:50-16:10', period: 5, subject: 'Математический анализ', teacher: 'Крюкова О.А.', room: 'О=307' },
      { time: '16:40-18:00', period: 6, subject: 'Технологии программирования', teacher: 'Савина А.Г.', room: 'О=319' },
    ],
    2: [ // Вторник
      { time: '13:10-14:30', period: 4, subject: 'Вычислительные системы, сети и коммуникации', teacher: 'Ягодкин Д.А.', room: 'О=245' },
      { time: '14:50-16:10', period: 5, subject: 'Методы и средства проектирования информационных систем', teacher: 'Зимина Л.В.', room: 'О_314-2' },
      { time: '16:40-18:00', period: 6, subject: 'Деловые коммуникации', teacher: 'Макарова Ю.Л.', room: 'О=307' },
      { time: '18:30-20:20', period: 'volleyball', subject: '🏐 Волейбол', teacher: 'Тренировка', room: 'Спорт зал', isVolleyball: true },
    ],
    3: [ // Среда
      { time: '13:10-14:30', period: 4, subject: 'Методы и средства проектирования информационных систем', teacher: 'Зимина Л.В.', room: 'О_314-2' },
      { time: '14:50-16:10', period: 5, subject: 'Прикладная физическая культура', teacher: 'Дрожжаков А.И.', room: 'О-Спорт Зал', isPE: true },
    ],
    4: [ // Четверг
      { time: '11:30-12:50', period: 3, subject: 'Математический анализ', teacher: 'Крюкова О.А.', room: 'О=307' },
      { time: '13:10-14:30', period: 4, subject: 'Теория вероятностей и математическая статистика', teacher: 'Шмаркова Л.И.', room: 'О=307' },
      { time: '14:50-16:10', period: 5, subject: 'Технологии программирования', teacher: 'Савина А.Г.', room: 'О=319' },
      { time: '18:30-20:20', period: 'volleyball', subject: '🏐 Волейбол', teacher: 'Тренировка', room: 'Спорт зал', isVolleyball: true },
    ],
    5: [ // Пятница
      { time: '11:30-12:50', period: 3, subject: 'Вычислительные системы, сети и коммуникации', teacher: 'Ягодкин Д.А.', room: 'О=245' },
      { time: '13:10-14:30', period: 4, subject: 'Деловые коммуникации', teacher: 'Макарова Ю.Л.', room: 'О=307' },
    ],
    6: [], // Суббота
    7: [], // Воскресенье
  },

  // НОВЫЙ МЕТОД: Реализация недостающей функции
  getDaySchedule: (dayKey, weekNumber) => {
    const weekData = weekNumber === 1 ? scheduleData.week1 : scheduleData.week2;
    const numericDayKey = dayKeyMapping[dayKey];
    return weekData[numericDayKey] || [];
  },

  // Существующие методы
  getCurrentWeek: scheduleUtils.getCurrentWeek,
  getTodaySchedule: () => {
    const currentWeek = scheduleUtils.getCurrentWeek();
    const currentDay = scheduleUtils.getCurrentDay();
    const weekData = currentWeek === 1 ? scheduleData.week1 : scheduleData.week2;
    return weekData[currentDay] || [];
  },
  getWeekSchedule: (weekNumber) => {
    return weekNumber === 1 ? scheduleData.week1 : scheduleData.week2;
  }
};
