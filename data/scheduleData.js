const scheduleData = {
  // 3-я неделя (15-21 сентября)
  week3: {
    monday: [
      { time: '13:10-14:30', subject: 'Деловые коммуникации', teacher: 'Макарова Ю.Л.', room: 'О-307', type: 'л.' },
      { time: '14:50-16:10', subject: 'Вычислительные системы, сети и коммуникации', teacher: 'Ягодин Д.А.', room: 'О-245', type: 'л.' },
      { time: '16:40-18:00', subject: 'Вычислительные системы, сети и коммуникации', teacher: 'Ягодин Д.А.', room: 'О-245', type: 'пр.' }
    ],
    tuesday: [
      { time: '13:10-14:30', subject: 'Математический анализ', teacher: 'Крюкова О.А.', room: 'О-307', type: 'л.' },
      { time: '14:50-16:10', subject: 'Математический анализ', teacher: 'Крюкова О.А.', room: 'О-307', type: 'пр.' }
    ],
    wednesday: [
      { time: '11:30-12:50', subject: 'Теория вероятностей и математическая статистика', teacher: 'Ширакова Л.И.', room: 'О-307', type: 'л.' },
      { time: '13:10-14:30', subject: 'Технологии программирования', teacher: 'Савина А.Г.', room: 'О-319', type: 'л.' },
      { time: '14:50-16:10', subject: 'Прикладная физическая культура', teacher: 'Дрокаков А.И.', room: 'О-Спорт Зал', type: 'физ.' },
      { time: '16:40-18:00', subject: 'Прикладная физическая культура', teacher: 'Дрокаков А.И.', room: 'О-Спорт Зал', type: 'физ.' }
    ],
    thursday: [
      { time: '13:10-14:30', subject: 'Теория вероятностей и математическая статистика', teacher: 'Ширакова Л.И.', room: 'О-307', type: 'л.' },
      { time: '14:50-16:10', subject: 'Теория вероятностей и математическая статистика', teacher: 'Ширакова Л.И.', room: 'О-307', type: 'л.' }
    ],
    friday: [
      { time: '9:40-11:00', subject: 'Иностранный язык', teacher: 'Лепешкина Г.Г.', room: 'О_316-2', type: '' },
      { time: '11:30-12:50', subject: 'Иностранный язык', teacher: 'Лепешкина Г.Г.', room: 'О_316-2', type: '' },
      { time: '13:10-14:30', subject: 'Технологии программирования', teacher: 'Бессонова М.П.', room: 'О-221-1', type: 'пр.' },
      { time: '14:50-16:10', subject: 'Деловые коммуникации', teacher: 'Макарова Ю.Л.', room: 'О-307', type: 'пр.' }
    ],
    saturday: [
      { time: '8:00-9:20', subject: 'Теория систем и системный анализ', teacher: 'Логинов И.В.', room: 'О-319', type: 'л.' },
      { time: '9:40-11:00', subject: 'Теория систем и системный анализ', teacher: 'Логинов И.В.', room: 'О-319', type: 'пр.' },
      { time: '11:30-12:50', subject: 'Методы и средства проектирования информационных систем', teacher: 'Зимина Л.В.', room: 'О_314-2', type: 'л.' },
      { time: '13:10-14:30', subject: 'Методы и средства проектирования информационных систем', teacher: 'Зимина Л.В.', room: 'О_314-2', type: 'пр.' }
    ],
    sunday: []
  },
  
  // 4-я неделя (22-28 сентября)
  week4: {
    monday: [
      { time: '13:10-14:30', subject: 'Теория вероятностей и математическая статистика', teacher: 'Ширакова П.И.', room: 'О-307', type: 'л.' },
      { time: '14:50-16:10', subject: 'Методы и средства проектирования информационных систем', teacher: 'Зимина Л.В.', room: 'О_314-2', type: 'л.' },
      { time: '16:40-18:00', subject: 'Теория вероятностей и математическая статистика', teacher: 'Ширакова П.И.', room: 'О-307', type: 'пр.' }
    ],
    tuesday: [
      { time: '13:10-14:30', subject: 'Методы и средства проектирования информационных систем', teacher: 'Зимина Л.В.', room: 'О_314-2', type: 'пр.' },
      { time: '14:50-16:10', subject: 'Математический анализ', teacher: 'Крюкова О.А.', room: 'О-307', type: 'л.' },
      { time: '16:40-18:00', subject: 'Математический анализ', teacher: 'Крюкова О.А.', room: 'О-307', type: 'пр.' },
      { time: '18:20-19:40', subject: 'Деловые коммуникации', teacher: 'Макарова Ю.Л.', room: 'О-307', type: 'л.' }
    ],
    wednesday: [
      { time: '13:10-14:30', subject: 'Технологии программирования', teacher: 'Савина А.Г.', room: 'О-319', type: 'л.' },
      { time: '14:50-16:10', subject: 'Прикладная физическая культура', teacher: 'Дрокаков А.И.', room: 'О-Спорт Зал', type: 'физ.' },
      { time: '16:40-18:00', subject: 'Прикладная физическая культура', teacher: 'Дрокаков А.И.', room: 'О-Спорт Зал', type: 'физ.' }
    ],
    thursday: [
      { time: '11:30-12:50', subject: 'Технологии программирования', teacher: 'Бессонова М.П.', room: 'О-221-1', type: 'пр.' },
      { time: '13:10-14:30', subject: 'Методы и средства проектирования информационных систем', teacher: 'Зимина Л.В.', room: 'О_213-2', type: 'л.' }
    ],
    friday: [
      { time: '9:40-11:00', subject: 'Иностранный язык', teacher: 'Лепешкина Г.Г.', room: 'О_316-2', type: '' },
      { time: '11:30-12:50', subject: 'Иностранный язык', teacher: 'Лепешкина Г.Г.', room: 'О_316-2', type: '' },
      { time: '13:10-14:30', subject: 'Вычислительные системы, сети и коммуникации', teacher: 'Ягодин Д.А.', room: 'О-245', type: 'л.' },
      { time: '14:50-16:10', subject: 'Вычислительные системы, сети и коммуникации', teacher: 'Ягодин Д.А.', room: 'О-245', type: 'л.' }
    ],
    saturday: [
      { time: '8:00-9:20', subject: 'Теория систем и системный анализ', teacher: 'Логинов И.В.', room: 'О-317', type: 'л.' },
      { time: '9:40-11:00', subject: 'Теория систем и системный анализ', teacher: 'Логинов И.В.', room: 'О-317', type: 'пр.' },
      { time: '11:30-12:50', subject: 'Вычислительные системы, сети и коммуникации', teacher: 'Ягодин Д.А.', room: 'О-245', type: 'л.' }
    ],
    sunday: []
  }
};

// Функция для получения расписания на день
export const getDaySchedule = (date) => {
  const dayOfWeek = date.getDay();
  const weekNumber = getWeekNumber(date);
  
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = days[dayOfWeek];
  
  const weekKey = weekNumber === 3 ? 'week3' : 'week4';
  
  return scheduleData[weekKey]?.[dayName] || [];
};

// Функция для определения номера недели
const getWeekNumber = (date) => {
  const september15 = new Date(2025, 8, 15); // 15 сентября 2025
  const diffTime = date.getTime() - september15.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diffDays / 7) + 3; // Начинаем с 3-й недели
  
  return weekNumber === 3 ? 3 : 4;
};

export default scheduleData;
