
// data/recipesDatabase.js - РАСШИРЕННАЯ ВЕРСИЯ

const recipes = [
  // ЗАВТРАКИ
  {
    id: 'cottage-cheese-bread',
    name: 'Творожный хлеб',
    category: 'breakfast',
    difficulty: 'easy',
    times: {
      prep: 10,
      cook: 35,
      total: 45,
    },
    servings: 10,
    description: 'Белковый хлеб из творога и овсянки. Идеален для meal prep - можно заморозить и размораживать по кусочку.',
    ingredients: [
      { productId: 'cottage-cheese-0', quantity: 500, unit: 'г' },
      { productId: 'oat-flour', quantity: 200, unit: 'г' },
      { productId: 'eggs', quantity: 2, unit: 'шт' },
    ],
    instructions: [
      { text: 'Разогреть духовку до 180°C', timer: null },
      { text: 'Смешать творог с яйцами до однородности', timer: 3 },
      { text: 'Добавить овсяную муку, перемешать', timer: 2 },
      { text: 'Выложить в форму, выпекать', timer: 35 },
      { text: 'Остудить, нарезать на 10 кусочков', timer: null },
    ],
    equipment: ['Духовка', 'Форма для выпечки', 'Миксер'],
    nutrition: {
      calories: 120,
      protein: 15,
      carbs: 8,
      fat: 3,
      fiber: 2,
      sugar: 2,
    },
    insulin: 2, // на порцию
    tags: ['белковый', 'meal-prep', 'завтрак', 'выпечка'],
    allergens: ['молоко', 'яйца', 'глютен'],
    storage: '5 дней в холодильнике, 1 месяц в морозилке',
    variations: [
      'С добавлением корицы',
      'С семенами чиа',
      'Мини-булочки вместо хлеба',
    ],
    cost: 180, // на весь рецепт
  },
  {
    id: 'protein-omelet',
    name: 'Белковый омлет с овощами',
    category: 'breakfast',
    difficulty: 'easy',
    times: {
      prep: 5,
      cook: 10,
      total: 15,
    },
    servings: 2,
    description: 'Пышный омлет с брокколи и шпинатом. Быстрый и сытный завтрак.',
    ingredients: [
      { productId: 'eggs', quantity: 4, unit: 'шт' },
      { productId: 'broccoli', quantity: 100, unit: 'г' },
      { productId: 'spinach', quantity: 50, unit: 'г' },
    ],
    instructions: [
      { text: 'Отварить брокколи до мягкости', timer: 5 },
      { text: 'Взбить яйца с солью и перцем', timer: 2 },
      { text: 'Обжарить шпинат на сковороде', timer: 1 },
      { text: 'Добавить яйца, готовить под крышкой', timer: 5 },
      { text: 'Добавить брокколи, довести до готовности', timer: 2 },
    ],
    equipment: ['Сковорода', 'Венчик', 'Кастрюля'],
    nutrition: {
      calories: 190,
      protein: 16,
      carbs: 6,
      fat: 12,
      fiber: 3,
      sugar: 2,
    },
    insulin: 1,
    tags: ['быстро', 'белковый', 'овощи', 'завтрак'],
    allergens: ['яйца'],
    storage: '2 дня в холодильнике',
    variations: [
      'С помидорами черри',
      'С сыром',
      'С грибами',
    ],
    cost: 80,
  },

  // СУПЫ
  {
    id: 'chicken-soup',
    name: 'Куриный суп с овощами',
    category: 'soups',
    difficulty: 'medium',
    times: {
      prep: 15,
      cook: 45,
      total: 60,
    },
    servings: 6,
    description: 'Сытный суп с курицей и овощами. Отлично подходит для meal prep.',
    ingredients: [
      { productId: 'chicken-fillet', quantity: 400, unit: 'г' },
      { productId: 'carrots', quantity: 200, unit: 'г' },
      { productId: 'onions', quantity: 150, unit: 'г' },
      { productId: 'broccoli', quantity: 200, unit: 'г' },
    ],
    instructions: [
      { text: 'Нарезать курицу кубиками, обжарить', timer: 8 },
      { text: 'Добавить нарезанный лук, обжарить', timer: 5 },
      { text: 'Добавить морковь, тушить', timer: 5 },
      { text: 'Залить водой, варить', timer: 20 },
      { text: 'Добавить брокколи, варить до готовности', timer: 7 },
    ],
    equipment: ['Кастрюля', 'Нож', 'Доска'],
    nutrition: {
      calories: 200,
      protein: 25,
      carbs: 12,
      fat: 6,
      fiber: 4,
      sugar: 6,
    },
    insulin: 2,
    tags: ['сытный', 'горячее', 'meal-prep', 'овощи'],
    allergens: [],
    storage: '4 дня в холодильнике, 3 месяца в морозилке',
    variations: [
      'С лапшой',
      'С картофелем',
      'Крем-суп',
    ],
    cost: 320,
  },

  // ОСНОВНЫЕ БЛЮДА
  {
    id: 'grilled-chicken',
    name: 'Куриная грудка гриль',
    category: 'main',
    difficulty: 'medium',
    times: {
      prep: 10,
      cook: 15,
      total: 25,
    },
    servings: 4,
    description: 'Сочная куриная грудка с травами. Базовое блюдо для meal prep.',
    ingredients: [
      { productId: 'chicken-fillet', quantity: 600, unit: 'г' },
    ],
    instructions: [
      { text: 'Отбить филе, посолить и поперчить', timer: 5 },
      { text: 'Разогреть сковороду-гриль', timer: 3 },
      { text: 'Обжарить с одной стороны', timer: 6 },
      { text: 'Перевернуть, жарить до готовности', timer: 6 },
      { text: 'Дать отдохнуть перед нарезкой', timer: 5 },
    ],
    equipment: ['Сковорода-гриль', 'Молоток для отбивания'],
    nutrition: {
      calories: 220,
      protein: 35,
      carbs: 2,
      fat: 8,
      fiber: 0,
      sugar: 0,
    },
    insulin: 0,
    tags: ['гриль', 'белковое', 'meal-prep', 'диетическое'],
    allergens: [],
    storage: '4 дня в холодильнике, 3 месяца в морозилке',
    variations: [
      'В маринаде',
      'С лимоном и травами',
      'В духовке',
    ],
    cost: 210,
  },

  // САЛАТЫ
  {
    id: 'tuna-salad',
    name: 'Салат с тунцом',
    category: 'salads',
    difficulty: 'easy',
    times: {
      prep: 15,
      cook: 0,
      total: 15,
    },
    servings: 4,
    description: 'Легкий белковый салат с тунцом и свежими овощами.',
    ingredients: [
      { productId: 'tuna-canned', quantity: 370, unit: 'г' }, // 2 банки
      { productId: 'cucumbers', quantity: 200, unit: 'г' },
      { productId: 'tomatoes', quantity: 200, unit: 'г' },
      { productId: 'onions', quantity: 50, unit: 'г' },
    ],
    instructions: [
      { text: 'Слить жидкость с тунца', timer: null },
      { text: 'Нарезать огурцы кубиками', timer: 3 },
      { text: 'Нарезать помидоры кубиками', timer: 3 },
      { text: 'Мелко нарезать лук', timer: 2 },
      { text: 'Смешать все ингредиенты', timer: 2 },
    ],
    equipment: ['Нож', 'Доска', 'Миска'],
    nutrition: {
      calories: 180,
      protein: 22,
      carbs: 5,
      fat: 8,
      fiber: 2,
      sugar: 4,
    },
    insulin: 1,
    tags: ['быстро', 'белковый', 'свежий', 'meal-prep'],
    allergens: ['рыба'],
    storage: '3 дня в холодильнике',
    variations: [
      'С авокадо',
      'С яйцом',
      'С зеленью',
    ],
    cost: 280,
  },

  // ВЫПЕЧКА
  {
    id: 'khachapuri',
    name: 'Хачапури с творогом',
    category: 'baking',
    difficulty: 'medium',
    times: {
      prep: 20,
      cook: 10,
      total: 30,
    },
    servings: 6,
    description: 'Грузинская лепешка с творожной начинкой на овсяной основе.',
    ingredients: [
      { productId: 'oat-flour', quantity: 150, unit: 'г' },
      { productId: 'cottage-cheese-5', quantity: 300, unit: 'г' },
      { productId: 'eggs', quantity: 1, unit: 'шт' },
    ],
    instructions: [
      { text: 'Смешать муку с водой до теста', timer: 5 },
      { text: 'Смешать творог с яйцом', timer: 3 },
      { text: 'Раскатать тесто, добавить начинку', timer: 8 },
      { text: 'Сформировать лепешки', timer: 4 },
      { text: 'Жарить на сковороде с двух сторон', timer: 10 },
    ],
    equipment: ['Сковорода', 'Скалка', 'Миска'],
    nutrition: {
      calories: 250,
      protein: 18,
      carbs: 20,
      fat: 12,
      fiber: 3,
      sugar: 3,
    },
    insulin: 4,
    tags: ['выпечка', 'сытно', 'традиционное', 'белковое'],
    allergens: ['молоко', 'яйца', 'глютен'],
    storage: '3 дня в холодильнике',
    variations: [
      'С зеленью',
      'Мини-хачапури',
      'В духовке',
    ],
    cost: 150,
  },

  // ПЕРЕКУСЫ
  {
    id: 'mini-pizza',
    name: 'Мини-пицца белковая',
    category: 'snacks',
    difficulty: 'easy',
    times: {
      prep: 10,
      cook: 10,
      total: 20,
    },
    servings: 4,
    description: 'Белковая мини-пицца на творожной основе.',
    ingredients: [
      { productId: 'cottage-cheese-0', quantity: 200, unit: 'г' },
      { productId: 'oat-flour', quantity: 50, unit: 'г' },
      { productId: 'tomato-paste', quantity: 40, unit: 'г' },
      { productId: 'eggs', quantity: 1, unit: 'шт' },
    ],
    instructions: [
      { text: 'Смешать творог, муку и яйцо', timer: 3 },
      { text: 'Сформировать основы для пиццы', timer: 4 },
      { text: 'Смазать томатной пастой', timer: 1 },
      { text: 'Выпекать в духовке при 200°C', timer: 10 },
      { text: 'Остудить перед подачей', timer: 2 },
    ],
    equipment: ['Духовка', 'Противень', 'Миска'],
    nutrition: {
      calories: 160,
      protein: 12,
      carbs: 10,
      fat: 8,
      fiber: 2,
      sugar: 3,
    },
    insulin: 2,
    tags: ['перекус', 'быстро', 'белковое', 'детям'],
    allergens: ['молоко', 'яйца', 'глютен'],
    storage: '2 дня в холодильнике',
    variations: [
      'С овощами',
      'С зеленью',
      'Острая версия',
    ],
    cost: 120,
  },
];

