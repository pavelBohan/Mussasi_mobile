
// data/productsDatabase.js - РАСШИРЕННАЯ ВЕРСИЯ

const products = [
  // БЕЛКИ - Мясо и птица
  {
    id: 'chicken-fillet',
    name: 'Куриное филе',
    category: 'meat',
    unit: 'г',
    nutrition: {
      calories: 113,
      protein: 23.6,
      carbs: 0.4,
      fat: 1.9,
      fiber: 0,
      sugar: 0,
    },
    glycemicIndex: 0,
    insulinIndex: 45,
    storageInfo: {
      fresh: '2-3 дня в холодильнике',
      frozen: '6 месяцев в морозилке',
    },
    averagePrice: 350, // за кг
    allergens: [],
    tags: ['белковый', 'диетический', 'meal-prep'],
  },
  {
    id: 'chicken-breast-smoked',
    name: 'Грудка куриная в/к',
    category: 'meat',
    unit: 'г',
    nutrition: {
      calories: 117,
      protein: 25.0,
      carbs: 0.5,
      fat: 1.8,
      fiber: 0,
      sugar: 0,
    },
    glycemicIndex: 0,
    insulinIndex: 50,
    storageInfo: {
      fresh: '5-7 дней в холодильнике',
      frozen: 'не рекомендуется',
    },
    averagePrice: 450,
    allergens: [],
    tags: ['готовый', 'белковый', 'удобно'],
  },
  {
    id: 'beef',
    name: 'Говядина',
    category: 'meat',
    unit: 'г',
    nutrition: {
      calories: 187,
      protein: 18.9,
      carbs: 0,
      fat: 12.4,
      fiber: 0,
      sugar: 0,
    },
    glycemicIndex: 0,
    insulinIndex: 51,
    storageInfo: {
      fresh: '3-5 дней в холодильнике',
      frozen: '6-12 месяцев в морозилке',
    },
    averagePrice: 600,
    allergens: [],
    tags: ['белковый', 'железо', 'сытный'],
  },

  // БЕЛКИ - Рыба и морепродукты
  {
    id: 'tuna-canned',
    name: 'Тунец в с/с',
    category: 'fish',
    unit: 'г',
    nutrition: {
      calories: 96,
      protein: 25.0,
      carbs: 0,
      fat: 0.6,
      fiber: 0,
      sugar: 0,
    },
    glycemicIndex: 0,
    insulinIndex: 50,
    storageInfo: {
      canned: '2-3 года при комнатной температуре',
      opened: '2-3 дня в холодильнике',
    },
    averagePrice: 100, // за банку 185г
    allergens: ['рыба'],
    tags: ['белковый', 'удобно', 'омега-3'],
  },
  {
    id: 'mackerel-canned',
    name: 'Скумбрия в рассоле',
    category: 'fish',
    unit: 'г',
    nutrition: {
      calories: 191,
      protein: 18.0,
      carbs: 0,
      fat: 13.2,
      fiber: 0,
      sugar: 0,
    },
    glycemicIndex: 0,
    insulinIndex: 59,
    storageInfo: {
      canned: '2-3 года при комнатной температуре',
      opened: '2-3 дня в холодильнике',
    },
    averagePrice: 120,
    allergens: ['рыба'],
    tags: ['жирная рыба', 'омега-3', 'удобно'],
  },
  {
    id: 'salmon',
    name: 'Лосось',
    category: 'fish',
    unit: 'г',
    nutrition: {
      calories: 142,
      protein: 19.8,
      carbs: 0,
      fat: 6.3,
      fiber: 0,
      sugar: 0,
    },
    glycemicIndex: 0,
    insulinIndex: 59,
    storageInfo: {
      fresh: '1-2 дня в холодильнике',
      frozen: '2-3 месяца в морозилке',
    },
    averagePrice: 800,
    allergens: ['рыба'],
    tags: ['премиум', 'омега-3', 'деликатес'],
  },

  // БЕЛКИ - Молочные продукты
  {
    id: 'cottage-cheese-0',
    name: 'Творог 0%',
    category: 'dairy',
    unit: 'г',
    nutrition: {
      calories: 71,
      protein: 16.7,
      carbs: 1.3,
      fat: 0.1,
      fiber: 0,
      sugar: 1.3,
    },
    glycemicIndex: 30,
    insulinIndex: 120,
    storageInfo: {
      fresh: '3-5 дней в холодильнике',
      frozen: 'не рекомендуется',
    },
    averagePrice: 120, // за 500г
    allergens: ['молоко'],
    tags: ['белковый', 'диетический', 'кальций'],
  },
  {
    id: 'cottage-cheese-5',
    name: 'Творог 5%',
    category: 'dairy',
    unit: 'г',
    nutrition: {
      calories: 121,
      protein: 17.2,
      carbs: 1.8,
      fat: 5.0,
      fiber: 0,
      sugar: 1.8,
    },
    glycemicIndex: 30,
    insulinIndex: 120,
    storageInfo: {
      fresh: '3-5 дней в холодильнике',
      frozen: 'не рекомендуется',
    },
    averagePrice: 130,
    allergens: ['молоко'],
    tags: ['белковый', 'сытный', 'кальций'],
  },
  {
    id: 'greek-yogurt',
    name: 'Греческий йогурт 0%',
    category: 'dairy',
    unit: 'г',
    nutrition: {
      calories: 59,
      protein: 10.3,
      carbs: 4.0,
      fat: 0.1,
      fiber: 0,
      sugar: 4.0,
    },
    glycemicIndex: 35,
    insulinIndex: 115,
    storageInfo: {
      fresh: '7-10 дней в холодильнике',
      frozen: 'не рекомендуется',
    },
    averagePrice: 80, // за 150г
    allergens: ['молоко'],
    tags: ['пробиотики', 'белковый', 'завтрак'],
  },
  {
    id: 'eggs',
    name: 'Яйца куриные',
    category: 'dairy',
    unit: 'шт',
    nutrition: {
      calories: 157, // на 100г (примерно 2 яйца)
      protein: 12.7,
      carbs: 0.7,
      fat: 11.5,
      fiber: 0,
      sugar: 0.7,
    },
    glycemicIndex: 0,
    insulinIndex: 31,
    storageInfo: {
      fresh: '3-5 недель в холодильнике',
      cooked: '1 неделя в холодильнике',
    },
    averagePrice: 90, // за 10 шт
    allergens: ['яйца'],
    tags: ['универсальный', 'белковый', 'завтрак'],
  },

  // УГЛЕВОДЫ - Крупы и злаки
  {
    id: 'oats-rolled',
    name: 'Овсянка',
    category: 'grains',
    unit: 'г',
    nutrition: {
      calories: 342,
      protein: 12.3,
      carbs: 59.5,
      fat: 6.2,
      fiber: 10.1,
      sugar: 0.8,
    },
    glycemicIndex: 55,
    insulinIndex: 40,
    storageInfo: {
      dry: '12 месяцев в сухом месте',
      cooked: '3-5 дней в холодильнике',
    },
    averagePrice: 80, // за кг
    allergens: ['глютен'],
    tags: ['медленные углеводы', 'клетчатка', 'завтрак'],
  },
  {
    id: 'oat-flour',
    name: 'Овсяная мука',
    category: 'grains',
    unit: 'г',
    nutrition: {
      calories: 369,
      protein: 13.0,
      carbs: 65.4,
      fat: 6.8,
      fiber: 6.5,
      sugar: 0.8,
    },
    glycemicIndex: 44,
    insulinIndex: 40,
    storageInfo: {
      dry: '6 месяцев в сухом месте',
    },
    averagePrice: 120,
    allergens: ['глютен'],
    tags: ['выпечка', 'мука', 'клетчатка'],
  },

  // УГЛЕВОДЫ - Бобовые
  {
    id: 'white-beans-canned',
    name: 'Фасоль белая в томате',
    category: 'legumes',
    unit: 'г',
    nutrition: {
      calories: 99,
      protein: 6.7,
      carbs: 17.4,
      fat: 0.5,
      fiber: 6.3,
      sugar: 3.2,
    },
    glycemicIndex: 35,
    insulinIndex: 120,
    storageInfo: {
      canned: '2-3 года при комнатной температуре',
      opened: '3-4 дня в холодильнике',
    },
    averagePrice: 60, // за банку 400г
    allergens: [],
    tags: ['растительный белок', 'клетчатка', 'сытно'],
  },

  // ОВОЩИ
  {
    id: 'broccoli',
    name: 'Брокколи',
    category: 'vegetables',
    unit: 'г',
    nutrition: {
      calories: 25,
      protein: 3.0,
      carbs: 4.0,
      fat: 0.4,
      fiber: 3.0,
      sugar: 1.5,
    },
    glycemicIndex: 15,
    insulinIndex: 20,
    storageInfo: {
      fresh: '3-5 дней в холодильнике',
      frozen: '10-12 месяцев в морозилке',
    },
    averagePrice: 150, // за кг
    allergens: [],
    tags: ['суперфуд', 'витамины', 'антиоксиданты'],
  },
  {
    id: 'spinach',
    name: 'Шпинат',
    category: 'vegetables',
    unit: 'г',
    nutrition: {
      calories: 22,
      protein: 2.9,
      carbs: 2.0,
      fat: 0.4,
      fiber: 2.2,
      sugar: 0.4,
    },
    glycemicIndex: 15,
    insulinIndex: 20,
    storageInfo: {
      fresh: '3-7 дней в холодильнике',
      frozen: '10-12 месяцев в морозилке',
    },
    averagePrice: 200,
    allergens: [],
    tags: ['железо', 'витамины', 'зелень'],
  },
  {
    id: 'carrots',
    name: 'Морковь',
    category: 'vegetables',
    unit: 'г',
    nutrition: {
      calories: 35,
      protein: 0.9,
      carbs: 7.2,
      fat: 0.2,
      fiber: 2.8,
      sugar: 4.7,
    },
    glycemicIndex: 47,
    insulinIndex: 20,
    storageInfo: {
      fresh: '2-4 недели в холодильнике',
      cooked: '3-5 дней в холодильнике',
    },
    averagePrice: 50,
    allergens: [],
    tags: ['бета-каротин', 'сладкий', 'универсальный'],
  },
  {
    id: 'onions',
    name: 'Лук репчатый',
    category: 'vegetables',
    unit: 'г',
    nutrition: {
      calories: 47,
      protein: 1.4,
      carbs: 8.2,
      fat: 0.2,
      fiber: 2.2,
      sugar: 4.4,
    },
    glycemicIndex: 25,
    insulinIndex: 20,
    storageInfo: {
      fresh: '2-3 месяца в прохладном месте',
      cooked: '3-5 дней в холодильнике',
    },
    averagePrice: 40,
    allergens: [],
    tags: ['основа', 'ароматный', 'универсальный'],
  },
  {
    id: 'tomatoes',
    name: 'Помидоры',
    category: 'vegetables',
    unit: 'г',
    nutrition: {
      calories: 20,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2,
      fiber: 1.4,
      sugar: 2.6,
    },
    glycemicIndex: 30,
    insulinIndex: 20,
    storageInfo: {
      fresh: '1 неделя при комнатной температуре',
      refrigerated: '2 недели в холодильнике',
    },
    averagePrice: 120,
    allergens: [],
    tags: ['ликопин', 'сочный', 'салаты'],
  },
  {
    id: 'cucumbers',
    name: 'Огурцы',
    category: 'vegetables',
    unit: 'г',
    nutrition: {
      calories: 14,
      protein: 0.8,
      carbs: 2.5,
      fat: 0.1,
      fiber: 1.0,
      sugar: 1.7,
    },
    glycemicIndex: 25,
    insulinIndex: 20,
    storageInfo: {
      fresh: '1 неделя в холодильнике',
    },
    averagePrice: 80,
    allergens: [],
    tags: ['освежающий', 'низкокалорийный', 'салаты'],
  },

  // ФРУКТЫ
  {
    id: 'bananas',
    name: 'Бананы',
    category: 'fruits',
    unit: 'шт',
    nutrition: {
      calories: 96, // средний банан 120г
      protein: 1.3,
      carbs: 21.0,
      fat: 0.2,
      fiber: 2.1,
      sugar: 17.2,
    },
    glycemicIndex: 62,
    insulinIndex: 81,
    storageInfo: {
      fresh: '3-7 дней при комнатной температуре',
      ripe: '2-3 дня в холодильнике',
    },
    averagePrice: 80, // за кг
    allergens: [],
    tags: ['быстрые углеводы', 'калий', 'перекус'],
  },

  // ДОПОЛНИТЕЛЬНЫЕ ПРОДУКТЫ
  {
    id: 'tomato-paste',
    name: 'Томатная паста',
    category: 'condiments',
    unit: 'г',
    nutrition: {
      calories: 99,
      protein: 4.8,
      carbs: 19.0,
      fat: 0.6,
      fiber: 4.1,
      sugar: 12.2,
    },
    glycemicIndex: 35,
    insulinIndex: 20,
    storageInfo: {
      unopened: '2 года при комнатной температуре',
      opened: '1 месяц в холодильнике',
    },
    averagePrice: 50, // за тубу 140г
    allergens: [],
    tags: ['концентрированный', 'умами', 'основа'],
  },
];

class ProductsDatabase {
  static getAllProducts() {
    return products;
  }

  static getProductById(id) {
    return products.find(product => product.id === id);
  }

  static getProductsByCategory(category) {
    return products.filter(product => product.category === category);
  }

  static searchProducts(query) {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  static getProductsByTags(tags) {
    return products.filter(product =>
      tags.some(tag => product.tags.includes(tag))
    );
  }

  static getCategories() {
    const categories = [...new Set(products.map(product => product.category))];
    return categories.map(category => ({
      id: category,
      name: this.getCategoryName(category),
      count: products.filter(p => p.category === category).length,
    }));
  }

  static getCategoryName(category) {
    const names = {
      meat: 'Мясо и птица',
      fish: 'Рыба и морепродукты',
      dairy: 'Молочные продукты',
      grains: 'Крупы и злаки',
      legumes: 'Бобовые',
      vegetables: 'Овощи',
      fruits: 'Фрукты',
      condiments: 'Приправы и соусы',
    };
    return names[category] || category;
  }
}

export { ProductsDatabase as productsDatabase };