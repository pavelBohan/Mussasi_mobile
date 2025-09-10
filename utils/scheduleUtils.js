export const scheduleUtils = {
  getCurrentWeek: () => {
    const now = new Date();
    // Определяем неделю по дате начала семестра
    // Предположим, что 1 сентября 2025 - начало 1-й недели
    const semesterStart = new Date('2025-09-01');
    const diffTime = now.getTime() - semesterStart.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(diffDays / 7) + 1;
    
    // Возвращаем 1 или 2 (чередование недель)
    return ((weekNumber - 1) % 2) + 1;
  },

  getCurrentDay: () => {
    const now = new Date();
    const day = now.getDay();
    // Преобразуем в формат: 1=понедельник, 2=вторник, и т.д.
    return day === 0 ? 7 : day; // Воскресенье = 7
  },

  getCurrentTime: () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes(); // Время в минутах
  },

  // НОВАЯ ФУНКЦИЯ: Получить следующую пару
  getNextClass: (schedule) => {
    if (!schedule || schedule.length === 0) return null;
    
    const currentTime = scheduleUtils.getCurrentTime();
    const pairTimes = [
      { start: 8 * 60, end: 9 * 60 + 20 },      // 1 пара: 8:00-9:20
      { start: 9 * 60 + 40, end: 11 * 60 },     // 2 пара: 9:40-11:00
      { start: 11 * 60 + 30, end: 12 * 60 + 50 }, // 3 пара: 11:30-12:50
      { start: 13 * 60 + 10, end: 14 * 60 + 30 }, // 4 пара: 13:10-14:30
      { start: 14 * 60 + 50, end: 16 * 60 + 10 }, // 5 пара: 14:50-16:10
      { start: 16 * 60 + 40, end: 18 * 60 },     // 6 пара: 16:40-18:00
      { start: 18 * 60 + 20, end: 19 * 60 + 40 }, // 7 пара: 18:20-19:40
      { start: 20 * 60, end: 21 * 60 + 20 },     // 8 пара: 20:00-21:20
    ];

    // Ищем следующую пару
    for (let i = 0; i < schedule.length; i++) {
      const pairTime = pairTimes[i];
      if (pairTime && currentTime < pairTime.start) {
        return schedule[i];
      }
    }
    
    return null; // Все пары уже прошли
  },

  // НОВАЯ ФУНКЦИЯ: Проверить есть ли волейбол
  hasVolleyball: (schedule) => {
    const currentDay = scheduleUtils.getCurrentDay();
    return currentDay === 2 || currentDay === 4; // Вторник или четверг
  },

  // НОВАЯ ФУНКЦИЯ: Сократить название предмета
  getShortSubject: (subject) => {
    if (!subject) return '';
    
    const shortNames = {
      'Теория вероятностей и математическая статистика': 'Теория вероятностей',
      'Математический анализ': 'Мат. анализ',
      'Технологии программирования': 'Технологии прогр.',
      'Вычислительные системы, сети и коммуникации': 'Выч. системы',
      'Методы и средства проектирования информационных систем': 'Проектирование ИС',
      'Деловые коммуникации': 'Дел. коммуникации',
      'Прикладная физическая культура': 'Физкультура'
    };

    return shortNames[subject] || subject;
  },

  // НОВАЯ ФУНКЦИЯ: Проверить активна ли пара сейчас
  isClassActive: (timeString) => {
    if (!timeString) return false;
    
    const currentTime = scheduleUtils.getCurrentTime();
    const [startTime, endTime] = timeString.split('-');
    
    const parseTime = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const start = parseTime(startTime);
    const end = parseTime(endTime);
    
    return currentTime >= start && currentTime <= end;
  },

  getDayStatus: (schedule) => {
    const currentTime = scheduleUtils.getCurrentTime();
    const currentDay = scheduleUtils.getCurrentDay();
    
    // Время пар в минутах
    const pairTimes = [
      { start: 8 * 60, end: 9 * 60 + 20 },      // 1 пара: 8:00-9:20
      { start: 9 * 60 + 40, end: 11 * 60 },     // 2 пара: 9:40-11:00
      { start: 11 * 60 + 30, end: 12 * 60 + 50 }, // 3 пара: 11:30-12:50
      { start: 13 * 60 + 10, end: 14 * 60 + 30 }, // 4 пара: 13:10-14:30
      { start: 14 * 60 + 50, end: 16 * 60 + 10 }, // 5 пара: 14:50-16:10
      { start: 16 * 60 + 40, end: 18 * 60 },     // 6 пара: 16:40-18:00
      { start: 18 * 60 + 20, end: 19 * 60 + 40 }, // 7 пара: 18:20-19:40
      { start: 20 * 60, end: 21 * 60 + 20 },     // 8 пара: 20:00-21:20
    ];

    let currentPair = null;
    let nextPair = null;

    // Находим текущую пару
    for (let i = 0; i < pairTimes.length; i++) {
      if (currentTime >= pairTimes[i].start && currentTime <= pairTimes[i].end) {
        currentPair = i + 1;
        break;
      }
      if (currentTime < pairTimes[i].start && !nextPair) {
        nextPair = i + 1;
      }
    }

    // Определяем статус дня
    let status = 'Учебный день';
    let endTime = '18:00';
    
    if (schedule && schedule.length > 0) {
      const lastClass = schedule[schedule.length - 1];
      if (lastClass && lastClass.time) {
        endTime = lastClass.time.split('-')[1];
      }
    }

    if (currentPair) {
      status = `${currentPair}-я пара`;
    } else if (nextPair) {
      status = `До ${nextPair}-й пары`;
    } else if (currentTime > 18 * 60) {
      status = 'Пары закончились';
    }

    return {
      status,
      endTime,
      currentWeek: scheduleUtils.getCurrentWeek(),
      currentDay,
      currentPair,
      nextPair,
      hasVolleyball: currentDay === 2 || currentDay === 4, // Вторник или четверг
      hasPE: currentDay === 3, // Среда
    };
  },

  formatTime: (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  },
};