import { ProductsService } from './productsDatabase';

// База данных рецептов для системы питания Mussasi
export const RECIPES_DATABASE = {
  // Салаты
  tuna_salad: {
    id: 'tuna_salad',
    name: 'Салат с тунцом',
    category: 'salads',
    difficulty: 'easy',
    prepTime: 15, // минуты
    cookTime: 0,
    totalTime: 15,
    servings: 1,
    description: 'Легкий и питательный салат с высоким содержанием белка',
    
    ingredients: [
      { productId: 'tuna_canned', amount: 185, unit: 'г', note: '1 банка' },
      { productId: 'cucumber', amount: 200, unit: 'г', note: '2 средних огурца' },
      { productId: 'tomato', amount: 200, unit: 'г', note: '2 средних помидора' },
      { productId: 'lettuce', amount: 100, unit: 'г', note: '1 упаковка' }
    ],

    instructions: [
      {
        step: 1,
        title: 'Подготовка овощей',
        description: 'Огурцы нарезать кубиками, помидоры - дольками, салат порвать руками',
        time: 8,
        equipment: ['нож', 'разделочная доска'],
        tips: ['Огурцы можно не чистить', 'Помидоры лучше брать плотные']
      },
      {
        step: 2,
        title: 'Подготовка тунца',
        description: 'Слить жидкость с тунца, размять вилкой на крупные кусочки',
        time: 3,
        equipment: ['вилка', 'миска'],
        tips: ['Не размельчать слишком мелко']
      },
      {
        step: 3,
        title: 'Сборка салата',
        description: 'Смешать все ингредиенты в большой миске, аккуратно перемешать',
        time: 4,
        equipment: ['большая миска'],
        tips: ['Можно добавить немного лимонного сока']
      }
    ],

    nutrition: {
      calories: 240,
      protein: 20,
      carbs: 8,
      fat: 12,
      fiber: 4,
      sugar: 6
    },

    insulin: 2,
    glycemicLoad: 3,
    
    tags: ['high-protein', 'low-carb', 'quick', 'no-cook', 'diabetic-friendly'],
    allergens: ['fish'],
    
    storage: {
      refrigerator: 2, // дни
      freezer: 0, // не замораживается
      tips: ['Лучше съесть сразу', 'Можно хранить без заправки']
    },

    variations: [
      {
        name: 'С авокадо',
        changes: [{ productId: 'avocado', amount: 100, unit: 'г' }],
        nutritionDelta: { calories: +160, fat: +15 }
      }
    ],

    cost: {
      estimated: 180, // рублей за порцию
      breakdown: [
        { productId: 'tuna_canned', cost: 80 },
        { productId: 'cucumber', cost: 36 },
        { productId: 'tomato', cost: 60 },
        { productId: 'lettuce', cost: 30 }
      ]
    }
  },

  // Выпечка
  protein_bread: {
    id: 'protein_bread',
    name: 'Творожный хлеб',
    category: 'baking',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 45,
    totalTime: 60,
    servings: 10,
    description: 'Высокобелковый хлеб без муки на основе творога',

    ingredients: [
      { productId: 'cottage_cheese_0', amount: 500, unit: 'г', note: 'комнатной температуры' },
      { productId: 'oat_flakes', amount: 200, unit: 'г', note: 'измельчить в муку' },
      { productId: 'eggs', amount: 3, unit: 'шт', note: 'крупные' },
      { productId: 'sugar_substitute', amount: 20, unit: 'г', note: 'по вкусу' }
    ],

    equipment: [
      { name: 'Блендер или кофемолка', required: true, alternative: 'Можно купить овсяную муку' },
      { name: 'Форма для выпечки', required: true, size: '20x10 см' },
      { name: 'Духовка', required: true, temp: '180°C' },
      { name: 'Миксер', required: false, alternative: 'Венчик' }
    ],

    instructions: [
      {
        step: 1,
        title: 'Подготовка ингредиентов',
        description: 'Измельчить овсяные хлопья в муку, достать творог из холодильника',
        time: 10,
        equipment: ['блендер'],
        tips: ['Творог должен быть комнатной температуры', 'Овсяную муку можно просеять']
      },
      {
        step: 2,
        title: 'Смешивание теста',
        description: 'Смешать творог с яйцами, добавить овсяную муку и заменитель сахара',
        time: 8,
        equipment: ['миска', 'венчик'],
        tips: ['Тесто должно быть однородным', 'Не перемешивать слишком долго']
      },
      {
        step: 3,
        title: 'Подготовка формы',
        description: 'Смазать форму или застелить пергаментом',
        time: 2,
        equipment: ['форма для выпечки', 'пергамент'],
        tips: ['Можно использовать силиконовую форму без смазки']
      },
      {
        step: 4,
        title: 'Выпекание',
        description: 'Выпекать при 180°C 45 минут до золотистой корочки',
        time: 45,
        equipment: ['духовка'],
        tips: ['Проверить готовность зубочисткой', 'Не открывать духовку первые 30 минут'],
        timer: {
          name: 'Выпекание творожного хлеба',
          duration: 45,
          alerts: [
            { time: 30, message: 'Проверить цвет корочки' },
            { time: 40, message: 'Подготовить зубочистку для проверки' }
          ]
        }
      },
      {
        step: 5,
        title: 'Охлаждение',
        description: 'Остудить в форме 10 минут, затем переложить на решетку',
        time: 15,
        equipment: ['решетка для охлаждения'],
        tips: ['Не вынимать горячим', 'Полностью остудить перед нарезкой']
      }
    ],

    nutrition: {
      calories: 120, // на кусок
      protein: 15,
      carbs: 8,
      fat: 3,
      fiber: 2,
      sugar: 1
    },

    insulin: 2, // на кусок
    glycemicLoad: 4,

    tags: ['high-protein', 'gluten-free', 'meal-prep', 'diabetic-friendly', 'homemade'],
    allergens: ['dairy', 'eggs'],

    storage: {
      refrigerator: 5,
      freezer: 30,
      tips: ['Нарезать и заморозить порциями', 'Размораживать при комнатной температуре']
    },

    variations: [
      {
        name: 'С зеленью',
        changes: [{ productId: 'herbs', amount: 30, unit: 'г' }],
        nutritionDelta: { calories: +5 }
      },
      {
        name: 'Сладкий вариант',
        changes: [{ productId: 'sugar_substitute', amount: 40, unit: 'г' }],
        nutritionDelta: { calories: 0 }
      }
    ],

    cost: {
      estimated: 25, // за кусок
      breakdown: [
        { productId: 'cottage_cheese_0', cost: 90 },
        { productId: 'oat_flakes', cost: 34 },
        { productId: 'eggs', cost: 36 },
        { productId: 'sugar_substitute', cost: 8 }
      ]
    }
  },

  khachapuri: {
    id: 'khachapuri',
    name: 'Хачапури из творожного теста',
    category: 'baking',
    difficulty: 'medium',
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 6,
    description: 'Грузинские лепешки с сыром из полезного творожного теста',

    ingredients: [
      { productId: 'cottage_cheese_5', amount: 300, unit: 'г', note: 'для теста' },
      { productId: 'oat_flakes', amount: 100, unit: 'г', note: 'измельчить в муку' },
      { productId: 'eggs', amount: 2, unit: 'шт', note: '1 в тесто, 1 для смазки' },
      { productId: 'cheese_light', amount: 200, unit: 'г', note: 'для начинки, тертый' }
    ],

    equipment: [
      { name: 'Блендер', required: true, alternative: 'Овсяная мука' },
      { name: 'Противень', required: true, size: 'стандартный' },
      { name: 'Духовка', required: true, temp: '200°C' }
    ],

    instructions: [
      {
        step: 1,
        title: 'Приготовление теста',
        description: 'Смешать творог, овсяную муку и 1 яйцо до однородности',
        time: 8,
        equipment: ['миска', 'венчик'],
        tips: ['Тесто должно быть эластичным', 'При необходимости добавить немного муки']
      },
      {
        step: 2,
        title: 'Формирование лепешек',
        description: 'Разделить тесто на 6 частей, раскатать в лепешки',
        time: 10,
        equipment: ['скалка', 'рабочая поверхность'],
        tips: ['Лепешки должны быть тонкими', 'Присыпать мукой при раскатывании']
      },
      {
        step: 3,
        title: 'Добавление начинки',
        description: 'На половину каждой лепешки выложить тертый сыр, накрыть второй половиной',
        time: 5,
        equipment: [],
        tips: ['Не переборщить с начинкой', 'Хорошо защипать края']
      },
      {
        step: 4,
        title: 'Выпекание',
        description: 'Смазать взбитым яйцом, выпекать 20-25 минут до золотистого цвета',
        time: 25,
        equipment: ['противень', 'кисточка'],
        tips: ['Следить за цветом', 'Не пересушить'],
        timer: {
          name: 'Выпекание хачапури',
          duration: 25,
          alerts: [
            { time: 15, message: 'Проверить цвет' },
            { time: 20, message: 'Почти готово' }
          ]
        }
      }
    ],

    nutrition: {
      calories: 180,
      protein: 12,
      carbs: 15,
      fat: 8,
      fiber: 2,
      sugar: 2
    },

    insulin: 3,
    glycemicLoad: 6,

    tags: ['traditional', 'cheese', 'comfort-food', 'meal-prep'],
    allergens: ['dairy', 'eggs'],

    storage: {
      refrigerator: 3,
      freezer: 14,
      tips: ['Разогревать в духовке', 'Можно заморозить после выпечки']
    },

    cost: {
      estimated: 45,
      breakdown: [
        { productId: 'cottage_cheese_5', cost: 48 },
        { productId: 'oat_flakes', cost: 17 },
        { productId: 'eggs', cost: 24 },
        { productId: 'cheese_light', cost: 170 }
      ]
    }
  }
};

