// База данных продуктов для системы питания Mussasi
export const PRODUCTS_DATABASE = {
  // Белковые продукты
  chicken_breast: {
    id: 'chicken_breast',
    name: 'Куриная грудка',
    category: 'protein',
    subcategory: 'poultry',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      sugar: 0
    },
    glycemicIndex: 0,
    insulinIndex: 50,
    storageInfo: {
      shelfLife: 3, // дни в холодильнике
      freezable: true,
      freezeShelfLife: 180 // дни в морозилке
    },
    averagePrice: 450, // за кг
    season: 'year-round',
    allergens: [],
    tags: ['high-protein', 'low-carb', 'lean']
  },

  cottage_cheese_0: {
    id: 'cottage_cheese_0',
    name: 'Творог 0%',
    category: 'protein',
    subcategory: 'dairy',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 71,
      protein: 16.7,
      carbs: 1.3,
      fat: 0.1,
      fiber: 0,
      sugar: 1.3
    },
    glycemicIndex: 30,
    insulinIndex: 120,
    storageInfo: {
      shelfLife: 5,
      freezable: true,
      freezeShelfLife: 30
    },
    averagePrice: 180, // за кг
    season: 'year-round',
    allergens: ['dairy'],
    tags: ['high-protein', 'low-fat', 'probiotic']
  },

  cottage_cheese_5: {
    id: 'cottage_cheese_5',
    name: 'Творог 5%',
    category: 'protein',
    subcategory: 'dairy',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 121,
      protein: 17.2,
      carbs: 1.8,
      fat: 5,
      fiber: 0,
      sugar: 1.8
    },
    glycemicIndex: 30,
    insulinIndex: 120,
    storageInfo: {
      shelfLife: 5,
      freezable: true,
      freezeShelfLife: 30
    },
    averagePrice: 160,
    season: 'year-round',
    allergens: ['dairy'],
    tags: ['high-protein', 'creamy']
  },

  tuna_canned: {
    id: 'tuna_canned',
    name: 'Тунец в собственном соку',
    category: 'protein',
    subcategory: 'fish',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 96,
      protein: 25,
      carbs: 0,
      fat: 0.6,
      fiber: 0,
      sugar: 0
    },
    glycemicIndex: 0,
    insulinIndex: 50,
    storageInfo: {
      shelfLife: 1095, // консервы
      freezable: false,
      freezeShelfLife: 0
    },
    averagePrice: 80, // за банку 185г
    season: 'year-round',
    allergens: ['fish'],
    tags: ['high-protein', 'omega-3', 'convenient']
  },

  eggs: {
    id: 'eggs',
    name: 'Яйца куриные',
    category: 'protein',
    subcategory: 'eggs',
    unit: 'шт',
    defaultAmount: 1,
    nutrition: {
      calories: 70,
      protein: 6,
      carbs: 0.4,
      fat: 5,
      fiber: 0,
      sugar: 0.4
    },
    glycemicIndex: 0,
    insulinIndex: 31,
    storageInfo: {
      shelfLife: 28,
      freezable: false,
      freezeShelfLife: 0
    },
    averagePrice: 12, // за штуку
    season: 'year-round',
    allergens: ['eggs'],
    tags: ['complete-protein', 'versatile']
  },

  // Углеводные продукты
  oat_flakes: {
    id: 'oat_flakes',
    name: 'Овсяные хлопья',
    category: 'carbs',
    subcategory: 'grains',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 342,
      protein: 12,
      carbs: 59,
      fat: 6,
      fiber: 10,
      sugar: 1
    },
    glycemicIndex: 55,
    insulinIndex: 40,
    storageInfo: {
      shelfLife: 365,
      freezable: false,
      freezeShelfLife: 0
    },
    averagePrice: 170, // за кг
    season: 'year-round',
    allergens: ['gluten'],
    tags: ['whole-grain', 'fiber-rich', 'slow-carbs']
  },

  buckwheat: {
    id: 'buckwheat',
    name: 'Гречка',
    category: 'carbs',
    subcategory: 'grains',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 308,
      protein: 12.6,
      carbs: 57.1,
      fat: 3.3,
      fiber: 11.3,
      sugar: 0
    },
    glycemicIndex: 45,
    insulinIndex: 35,
    storageInfo: {
      shelfLife: 730,
      freezable: false,
      freezeShelfLife: 0
    },
    averagePrice: 120,
    season: 'year-round',
    allergens: [],
    tags: ['gluten-free', 'complete-protein', 'low-gi']
  },

  banana: {
    id: 'banana',
    name: 'Банан',
    category: 'carbs',
    subcategory: 'fruits',
    unit: 'шт',
    defaultAmount: 1,
    nutrition: {
      calories: 96,
      protein: 1.3,
      carbs: 23,
      fat: 0.2,
      fiber: 2.6,
      sugar: 17
    },
    glycemicIndex: 62,
    insulinIndex: 81,
    storageInfo: {
      shelfLife: 7,
      freezable: true,
      freezeShelfLife: 180
    },
    averagePrice: 25, // за штуку
    season: 'year-round',
    allergens: [],
    tags: ['quick-energy', 'potassium', 'natural-sugar']
  },

  // Овощи
  cucumber: {
    id: 'cucumber',
    name: 'Огурцы',
    category: 'vegetables',
    subcategory: 'fresh',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 14,
      protein: 0.8,
      carbs: 2.5,
      fat: 0.1,
      fiber: 1,
      sugar: 1.7
    },
    glycemicIndex: 15,
    insulinIndex: 10,
    storageInfo: {
      shelfLife: 7,
      freezable: false,
      freezeShelfLife: 0
    },
    averagePrice: 90, // за кг
    season: 'summer',
    allergens: [],
    tags: ['low-calorie', 'hydrating', 'fresh']
  },

  tomato: {
    id: 'tomato',
    name: 'Помидоры',
    category: 'vegetables',
    subcategory: 'fresh',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2,
      fiber: 1.2,
      sugar: 2.6
    },
    glycemicIndex: 15,
    insulinIndex: 10,
    storageInfo: {
      shelfLife: 7,
      freezable: false,
      freezeShelfLife: 0
    },
    averagePrice: 150,
    season: 'summer',
    allergens: [],
    tags: ['lycopene', 'antioxidant', 'fresh']
  },

  carrot: {
    id: 'carrot',
    name: 'Морковь',
    category: 'vegetables',
    subcategory: 'root',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 35,
      protein: 0.9,
      carbs: 7.2,
      fat: 0.2,
      fiber: 2.8,
      sugar: 4.7
    },
    glycemicIndex: 35,
    insulinIndex: 15,
    storageInfo: {
      shelfLife: 21,
      freezable: true,
      freezeShelfLife: 365
    },
    averagePrice: 60,
    season: 'year-round',
    allergens: [],
    tags: ['beta-carotene', 'vitamin-a', 'sweet']
  },

  onion: {
    id: 'onion',
    name: 'Лук репчатый',
    category: 'vegetables',
    subcategory: 'bulb',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 47,
      protein: 1.4,
      carbs: 8.6,
      fat: 0.2,
      fiber: 1.8,
      sugar: 4.4
    },
    glycemicIndex: 25,
    insulinIndex: 10,
    storageInfo: {
      shelfLife: 30,
      freezable: true,
      freezeShelfLife: 180
    },
    averagePrice: 45,
    season: 'year-round',
    allergens: [],
    tags: ['flavor-base', 'antioxidant', 'versatile']
  },

  broccoli: {
    id: 'broccoli',
    name: 'Брокколи',
    category: 'vegetables',
    subcategory: 'cruciferous',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 25,
      protein: 3,
      carbs: 4,
      fat: 0.4,
      fiber: 3,
      sugar: 1.5
    },
    glycemicIndex: 15,
    insulinIndex: 10,
    storageInfo: {
      shelfLife: 7,
      freezable: true,
      freezeShelfLife: 365
    },
    averagePrice: 360, // за кг
    season: 'fall',
    allergens: [],
    tags: ['superfood', 'vitamin-c', 'anti-cancer']
  },

  lettuce: {
    id: 'lettuce',
    name: 'Листья салата',
    category: 'vegetables',
    subcategory: 'leafy',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 17,
      protein: 1.4,
      carbs: 2.9,
      fat: 0.2,
      fiber: 1.3,
      sugar: 0.8
    },
    glycemicIndex: 10,
    insulinIndex: 5,
    storageInfo: {
      shelfLife: 5,
      freezable: false,
      freezeShelfLife: 0
    },
    averagePrice: 60, // за упаковку
    season: 'spring-summer',
    allergens: [],
    tags: ['low-calorie', 'fresh', 'crisp']
  },

  // Дополнительные продукты
  cheese_light: {
    id: 'cheese_light',
    name: 'Сыр легкий',
    category: 'protein',
    subcategory: 'dairy',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 173,
      protein: 24,
      carbs: 0.5,
      fat: 7,
      fiber: 0,
      sugar: 0.5
    },
    glycemicIndex: 0,
    insulinIndex: 55,
    storageInfo: {
      shelfLife: 14,
      freezable: true,
      freezeShelfLife: 90
    },
    averagePrice: 850, // за кг
    season: 'year-round',
    allergens: ['dairy'],
    tags: ['high-protein', 'calcium', 'reduced-fat']
  },

  tomato_paste: {
    id: 'tomato_paste',
    name: 'Томатная паста',
    category: 'condiments',
    subcategory: 'sauces',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 82,
      protein: 4.3,
      carbs: 16,
      fat: 0.5,
      fiber: 4.1,
      sugar: 12
    },
    glycemicIndex: 35,
    insulinIndex: 15,
    storageInfo: {
      shelfLife: 730, // консервы
      freezable: true,
      freezeShelfLife: 180
    },
    averagePrice: 90, // за банку
    season: 'year-round',
    allergens: [],
    tags: ['concentrated', 'lycopene', 'umami']
  },

  sugar_substitute: {
    id: 'sugar_substitute',
    name: 'Заменитель сахара (эритритол)',
    category: 'sweeteners',
    subcategory: 'artificial',
    unit: 'г',
    defaultAmount: 100,
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0
    },
    glycemicIndex: 0,
    insulinIndex: 0,
    storageInfo: {
      shelfLife: 1095,
      freezable: false,
      freezeShelfLife: 0
    },
    averagePrice: 200, // за упаковку
    season: 'year-round',
    allergens: [],
    tags: ['zero-calorie', 'diabetic-friendly', 'natural']
  }
};

