import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  // Ключи для хранения
  static KEYS = {
    MEALS: '@mussasi_meals',
    GLUCOSE: '@mussasi_glucose',
    SETTINGS: '@mussasi_settings',
    SCHEDULE: '@mussasi_schedule',
  };

  // Сохранение данных
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Storage save error:', error);
      throw error;
    }
  }

  // Получение данных
  async getItem(key, defaultValue = null) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  }

  // Удаление данных
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
      throw error;
    }
  }

  // Очистка всех данных
  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
      throw error;
    }
  }

  // Специфичные методы для приложения
  async saveMeals(meals) {
    return this.setItem(StorageService.KEYS.MEALS, meals);
  }

  async getMeals() {
    return this.getItem(StorageService.KEYS.MEALS, []);
  }

  async saveGlucoseData(data) {
    return this.setItem(StorageService.KEYS.GLUCOSE, data);
  }

  async getGlucoseData() {
    return this.getItem(StorageService.KEYS.GLUCOSE, []);
  }
}

export default new StorageService();