// Сервис для работы с рецептами
export const RecipesService = {
  // Получить рецепт по ID
  getRecipe: (recipeId) => {
    return RECIPES_DATABASE[recipeId] || null;
  },

  // Получить рецепты по категории
  getRecipesByCategory: (category) => {
    return Object.values(RECIPES_DATABASE).filter(
      recipe => recipe.category === category
    );
  },

  // Поиск рецептов
  searchRecipes: (query) => {
    const lowercaseQuery = query.toLowerCase();
    return Object.values(RECIPES_DATABASE).filter(recipe =>
      recipe.name.toLowerCase().includes(lowercaseQuery) ||
      recipe.description.toLowerCase().includes(lowercaseQuery) ||
      recipe.tags.some(tag => tag.includes(lowercaseQuery))
    );
  },

  // Расчет КБЖУ рецепта на указанное количество порций
  calculateRecipeNutrition: (recipeId, servings = 1) => {
    const recipe = RECIPES_DATABASE[recipeId];
    if (!recipe) return null;

    const multiplier = servings / recipe.servings;
    
    return {
      calories: Math.round(recipe.nutrition.calories * multiplier),
      protein: Math.round(recipe.nutrition.protein * multiplier * 10) / 10,
      carbs: Math.round(recipe.nutrition.carbs * multiplier * 10) / 10,
      fat: Math.round(recipe.nutrition.fat * multiplier * 10) / 10,
      fiber: Math.round(recipe.nutrition.fiber * multiplier * 10) / 10,
      sugar: Math.round(recipe.nutrition.sugar * multiplier * 10) / 10
    };
  },

  // Расчет стоимости рецепта
  calculateRecipeCost: (recipeId, servings = 1) => {
    const recipe = RECIPES_DATABASE[recipeId];
    if (!recipe || !recipe.cost) return null;

    const multiplier = servings / recipe.servings;
    return Math.round(recipe.cost.estimated * multiplier);
  },

  // Получить список покупок для рецепта
  getShoppingList: (recipeId, servings = 1) => {
    const recipe = RECIPES_DATABASE[recipeId];
    if (!recipe) return [];

    const multiplier = servings / recipe.servings;

    return recipe.ingredients.map(ingredient => {
      const product = ProductsService.getProduct(ingredient.productId);
      return {
        productId: ingredient.productId,
        productName: product?.name || 'Неизвестный продукт',
        amount: Math.round(ingredient.amount * multiplier * 10) / 10,
        unit: ingredient.unit,
        note: ingredient.note,
        estimatedPrice: product?.averagePrice || 0
      };
    });
  },

  // Получить рецепты по тегам
  getRecipesByTags: (tags) => {
    return Object.values(RECIPES_DATABASE).filter(recipe =>
      tags.some(tag => recipe.tags.includes(tag))
    );
  },

  // Получить рецепты по времени приготовления
  getRecipesByTime: (maxTime) => {
    return Object.values(RECIPES_DATABASE).filter(
      recipe => recipe.totalTime <= maxTime
    );
  },

  // Получить рецепты без аллергенов
  getRecipesWithoutAllergens: (allergens) => {
    return Object.values(RECIPES_DATABASE).filter(recipe =>
      !recipe.allergens.some(allergen => allergens.includes(allergen))
    );
  },

  // Получить все категории рецептов
  getCategories: () => {
    const categories = [...new Set(Object.values(RECIPES_DATABASE).map(r => r.category))];
    return categories;
  }
};