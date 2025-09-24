
// data/recipesDatabase.js - РЕЦЕПТЫ ДЛЯ ВАШЕГО МЕНЮ

const recipes = [
  // === ЗАВТРАКИ ===
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
    description: 'Белковый хлеб из творога и овсянки. Основа вашего завтрака на всю неделю.',
    ingredients: [
      { productId: 'cottage-cheese-0', quantity: 500, unit: 'г', name: 'Творог 0%' },
      { productId: 'oat-flour', quantity: 200, unit: 'г', name: 'Овсяная мука' },
      { productId: 'eggs', quantity: 2, unit: 'шт', name: 'Яйца куриные' },
      { productId: 'erythritol', quantity: 20, unit: 'г', name: 'Эритритол' },
      { productId: 'salt', quantity: 5, unit: 'г', name: 'Соль морская' },
    ],
    instructions: [
      { 
        text: 'Разогреваю духовку до 180°C и готовлю форму для выпечки', 
        timer: null,
        step: 1 
      },
      { 
        text: 'Смешиваю творог с яйцами до однородной массы', 
        timer: 3,
        step: 2 
      },
      { 
        text: 'Добавляю овсяную муку, эритритол и соль, тщательно перемешиваю', 
        timer: 2,
        step: 3 
      },
      { 
        text: 'Выкладываю тесто в форму, разравниваю поверхность', 
        timer: null,
        step: 4 
      },
      { 
        text: 'Выпекаю в духовке до золотистой корочки', 
        timer: 35,
        step: 5 
      },
      { 
        text: 'Остужаю хлеб и нарезаю на 10 равных кусочков', 
        timer: null,
        step: 6 
      },
    ],
    equipment: ['Духовка', 'Форма для выпечки 20x10 см', 'Миксер', 'Нож'],
    nutrition: {
      calories: 120,
      protein: 15,
      carbs: 8,
      fat: 3,
      fiber: 2,
      sugar: 2,
    },
    insulin: 2, // на порцию
    tags: ['белковый', 'meal-prep', 'завтрак', 'выпечка', 'основа'],
    allergens: ['молоко', 'яйца', 'глютен'],
    storage: '5 дней в холодильнике, 1 месяц в морозилке',
    variations: [
      'С корицей и ванилью',
      'С семенами чиа',
      'Мини-булочки вместо хлеба',
    ],
    cost: 180,
  },

  {
    id: 'protein-pudding',
    name: 'Белковый пудинг',
    category: 'breakfast',
    difficulty: 'easy',
    times: {
      prep: 5,
      cook: 0,
      total: 5,
    },
    servings: 1,
    description: 'Быстрый белковый пудинг к завтраку. Готовится за 5 минут.',
    ingredients: [
      { productId: 'cottage-cheese-0', quantity: 150, unit: 'г', name: 'Творог 0%' },
      { productId: 'erythritol', quantity: 10, unit: 'г', name: 'Эритритол' },
    ],
    instructions: [
      { 
        text: 'Выкладываю творог в миску', 
        timer: null,
        step: 1 
      },
      { 
        text: 'Добавляю эритритол и тщательно перемешиваю до однородности', 
        timer: 2,
        step: 2 
      },
      { 
        text: 'Перекладываю в красивую посуду для подачи', 
        timer: null,
        step: 3 
      },
    ],
    equipment: ['Миска', 'Ложка'],
    nutrition: {
      calories: 120,
      protein: 25,
      carbs: 2,
      fat: 0.2,
      fiber: 0,
      sugar: 2,
    },
    insulin: 0,
    tags: ['быстро', 'белковый', 'завтрак', 'диетический'],
    allergens: ['молоко'],
    storage: '1 день в холодильнике',
    variations: [
      'С ягодами',
      'С какао',
      'С ванилью',
    ],
    cost: 40,
  },

  {
    id: 'khachapuri',
    name: 'Хачапури с творогом',
    category: 'breakfast',
    difficulty: 'medium',
    times: {
      prep: 20,
      cook: 10,
      total: 30,
    },
    servings: 6,
    description: 'Грузинская лепешка с творожной начинкой на овсяной основе.',
    ingredients: [
      { productId: 'oat-flour', quantity: 150, unit: 'г', name: 'Овсяная мука' },
      { productId: 'cottage-cheese-5', quantity: 300, unit: 'г', name: 'Творог 5%' },
      { productId: 'eggs', quantity: 1, unit: 'шт', name: 'Яйца куриные' },
      { productId: 'salt', quantity: 3, unit: 'г', name: 'Соль морская' },
    ],
    instructions: [
      { 
        text: 'Смешиваю овсяную муку с солью и добавляю 100мл теплой воды', 
        timer: 5,
        step: 1 
      },
      { 
        text: 'Замешиваю эластичное тесто и даю отдохнуть', 
        timer: 10,
        step: 2 
      },
      { 
        text: 'Смешиваю творог с яйцом для начинки', 
        timer: 3,
        step: 3 
      },
      { 
        text: 'Раскатываю тесто в тонкие лепешки', 
        timer: 5,
        step: 4 
      },
      { 
        text: 'Выкладываю начинку и формирую хачапури', 
        timer: 3,
        step: 5 
      },
      { 
        text: 'Жарю на сковороде с двух сторон до золотистого цвета', 
        timer: 10,
        step: 6 
      },
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
    tags: ['выпечка', 'сытно', 'традиционное', 'белковое', 'завтрак'],
    allergens: ['молоко', 'яйца', 'глютен'],
    storage: '3 дня в холодильнике',
    variations: [
      'С зеленью',
      'Мини-хачапури',
      'В духовке',
    ],
    cost: 150,
  },

  // === СУПЫ ===
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
    description: 'Сытный суп с курицей и овощами. Основа вашего обеда.',
    ingredients: [
      { productId: 'chicken-fillet', quantity: 400, unit: 'г', name: 'Куриное филе' },
      { productId: 'carrots', quantity: 200, unit: 'г', name: 'Морковь' },
      { productId: 'onions', quantity: 150, unit: 'г', name: 'Лук репчатый' },
      { productId: 'broccoli', quantity: 200, unit: 'г', name: 'Брокколи' },
      { productId: 'white-beans-canned', quantity: 400, unit: 'г', name: 'Фасоль белая в томате' },
      { productId: 'olive-oil', quantity: 20, unit: 'мл', name: 'Масло оливковое' },
      { productId: 'salt', quantity: 8, unit: 'г', name: 'Соль морская' },
      { productId: 'black-pepper', quantity: 2, unit: 'г', name: 'Перец черный молотый' },
    ],
    instructions: [
      { 
        text: 'Нарезаю куриное филе кубиками 2x2 см', 
        timer: null,
        step: 1 
      },
      { 
        text: 'Разогреваю масло в кастрюле и обжариваю курицу до золотистого цвета', 
        timer: 8,
        step: 2 
      },
      { 
        text: 'Добавляю нарезанный лук, обжариваю до прозрачности', 
        timer: 5,
        step: 3 
      },
      { 
        text: 'Добавляю нарезанную морковь, тушу вместе', 
        timer: 5,
        step: 4 
      },
      { 
        text: 'Заливаю 1.5 литра кипятка, довожу до кипения', 
        timer: null,
        step: 5 
      },
      { 
        text: 'Варю на среднем огне под крышкой', 
        timer: 20,
        step: 6 
      },
      { 
        text: 'Добавляю брокколи и фасоль, варю до готовности', 
        timer: 7,
        step: 7 
      },
      { 
        text: 'Приправляю солью и перцем, даю настояться', 
        timer: 5,
        step: 8 
      },
    ],
    equipment: ['Кастрюля 3л', 'Нож', 'Доска разделочная', 'Половник'],
    nutrition: {
      calories: 200,
      protein: 25,
      carbs: 12,
      fat: 6,
      fiber: 4,
      sugar: 6,
    },
    insulin: 2,
    tags: ['сытный', 'горячее', 'meal-prep', 'овощи', 'обед'],
    allergens: [],
    storage: '4 дня в холодильнике, 3 месяца в морозилке',
    variations: [
      'С лапшой',
      'С картофелем',
      'Крем-суп',
    ],
    cost: 320,
  },

  // === САЛАТЫ ===
  {
    id: 'tuna-salad',
    name: 'Большой салат с тунцом',
    category: 'salads',
    difficulty: 'easy',
    times: {
      prep: 15,
      cook: 0,
      total: 15,
    },
    servings: 4,
    description: 'Легкий белковый салат с тунцом и свежими овощами. Ваш основной ужин.',
    ingredients: [
      { productId: 'tuna-canned', quantity: 370, unit: 'г', name: 'Тунец в собственном соку' }, // 2 банки
      { productId: 'cucumbers', quantity: 200, unit: 'г', name: 'Огурцы' },
      { productId: 'tomatoes', quantity: 200, unit: 'г', name: 'Помидоры' },
      { productId: 'onions', quantity: 50, unit: 'г', name: 'Лук репчатый' },
      { productId: 'olive-oil', quantity: 15, unit: 'мл', name: 'Масло оливковое' },
      { productId: 'salt', quantity: 3, unit: 'г', name: 'Соль морская' },
      { productId: 'black-pepper', quantity: 1, unit: 'г', name: 'Перец черный молотый' },
    ],
    instructions: [
      { 
        text: 'Открываю банки с тунцом и сливаю жидкость', 
        timer: null,
        step: 1 
      },
      { 
        text: 'Нарезаю огурцы кубиками 1x1 см', 
        timer: 3,
        step: 2 
      },
      { 
        text: 'Нарезаю помидоры кубиками такого же размера', 
        timer: 3,
        step: 3 
      },
      { 
        text: 'Мелко нарезаю лук полукольцами', 
        timer: 2,
        step: 4 
      },
      { 
        text: 'Смешиваю все овощи в большой миске', 
        timer: 1,
        step: 5 
      },
      { 
        text: 'Добавляю тунец, разминая его вилкой', 
        timer: 2,
        step: 6 
      },
      { 
        text: 'Заправляю оливковым маслом, солью и перцем', 
        timer: 1,
        step: 7 
      },
      { 
        text: 'Тщательно перемешиваю и даю настояться', 
        timer: 3,
        step: 8 
      },
    ],
    equipment: ['Нож', 'Доска разделочная', 'Большая миска', 'Вилка'],
    nutrition: {
      calories: 180,
      protein: 22,
      carbs: 5,
      fat: 8,
      fiber: 2,
      sugar: 4,
    },
    insulin: 1,
    tags: ['быстро', 'белковый', 'свежий', 'meal-prep', 'ужин'],
    allergens: ['рыба'],
    storage: '3 дня в холодильнике',
    variations: [
      'С авокадо',
      'С яйцом',
      'С зеленью',
    ],
    cost: 280,
  },

  // === ПЕРЕКУСЫ ===
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
    description: 'Белковая мини-пицца на творожной основе. Идеальный перекус.',
    ingredients: [
      { productId: 'cottage-cheese-0', quantity: 200, unit: 'г', name: 'Творог 0%' },
      { productId: 'oat-flour', quantity: 50, unit: 'г', name: 'Овсяная мука' },
      { productId: 'tomato-paste', quantity: 40, unit: 'г', name: 'Томатная паста' },
      { productId: 'eggs', quantity: 1, unit: 'шт', name: 'Яйца куриные' },
      { productId: 'salt', quantity: 2, unit: 'г', name: 'Соль морская' },
    ],
    instructions: [
      { 
        text: 'Разогреваю духовку до 200°C', 
        timer: null,
        step: 1 
      },
      { 
        text: 'Смешиваю творог, овсяную муку и яйцо до однородности', 
        timer: 3,
        step: 2 
      },
      { 
        text: 'Формирую 4 небольшие основы для пиццы на противне', 
        timer: 4,
        step: 3 
      },
      { 
        text: 'Смазываю каждую основу томатной пастой', 
        timer: 1,
        step: 4 
      },
      { 
        text: 'Выпекаю в духовке до золотистого цвета', 
        timer: 10,
        step: 5 
      },
      { 
        text: 'Остужаю перед подачей', 
        timer: 2,
        step: 6 
      },
    ],
    equipment: ['Духовка', 'Противень', 'Миска', 'Ложка'],
    nutrition: {
      calories: 160,
      protein: 12,
      carbs: 10,
      fat: 8,
      fiber: 2,
      sugar: 3,
    },
    insulin: 2,
    tags: ['перекус', 'быстро', 'белковое', 'детям', 'вечер'],
    allergens: ['молоко', 'яйца', 'глютен'],
    storage: '2 дня в холодильнике',
    variations: [
      'С овощами',
      'С зеленью',
      'Острая версия',
    ],
    cost: 120,
  },

  // === НАПИТКИ ===
  {
    id: 'morning-coffee',
    name: 'Утренний кофе',
    category: 'beverages',
    difficulty: 'easy',
    times: {
      prep: 2,
      cook: 3,
      total: 5,
    },
    servings: 1,
    description: 'Идеальный кофе для начала дня.',
    ingredients: [
      { productId: 'coffee-beans', quantity: 15, unit: 'г', name: 'Кофе в зернах' },
    ],
    instructions: [
      { 
        text: 'Перемалываю кофейные зерна до среднего помола', 
        timer: 1,
        step: 1 
      },
      { 
        text: 'Нагреваю воду до 92-96°C', 
        timer: 3,
        step: 2 
      },
      { 
        text: 'Завариваю кофе предпочитаемым способом', 
        timer: 4,
        step: 3 
      },
    ],
    equipment: ['Кофемолка', 'Турка или кофеварка', 'Чашка'],
    nutrition: {
      calories: 2,
      protein: 0.1,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
    },
    insulin: 0,
    tags: ['напиток', 'утро', 'энергия', 'бодрость'],
    allergens: [],
    storage: 'употреблять сразу',
    variations: [
      'Американо',
      'Эспresso',
      'С корицей',
    ],
    cost: 25,
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

  static getRecipesByMealTime(mealTime) {
    const mealTimeMap = {
      breakfast: ['breakfast', 'beverages'],
      lunch: ['soups'],
      dinner: ['salads'],
      snack: ['snacks'],
    };
    
    const categories = mealTimeMap[mealTime] || [];
    return recipes.filter(recipe => categories.includes(recipe.category));
  }

  static getUserMenuRecipes() {
    // Рецепты для конкретного меню пользователя
    return [
      'cottage-cheese-bread',
      'protein-pudding', 
      'khachapuri',
      'chicken-soup',
      'tuna-salad',
      'mini-pizza',
      'morning-coffee'
    ].map(id => this.getRecipeById(id)).filter(Boolean);
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

  static searchRecipes(query) {
    const lowercaseQuery = query.toLowerCase();
    return recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(lowercaseQuery) ||
      recipe.description.toLowerCase().includes(lowercaseQuery) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
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
      beverages: 'Напитки',
    };
    return names[category] || category;
  }
}

export { RecipesDatabase as recipesDatabase };
