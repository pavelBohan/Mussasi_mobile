import { productsDatabase } from '../data/productsDatabase';
import { recipesDatabase } from '../data/recipesDatabase';

class NutritionCalculator {
  // Константы для расчетов
  static INSULIN_RATIO = 5; // 1 единица инсулина на 5г углеводов
  static DAILY_CALORIE_TARGET = 1760;
  static DAILY_PROTEIN_TARGET = 132; // 75% от калорий
  static DAILY_CARBS_TARGET = 125; // 125г углеводов = 25 единиц инсулина
  static DAILY_FAT_TARGET = 59;

  /**
   * Расчет инсулина для блюда/продукта
   */
  static calculateInsulin(carbs) {
    return Math.round(carbs / this.INSULIN_RATIO);
  }

  /**
   * Расчет КБЖУ для рецепта
   */
  static calculateRecipeNutrition(recipe, servings = null) {
    const targetServings = servings || recipe.servings;
    const ratio = targetServings / recipe.servings;

    let totalNutrition = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
    };

    recipe.ingredients.forEach(ingredient => {
      const product = productsDatabase.getProductById(ingredient.productId);
      if (product) {
        const quantity = ingredient.quantity * ratio;
        const nutritionPer100g = product.nutrition;
        
        // Расчет пропорционально количеству
        const multiplier = quantity / 100; // если количество в граммах
        
        totalNutrition.calories += nutritionPer100g.calories * multiplier;
        totalNutrition.protein += nutritionPer100g.protein * multiplier;
        totalNutrition.carbs += nutritionPer100g.carbs * multiplier;
        totalNutrition.fat += nutritionPer100g.fat * multiplier;
        totalNutrition.fiber += nutritionPer100g.fiber * multiplier;
        totalNutrition.sugar += nutritionPer100g.sugar * multiplier;
      }
    });

    // Округляем значения
    Object.keys(totalNutrition).forEach(key => {
      totalNutrition[key] = Math.round(totalNutrition[key]);
    });

