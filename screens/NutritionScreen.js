import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import { COLORS } from '../constants/colors';
import { useNutrition } from '../context/NutritionContext';

const NutritionScreen = () => {
  const { dailyStats } = useNutrition();
  const [activeTab, setActiveTab] = useState('meals');
  const [selectedDay, setSelectedDay] = useState('today');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedList, setExpandedList] = useState(null);

  // Данные приемов пищи на день
  const DAILY_MEALS = {
    breakfast: {
      time: '06:00',
      name: 'Завтрак',
      emoji: '🌅',
      dishes: [
        { name: 'Кофе', amount: '1 чашка', calories: 5, protein: 0, carbs: 1, fat: 0 },
        { name: 'Хачапури', amount: '1 шт', calories: 180, protein: 12, carbs: 15, fat: 8 },
        { name: 'Протеиновый пудинг', amount: '150 г', calories: 295, protein: 25, carbs: 14, fat: 12 }
      ],
      totalCalories: 480,
      totalProtein: 37,
      totalCarbs: 30,
      totalFat: 20,
      insulin: 6
    },
    lunch: {
      time: '10:00',
      name: 'Обед',
      emoji: '🍽️',
      dishes: [
        { name: 'Куриный суп', amount: '1 порция', calories: 200, protein: 20, carbs: 12, fat: 6 },
        { name: 'Комплексный гарнир', amount: '1 порция', calories: 600, protein: 35, carbs: 45, fat: 18 }
      ],
      totalCalories: 800,
      totalProtein: 55,
      totalCarbs: 57,
      totalFat: 24,
      insulin: 11
    },
    snack1: {
      time: '14:30',
      name: 'Перекус',
      emoji: '🍌',
      dishes: [
        { name: 'Банан', amount: '1 шт', calories: 90, protein: 1, carbs: 23, fat: 0 },
        { name: 'Протеиновый батончик', amount: '1 шт', calories: 70, protein: 8, carbs: 5, fat: 2 }
      ],
      totalCalories: 160,
      totalProtein: 9,
      totalCarbs: 28,
      totalFat: 2,
      insulin: 4
    },
    dinner: {
      time: '16:10',
      name: 'Ужин',
      emoji: '🥗',
      dishes: [
        { name: 'Большой салат с тунцом', amount: '1 порция', calories: 240, protein: 20, carbs: 8, fat: 12 }
      ],
      totalCalories: 240,
      totalProtein: 20,
      totalCarbs: 8,
      totalFat: 12,
      insulin: 2
    },
    snack2: {
      time: '18:30',
      name: 'Перекус',
      emoji: '🍕',
      dishes: [
        { name: 'Мини-пицца', amount: '1 шт', calories: 80, protein: 6, carbs: 8, fat: 3 }
      ],
      totalCalories: 80,
      totalProtein: 6,
      totalCarbs: 8,
      totalFat: 3,
      insulin: 2
    }
  };

  // Категории рецептов
  const RECIPE_CATEGORIES = [
    { id: 'salads', name: 'Салаты', emoji: '🥗', count: 3 },
    { id: 'complex', name: 'Комплексные обеды', emoji: '🍽️', count: 4 },
    { id: 'breakfast', name: 'Завтраки', emoji: '🌅', count: 5 },
    { id: 'baking', name: 'Выпечка', emoji: '🧁', count: 8 },
    { id: 'snacks', name: 'Перекусы', emoji: '🥨', count: 6 },
    { id: 'soups', name: 'Супы', emoji: '🍲', count: 2 }
  ];

  // Рецепты по категориям
  const RECIPES_BY_CATEGORY = {
    salads: [
      {
        id: 'tuna_salad',
        name: 'Салат с тунцом',
        time: 15,
        calories: 240,
        protein: 20,
        carbs: 8,
        fat: 12,
        insulin: 2,
        ingredients: ['Тунец в с/с 200г', 'Огурцы 2 шт', 'Помидоры 2 шт', 'Листья салата 100г']
      },
      {
        id: 'chicken_salad',
        name: 'Куриный салат',
        time: 20,
        calories: 280,
        protein: 25,
        carbs: 10,
        fat: 15,
        insulin: 2,
        ingredients: ['Куриная грудка 150г', 'Огурцы 1 шт', 'Помидоры 1 шт', 'Сыр легкий 50г']
      },
      {
        id: 'greek_salad',
        name: 'Греческий салат',
        time: 10,
        calories: 200,
        protein: 8,
        carbs: 12,
        fat: 14,
        insulin: 2,
        ingredients: ['Огурцы 2 шт', 'Помидоры 2 шт', 'Сыр фета 100г', 'Оливки 50г']
      }
    ],
    baking: [
      {
        id: 'protein_bread',
        name: 'Творожный хлеб',
        time: 45,
        calories: 120,
        protein: 15,
        carbs: 8,
        fat: 3,
        insulin: 2,
        ingredients: ['Творог 0% 500г', 'Овсяная мука 200г', 'Яйца 3 шт', 'Заменитель сахара 20г']
      },
      {
        id: 'khachapuri',
        name: 'Хачапури',
        time: 30,
        calories: 180,
        protein: 12,
        carbs: 15,
        fat: 8,
        insulin: 3,
        ingredients: ['Творог 5% 300г', 'Овсяная мука 100г', 'Яйца 2 шт', 'Сыр легкий 100г']
      },
      {
        id: 'mini_pizza',
        name: 'Мини-пицца',
        time: 25,
        calories: 80,
        protein: 6,
        carbs: 8,
        fat: 3,
        insulin: 2,
        ingredients: ['Творожное тесто 200г', 'Томатная паста 50г', 'Сыр легкий 100г']
      },
      {
        id: 'protein_muffins',
        name: 'Протеиновые маффины',
        time: 35,
        calories: 95,
        protein: 10,
        carbs: 6,
        fat: 4,
        insulin: 1,
        ingredients: ['Творог 0% 200г', 'Овсяные хлопья 100г', 'Яйца 2 шт', 'Банан 1 шт']
      },
      {
        id: 'cottage_pancakes',
        name: 'Творожные оладьи',
        time: 20,
        calories: 110,
        protein: 12,
        carbs: 9,
        fat: 4,
        insulin: 2,
        ingredients: ['Творог 5% 250г', 'Овсяная мука 80г', 'Яйца 2 шт', 'Заменитель сахара 15г']
      },
      {
        id: 'protein_cookies',
        name: 'Протеиновое печенье',
        time: 30,
        calories: 75,
        protein: 8,
        carbs: 7,
        fat: 2,
        insulin: 1,
        ingredients: ['Творог 0% 150г', 'Овсяные хлопья 120г', 'Заменитель сахара 25г', 'Корица 5г']
      },
      {
        id: 'cheese_casserole',
        name: 'Творожная запеканка',
        time: 40,
        calories: 130,
        protein: 14,
        carbs: 10,
        fat: 5,
        insulin: 2,
        ingredients: ['Творог 5% 400г', 'Яйца 3 шт', 'Овсяные хлопья 100г', 'Банан 1 шт']
      },
      {
        id: 'protein_rolls',
        name: 'Белковые роллы',
        time: 25,
        calories: 85,
        protein: 9,
        carbs: 6,
        fat: 3,
        insulin: 1,
        ingredients: ['Творог 0% 200г', 'Яйца 2 шт', 'Овсяная мука 60г', 'Зелень 30г']
      }
    ]
  };

  // Продуктовые корзины
  const SHOPPING_LISTS = [
    {
      id: 1,
      name: 'Понедельник - готовка',
      date: '16 сентября',
      totalPrice: 2500,
      itemsCount: 15,
      items: [
        { name: 'Куриное филе', amount: '800 г', price: 450 },
        { name: 'Творог 0%', amount: '1 кг', price: 180 },
        { name: 'Овсяные хлопья', amount: '500 г', price: 85 },
        { name: 'Яйца', amount: '10 шт', price: 120 },
        { name: 'Тунец в с/с', amount: '4 банки', price: 320 },
        { name: 'Огурцы', amount: '1 кг', price: 90 },
        { name: 'Помидоры', amount: '1 кг', price: 150 },
        { name: 'Морковь', amount: '1 кг', price: 60 },
        { name: 'Лук', amount: '1 кг', price: 45 },
        { name: 'Брокколи', amount: '500 г', price: 180 },
        { name: 'Гречка', amount: '1 кг', price: 120 },
        { name: 'Сыр легкий', amount: '300 г', price: 250 },
        { name: 'Банан', amount: '6 шт', price: 150 },
        { name: 'Заменитель сахара', amount: '1 уп', price: 200 },
        { name: 'Томатная паста', amount: '1 банка', price: 90 }
      ]
    },
    {
      id: 2,
      name: 'Четверг - готовка',
      date: '19 сентября',
      totalPrice: 2200,
      itemsCount: 12,
      items: [
        { name: 'Куриное филе', amount: '600 г', price: 340 },
        { name: 'Творог 5%', amount: '800 г', price: 160 },
        { name: 'Листья салата', amount: '2 уп', price: 120 },
        { name: 'Яйца', amount: '6 шт', price: 75 },
        { name: 'Тунец в с/с', amount: '3 банки', price: 240 },
        { name: 'Огурцы', amount: '800 г', price: 70 },
        { name: 'Помидоры', amount: '800 г', price: 120 },
        { name: 'Морковь', amount: '500 г', price: 30 },
        { name: 'Лук', amount: '500 г', price: 25 },
        { name: 'Гречка', amount: '500 г', price: 60 },
        { name: 'Сыр легкий', amount: '200 г', price: 170 },
        { name: 'Банан', amount: '4 шт', price: 100 }
      ]
    }
  ];

  const handleTabPress = (tabName) => {
    console.log('Tab pressed:', tabName);
    setActiveTab(tabName);
    // Сбрасываем состояния при переключении табов
    setSelectedCategory(null);
    setExpandedList(null);
  };

  const handleCategoryPress = (categoryId) => {
    console.log('Category pressed:', categoryId);
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const renderMealsTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Дневная статистика */}
      <View style={styles.dailyStatsCard}>
        <Text style={styles.cardTitle}>📊 Сегодня</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1760</Text>
            <Text style={styles.statLabel}>ккал</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>127г</Text>
            <Text style={styles.statLabel}>белки</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>131г</Text>
            <Text style={styles.statLabel}>углеводы</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>61г</Text>
            <Text style={styles.statLabel}>жиры</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>25</Text>
            <Text style={styles.statLabel}>инсулин</Text>
          </View>
        </View>
      </View>

      {/* Приемы пищи */}
      {Object.entries(DAILY_MEALS).map(([key, meal]) => (
        <View key={key} style={styles.mealCard}>
          <View style={styles.mealHeader}>
            <View style={styles.mealTitleRow}>
              <Text style={styles.mealEmoji}>{meal.emoji}</Text>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealTime}>{meal.time}</Text>
            </View>
            <View style={styles.mealSummary}>
              <Text style={styles.mealCalories}>{meal.totalCalories} ккал</Text>
              <Text style={styles.mealInsulin}>{meal.insulin} ед</Text>
            </View>
          </View>
          
          {/* Блюда */}
          {meal.dishes.map((dish, index) => (
            <View key={index} style={styles.dishItem}>
              <View style={styles.dishInfo}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishAmount}>{dish.amount}</Text>
              </View>
              <Text style={styles.dishCalories}>{dish.calories} ккал</Text>
            </View>
          ))}
          
          {/* Итого по приему пищи */}
          <View style={styles.mealTotals}>
            <Text style={styles.totalsText}>
              {meal.totalCalories} ккал • {meal.totalProtein}б • {meal.totalCarbs}у • {meal.totalFat}ж
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderRecipesList = (categoryId) => {
    const recipes = RECIPES_BY_CATEGORY[categoryId] || [];
    const category = RECIPE_CATEGORIES.find(cat => cat.id === categoryId);

    return (
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Заголовок с кнопкой назад */}
        <View style={styles.recipeHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackToCategories}
          >
            <Text style={styles.backButtonText}>← Назад</Text>
          </TouchableOpacity>
          <Text style={styles.categoryTitle}>
            {category?.emoji} {category?.name}
          </Text>
        </View>

        {/* Список рецептов */}
        {recipes.map(recipe => (
          <View key={recipe.id} style={styles.recipeCard}>
            <View style={styles.recipeHeader}>
              <Text style={styles.recipeName}>{recipe.name}</Text>
              <Text style={styles.recipeTime}>⏱️ {recipe.time} мин</Text>
            </View>
            
            <View style={styles.recipeNutrition}>
              <Text style={styles.nutritionText}>
                {recipe.calories} ккал • {recipe.protein}б • {recipe.carbs}у • {recipe.fat}ж
              </Text>
              <Text style={styles.insulinText}>{recipe.insulin} ед инсулина</Text>
            </View>

            <View style={styles.ingredientsSection}>
              <Text style={styles.ingredientsTitle}>Ингредиенты:</Text>
              {recipe.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.ingredientItem}>• {ingredient}</Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderRecipesTab = () => {
    if (selectedCategory) {
      return renderRecipesList(selectedCategory);
    }

    return (
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>👨‍🍳 Категории рецептов</Text>
        
        {RECIPE_CATEGORIES.map(category => (
          <TouchableOpacity 
            key={category.id} 
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(category.id)}
          >
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count} рецептов</Text>
              </View>
            </View>
            <Text style={styles.categoryArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderShoppingTab = () => {
    return (
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>🛒 Продуктовые корзины</Text>
        
        {SHOPPING_LISTS.map(list => (
          <View key={list.id} style={styles.shoppingCard}>
            <TouchableOpacity
              style={styles.shoppingHeader}
              onPress={() => {
                console.log('Shopping list pressed:', list.id);
                setExpandedList(expandedList === list.id ? null : list.id);
              }}
            >
              <View style={styles.shoppingInfo}>
                <Text style={styles.shoppingName}>{list.name}</Text>
                <Text style={styles.shoppingDate}>{list.date}</Text>
                <Text style={styles.shoppingSummary}>
                  {list.itemsCount} товаров • {list.totalPrice} ₽
                </Text>
              </View>
              <Text style={[
                styles.shoppingArrow,
                expandedList === list.id && styles.shoppingArrowExpanded
              ]}>
                ▼
              </Text>
            </TouchableOpacity>
            
            {expandedList === list.id && (
              <View style={styles.shoppingItems}>
                {list.items.map((item, index) => (
                  <View key={index} style={styles.shoppingItem}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemAmount}>{item.amount}</Text>
                    </View>
                    <Text style={styles.itemPrice}>{item.price} ₽</Text>
                  </View>
                ))}
                <View style={styles.shoppingTotal}>
                  <Text style={styles.totalText}>Итого: {list.totalPrice} ₽</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Заголовок экрана */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>🍽️ Питание</Text>
      </View>

      {/* Табы */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'meals' && styles.activeTab]}
          onPress={() => handleTabPress('meals')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'meals' && styles.activeTabText]}>
            Приемы пищи
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'recipes' && styles.activeTab]}
          onPress={() => handleTabPress('recipes')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'recipes' && styles.activeTabText]}>
            Рецепты
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'shopping' && styles.activeTab]}
          onPress={() => handleTabPress('shopping')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'shopping' && styles.activeTabText]}>
            Корзина
          </Text>
        </TouchableOpacity>
      </View>

      {/* Контент */}
      <View style={styles.contentContainer}>
        {activeTab === 'meals' && renderMealsTab()}
        {activeTab === 'recipes' && renderRecipesTab()}
        {activeTab === 'shopping' && renderShoppingTab()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenHeader: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    marginHorizontal: 5,
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  
  // Стили для приемов пищи
  dailyStatsCard: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  mealCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mealEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: 8,
  },
  mealTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  mealSummary: {
    alignItems: 'flex-end',
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  mealInsulin: {
    fontSize: 14,
    color: COLORS.warning,
    marginTop: 2,
  },
  dishItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    color: COLORS.text,
  },
  dishAmount: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  dishCalories: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  mealTotals: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalsText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
  },
  
  // Стили для рецептов
  categoryCard: {
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  categoryCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  categoryArrow: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },

  // Стили для списка рецептов
  recipeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.primary + '20',
    borderRadius: 8,
    marginRight: 15,
  },
  backButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  recipeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  recipeTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  recipeNutrition: {
    marginVertical: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  nutritionText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  insulinText: {
    fontSize: 14,
    color: COLORS.warning,
    fontWeight: '500',
  },
  ingredientsSection: {
    marginTop: 8,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  ingredientItem: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  
  // Стили для продуктовой корзины
  shoppingCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  shoppingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  shoppingInfo: {
    flex: 1,
  },
  shoppingName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  shoppingDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  shoppingSummary: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 4,
    fontWeight: '500',
  },
  shoppingArrow: {
    fontSize: 16,
    color: COLORS.textSecondary,
    transform: [{ rotate: '0deg' }],
  },
  shoppingArrowExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  shoppingItems: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  shoppingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    color: COLORS.text,
  },
  itemAmount: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
  },
  shoppingTotal: {
    padding: 16,
    backgroundColor: COLORS.primary + '10',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
});

export default NutritionScreen;