class RecipesDatabase {
  static getAllRecipes() {
    return recipes;
  }

  static getRecipeById(id) {
    return recipes.find(recipe => recipe.id === id);
  }

  static getRecipesByCategory(category) {
    return recipes.filter(recipe => recipe.category === category);
  }

  static getRecipesByDifficulty(difficulty) {
    return recipes.filter(recipe => recipe.difficulty === difficulty);
  }

  static getRecipesByTags(tags) {
    return recipes.filter(recipe =>
      tags.some(tag => recipe.tags.includes(tag))
    );
  }

  static searchRecipes(query) {
    const lowercaseQuery = query.toLowerCase();
    return recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(lowercaseQuery) ||
      recipe.description.toLowerCase().includes(lowercaseQuery) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  static getRecipesByTime(maxTime) {
    return recipes.filter(recipe => recipe.times.total <= maxTime);
  }

  static getRecipesByCalories(minCal, maxCal) {
    return recipes.filter(recipe =>
      recipe.nutrition.calories >= minCal &&
      recipe.nutrition.calories <= maxCal
    );
  }

  static getCategories() {
    const categories = [...new Set(recipes.map(recipe => recipe.category))];
    return categories.map(category => ({
      id: category,
      name: this.getCategoryName(category),
      count: recipes.filter(r => r.category === category).length,
    }));
  }

  static getCategoryName(category) {
    const names = {
      breakfast: 'Завтраки',
      soups: 'Супы',
      main: 'Основные блюда',
      salads: 'Салаты',
      snacks: 'Перекусы',
      baking: 'Выпечка',
    };
    return names[category] || category;
  }

  static getMealPrepRecipes() {
    return recipes.filter(recipe => recipe.tags.includes('meal-prep'));
  }

  static getQuickRecipes(maxTime = 20) {
    return recipes.filter(recipe => recipe.times.total <= maxTime);
  }

  static getHighProteinRecipes(minProtein = 15) {
    return recipes.filter(recipe => recipe.nutrition.protein >= minProtein);
  }
}

export { RecipesDatabase as recipesDatabase };