    return {
      ...totalNutrition,
      insulin: this.calculateInsulin(totalNutrition.carbs),
      servings: targetServings,
    };
  }

  /**
   * Расчет стоимости рецепта
   */
  static calculateRecipeCost(recipe, servings = null) {
    const targetServings = servings || recipe.servings;
    const ratio = targetServings / recipe.servings;

    let totalCost = 0;

    recipe.ingredients.forEach(ingredient => {
      const product = productsDatabase.getProductById(ingredient.productId);
      if (product && product.averagePrice) {
        const quantity = ingredient.quantity * ratio;
        const costPer100g = product.averagePrice / 100; // цена за грамм
        totalCost += costPer100g * quantity;
      }
    });

    return Math.round(totalCost);
  }

  /**
   * Генерация списка покупок для meal prep
   */
  static generateShoppingList(recipes, days = 3) {
    const shoppingList = {};

    recipes.forEach(recipe => {
      const multiplier = days; // готовим на несколько дней
      
      recipe.ingredients.forEach(ingredient => {
        const product = productsDatabase.getProductById(ingredient.productId);
        if (product) {
          const totalQuantity = ingredient.quantity * multiplier;
          
          if (shoppingList[product.id]) {
            shoppingList[product.id].quantity += totalQuantity;
          } else {
            shoppingList[product.id] = {
              id: product.id,
              name: product.name,
              category: product.category,
              unit: product.unit,
              quantity: totalQuantity,
              price: product.averagePrice || 0,
              checked: false,
            };
          }
        }
      });
    });

    return Object.values(shoppingList);
  }

  /**
   * Расчет дневного плана питания
   */
  static calculateDailyPlan(meals) {
    let dailyTotals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      insulin: 0,
      cost: 0,
    };

    meals.forEach(meal => {
      if (meal.recipe) {
        const nutrition = this.calculateRecipeNutrition(meal.recipe, meal.servings);
        const cost = this.calculateRecipeCost(meal.recipe, meal.servings);

        dailyTotals.calories += nutrition.calories;
        dailyTotals.protein += nutrition.protein;
        dailyTotals.carbs += nutrition.carbs;
        dailyTotals.fat += nutrition.fat;
        dailyTotals.fiber += nutrition.fiber;
        dailyTotals.sugar += nutrition.sugar;
        dailyTotals.insulin += nutrition.insulin;
        dailyTotals.cost += cost;
      }
    });

    return {
      ...dailyTotals,
      targets: {
        calories: this.DAILY_CALORIE_TARGET,
        protein: this.DAILY_PROTEIN_TARGET,
        carbs: this.DAILY_CARBS_TARGET,
        fat: this.DAILY_FAT_TARGET,
        insulin: 25, // целевое количество инсулина
      },
      percentages: {
        calories: Math.round((dailyTotals.calories / this.DAILY_CALORIE_TARGET) * 100),
        protein: Math.round((dailyTotals.protein / this.DAILY_PROTEIN_TARGET) * 100),
        carbs: Math.round((dailyTotals.carbs / this.DAILY_CARBS_TARGET) * 100),
        fat: Math.round((dailyTotals.fat / this.DAILY_FAT_TARGET) * 100),
      },
    };
  }

  /**
   * Расчет гликемической нагрузки
   */
  static calculateGlycemicLoad(recipe) {
    let totalGL = 0;

    recipe.ingredients.forEach(ingredient => {
      const product = productsDatabase.getProductById(ingredient.productId);
      if (product && product.glycemicIndex) {
        const carbsInPortion = (product.nutrition.carbs * ingredient.quantity) / 100;
        const gl = (product.glycemicIndex * carbsInPortion) / 100;
        totalGL += gl;
      }
    });

    return Math.round(totalGL);
  }

  /**
   * Рекомендации по времени приема пищи для диабетиков
   */
  static getMealTimingRecommendations(mealType, nutrition) {
    const recommendations = {
      breakfast: {
        idealTime: '06:00',
        glucoseCheckBefore: '05:00',
        glucoseCheckAfter: '07:55',
        insulinTiming: 'За 15 минут до еды',
      },
      lunch: {
        idealTime: '10:00',
        glucoseCheckBefore: '09:45',
        glucoseCheckAfter: '12:00',
        insulinTiming: 'За 15 минут до еды',
      },
      snack: {
        idealTime: '14:30',
        glucoseCheckBefore: '14:15',
        glucoseCheckAfter: '16:30',
        insulinTiming: 'За 10 минут до еды',
      },
      dinner: {
        idealTime: '16:10',
        glucoseCheckBefore: '16:00',
        glucoseCheckAfter: '18:10',
        insulinTiming: 'За 15 минут до еды',
      },
    };

    const timing = recommendations[mealType] || recommendations.snack;
    
    return {
      ...timing,
      insulin: this.calculateInsulin(nutrition.carbs),
      notes: nutrition.carbs > 30 ? 
        'Высокое содержание углеводов - контролируйте глюкозу чаще' : 
        'Умеренное содержание углеводов',
    };
  }

  /**
   * Анализ сбалансированности рациона
   */
  static analyzeBalance(dailyPlan) {
    const analysis = {
      overall: 'good',
      warnings: [],
      recommendations: [],
    };

    // Проверка калорий
    if (dailyPlan.percentages.calories < 80) {
      analysis.warnings.push('Недостаток калорий');
      analysis.recommendations.push('Добавьте перекус или увеличьте порции');
    } else if (dailyPlan.percentages.calories > 120) {
      analysis.warnings.push('Избыток калорий');
      analysis.recommendations.push('Уменьшите порции или замените высококалорийные продукты');
    }

    // Проверка белков
    if (dailyPlan.percentages.protein < 70) {
      analysis.warnings.push('Недостаток белка');
      analysis.recommendations.push('Добавьте белковые продукты: творог, курицу, рыбу');
    }

    // Проверка углеводов
    if (dailyPlan.insulin > 30) {
      analysis.warnings.push('Высокая инсулиновая нагрузка');
      analysis.recommendations.push('Замените быстрые углеводы на медленные');
    }

    // Общая оценка
    if (analysis.warnings.length === 0) {
      analysis.overall = 'excellent';
    } else if (analysis.warnings.length <= 2) {
      analysis.overall = 'good';
    } else {
      analysis.overall = 'needs_improvement';
    }

    return analysis;
  }

  /**
   * Генерация meal prep плана
   */
  static generateMealPrepPlan(targetDays = 3) {
    const mealPrepRecipes = [
      'cottage-cheese-bread',
      'chicken-soup',
      'tuna-salad',
      'khachapuri',
      'mini-pizza',
    ];

    const plan = {
      cookingTime: 120, // 2 часа
      recipes: [],
      totalCost: 0,
      containers: 10,
      shoppingList: [],
    };

    mealPrepRecipes.forEach(recipeId => {
      const recipe = recipesDatabase.getRecipeById(recipeId);
      if (recipe) {
        const servingsNeeded = targetDays * 2; // по 2 порции в день
        const nutrition = this.calculateRecipeNutrition(recipe, servingsNeeded);
        const cost = this.calculateRecipeCost(recipe, servingsNeeded);

        plan.recipes.push({
          ...recipe,
          servingsNeeded,
          nutrition,
          cost,
        });

        plan.totalCost += cost;
      }
    });

    plan.shoppingList = this.generateShoppingList(plan.recipes.map(r => r), targetDays);

    return plan;
  }
}

export default NutritionCalculator;