// Утилиты для работы с базой продуктов
export const ProductsService = {
  // Получить продукт по ID
  getProduct: (productId) => {
    return PRODUCTS_DATABASE[productId] || null;
  },

  // Получить продукты по категории
  getProductsByCategory: (category) => {
    return Object.values(PRODUCTS_DATABASE).filter(
      product => product.category === category
    );
  },

  // Поиск продуктов по названию
  searchProducts: (query) => {
    const lowercaseQuery = query.toLowerCase();
    return Object.values(PRODUCTS_DATABASE).filter(
      product => product.name.toLowerCase().includes(lowercaseQuery)
    );
  },

  // Расчет КБЖУ для определенного количества продукта
  calculateNutrition: (productId, amount, unit = null) => {
    const product = PRODUCTS_DATABASE[productId];
    if (!product) return null;

    // Конвертация единиц измерения если нужно
    let multiplier = amount / product.defaultAmount;
    
    if (unit && unit !== product.unit) {
      // Здесь можно добавить конвертацию единиц
      // Например, кг в г, шт в г и т.д.
    }

    return {
      calories: Math.round(product.nutrition.calories * multiplier),
      protein: Math.round(product.nutrition.protein * multiplier * 10) / 10,
      carbs: Math.round(product.nutrition.carbs * multiplier * 10) / 10,
      fat: Math.round(product.nutrition.fat * multiplier * 10) / 10,
      fiber: Math.round(product.nutrition.fiber * multiplier * 10) / 10,
      sugar: Math.round(product.nutrition.sugar * multiplier * 10) / 10
    };
  },

  // Расчет инсулина для продукта
  calculateInsulin: (productId, amount, insulinRatio = 5) => {
    const nutrition = ProductsService.calculateNutrition(productId, amount);
    if (!nutrition) return 0;
    
    return Math.round(nutrition.carbs / insulinRatio);
  },

  // Получить все категории
  getCategories: () => {
    const categories = [...new Set(Object.values(PRODUCTS_DATABASE).map(p => p.category))];
    return categories;
  },

  // Получить продукты с аллергенами
  getProductsWithAllergens: (allergens) => {
    return Object.values(PRODUCTS_DATABASE).filter(product =>
      product.allergens.some(allergen => allergens.includes(allergen))
    );
  }
};