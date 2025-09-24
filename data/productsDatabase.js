
// data/productsDatabase.js - ПОЛНАЯ ВЕРСИЯ ДЛЯ ВАШЕГО МЕНЮ

const products = [
  // === БЕЛКИ - МЯСО И ПТИЦА ===
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
      cooked: '4 дня в холодильнике',
    },
    averagePrice: 350, // за кг
    allergens: [],
    tags: ['белковый', 'диетический', 'meal-prep', 'основа'],
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

  // === БЕЛКИ - РЫБА И МОРЕПРОДУКТЫ ===
  {
    id: 'tuna-canned',
    name: 'Тунец в собственном соку',
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
      canned: '3 года при комнатной температуре',
      opened: '2-3 дня в холодильнике',
    },
    averagePrice: 100, // за банку 185г
    allergens: ['рыба'],
    tags: ['белковый', 'удобно', 'омега-3', 'салаты'],
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
      canned: '3 года при комнатной температуре',
      opened: '2-3 дня в холодильнике',
    },
    averagePrice: 120,
    allergens: ['рыба'],
    tags: ['жирная рыба', 'омега-3', 'удобно'],
  },

  // === БЕЛКИ - МОЛОЧНЫЕ ПРОДУКТЫ ===
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
    tags: ['белковый', 'диетический', 'кальций', 'основа'],
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
    tags: ['белковый', 'сытный', 'кальций', 'выпечка'],
  },
  {
    id: 'eggs',
    name: 'Яйца куриные',
    category: 'dairy',
    unit: 'шт',
    nutrition: {
      calories: 78, // на 1 яйцо ~50г
      protein: 6.3,
      carbs: 0.4,
      fat: 5.8,
      fiber: 0,
      sugar: 0.4,
    },
    glycemicIndex: 0,
    insulinIndex: 31,
    storageInfo: {
      fresh: '3-5 недель в холодильнике',
      cooked: '1 неделя в холодильнике',
    },
    averagePrice: 90, // за 10 шт
    allergens: ['яйца'],
    tags: ['универсальный', 'белковый', 'завтрак', 'выпечка'],
  },

  // === УГЛЕВОДЫ - КРУПЫ И ЗЛАКИ ===
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
    tags: ['медленные углеводы', 'клетчатка', 'завтрак', 'основа'],
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
    tags: ['выпечка', 'мука', 'клетчатка', 'основа'],
  },

  // === УГЛЕВОДЫ - БОБОВЫЕ ===
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
      canned: '3 года при комнатной температуре',
      opened: '3-4 дня в холодильнике',
    },
    averagePrice: 60, // за банку 400г
    allergens: [],
    tags: ['растительный белок', 'клетчатка', 'сытно', 'гарнир'],
  },

  // === ОВОЩИ ===
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
    tags: ['суперфуд', 'витамины', 'антиоксиданты', 'гарнир'],
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
    tags: ['бета-каротин', 'сладкий', 'универсальный', 'основа'],
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
    tags: ['ликопин', 'сочный', 'салаты', 'свежий'],
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
    tags: ['освежающий', 'низкокалорийный', 'салаты', 'хрустящий'],
  },

  // === ФРУКТЫ ===
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
    tags: ['быстрые углеводы', 'калий', 'перекус', 'энергия'],
  },

  // === ПРИПРАВЫ И СОУСЫ ===
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
    tags: ['концентрированный', 'умами', 'основа', 'соус'],
  },
  {
    id: 'olive-oil',
    name: 'Масло оливковое',
    category: 'oils',
    unit: 'мл',
    nutrition: {
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
      fiber: 0,
      sugar: 0,
    },
    glycemicIndex: 0,
    insulinIndex: 0,
    storageInfo: {
      unopened: '2 года в темном месте',
      opened: '6 месяцев в темном месте',
    },
    averagePrice: 300, // за 500мл
    allergens: [],
    tags: ['полезные жиры', 'средиземноморская диета', 'антиоксиданты'],
  },

  // === САХАРОЗАМЕНИТЕЛИ ===
  {
    id: 'erythritol',
    name: 'Эритритол',
    category: 'sweeteners',
    unit: 'г',
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
    },
    glycemicIndex: 0,
    insulinIndex: 0,
    storageInfo: {
      dry: '3 года в сухом месте',
    },
    averagePrice: 200, // за 500г
    allergens: [],
    tags: ['сахарозаменитель', 'диабетический', 'выпечка', 'безопасный'],
  },

  // === СПЕЦИИ И ТРАВЫ ===
  {
    id: 'salt',
    name: 'Соль морская',
    category: 'spices',
    unit: 'г',
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
    },
    glycemicIndex: 0,
    insulinIndex: 0,
    storageInfo: {
      dry: 'неограниченно в сухом месте',
    },
    averagePrice: 30, // за 500г
    allergens: [],
    tags: ['основа', 'минералы', 'консервант'],
  },
  {
    id: 'black-pepper',
    name: 'Перец черный молотый',
    category: 'spices',
    unit: 'г',
    nutrition: {
      calories: 251,
      protein: 10.4,
      carbs: 38.3,
      fat: 3.3,
      fiber: 26.5,
      sugar: 0.6,
    },
    glycemicIndex: 0,
    insulinIndex: 0,
    storageInfo: {
      dry: '2-3 года в сухом месте',
    },
    averagePrice: 150, // за 100г
    allergens: [],
    tags: ['специя', 'антиоксиданты', 'пищеварение'],
  },

  // === НАПИТКИ ===
  {
    id: 'coffee-beans',
    name: 'Кофе в зернах',
    category: 'beverages',
    unit: 'г',
    nutrition: {
      calories: 1, // на чашку
      protein: 0.1,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
    },
    glycemicIndex: 0,
    insulinIndex: 0,
    storageInfo: {
      beans: '1 год в сухом месте',
      ground: '2 недели в холодильнике',
    },
    averagePrice: 800, // за кг
    allergens: [],
    tags: ['энергия', 'антиоксиданты', 'утро', 'бодрость'],
  },
  {
    id: 'bombbar-isotonic',
    name: 'Bombbar изотоник',
    category: 'beverages',
    unit: 'мл',
    nutrition: {
      calories: 12, // на 100мл
      protein: 0,
      carbs: 3.0,
      fat: 0,
      fiber: 0,
      sugar: 0, // сахарозаменители
    },
    glycemicIndex: 0,
    insulinIndex: 0,
    storageInfo: {
      unopened: '1 год при комнатной температуре',
      opened: '3 дня в холодильнике',
    },
    averagePrice: 80, // за 500мл
    allergens: [],
    tags: ['изотоник', 'электролиты', 'тренировки', 'гидратация'],
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

  static getMealPrepProducts() {
    return products.filter(product => product.tags.includes('meal-prep'));
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
      oils: 'Масла',
      sweeteners: 'Сахарозаменители',
      spices: 'Специи и травы',
      beverages: 'Напитки',
    };
    return names[category] || category;
  }

  // Специальные методы для вашего меню
  static getBreakfastProducts() {
    return products.filter(product => 
      product.tags.includes('завтрак') || 
      ['cottage-cheese-0', 'cottage-cheese-5', 'oat-flour', 'eggs', 'coffee-beans'].includes(product.id)
    );
  }

  static getSoupProducts() {
    return products.filter(product => 
      ['chicken-fillet', 'carrots', 'onions', 'broccoli', 'white-beans-canned'].includes(product.id)
    );
  }

  static getSaladProducts() {
    return products.filter(product => 
      ['tuna-canned', 'cucumbers', 'tomatoes', 'onions', 'olive-oil'].includes(product.id)
    );
  }
}

export { ProductsDatabase as productsDatabase };
