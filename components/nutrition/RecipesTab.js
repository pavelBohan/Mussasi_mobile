import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { recipesDatabase } from '../../data/recipesDatabase';

const RecipesTab = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recipes, setRecipes] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));

  const categories = [
    { id: 'all', name: 'Все', icon: 'grid-outline' },
    { id: 'breakfast', name: 'Завтраки', icon: 'sunny-outline' },
    { id: 'soups', name: 'Супы', icon: 'restaurant-outline' },
    { id: 'main', name: 'Основные', icon: 'nutrition-outline' },
    { id: 'salads', name: 'Салаты', icon: 'leaf-outline' },
    { id: 'snacks', name: 'Перекусы', icon: 'fast-food-outline' },
    { id: 'baking', name: 'Выпечка', icon: 'cafe-outline' },
  ];

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = () => {
    try {
      const allRecipes = recipesDatabase.getAllRecipes();
      setRecipes(allRecipes);
    } catch (error) {
      console.log('Recipes database not ready, using mock data');
      setRecipes(getMockRecipes());
    }
  };

  const getMockRecipes = () => [
    {
      id: '1',
      name: 'Творожный хлеб',
      description: 'Белковый хлеб из творога и овсянки для завтрака',
      category: 'breakfast',
      times: { total: 45 },
      servings: 10,
      nutrition: { calories: 120, protein: 15, carbs: 8, fat: 3 },
      difficulty: 'easy',
      tags: ['белковый', 'meal-prep'],
    },
    {
      id: '2',
      name: 'Куриный суп',
      description: 'Сытный суп с курицей и овощами',
      category: 'soups',
      times: { total: 60 },
      servings: 4,
      nutrition: { calories: 200, protein: 25, carbs: 12, fat: 6 },
      difficulty: 'medium',
      tags: ['сытный', 'горячее'],
    },
    {
      id: '3',
      name: 'Салат с тунцом',
      description: 'Легкий белковый салат с тунцом и овощами',
      category: 'salads',
      times: { total: 15 },
      servings: 2,
      nutrition: { calories: 180, protein: 22, carbs: 5, fat: 8 },
      difficulty: 'easy',
      tags: ['быстро', 'белковый'],
    },
    {
      id: '4',
      name: 'Хачапури',
      description: 'Грузинская лепешка с творогом',
      category: 'baking',
      times: { total: 30 },
      servings: 6,
      nutrition: { calories: 250, protein: 18, carbs: 20, fat: 12 },
      difficulty: 'medium',
      tags: ['выпечка', 'сытно'],
    },
    {
      id: '5',
      name: 'Мини-пицца',
      description: 'Белковая мини-пицца на творожной основе',
      category: 'snacks',
      times: { total: 20 },
      servings: 4,
      nutrition: { calories: 160, protein: 12, carbs: 10, fat: 8 },
      difficulty: 'easy',
      tags: ['перекус', 'быстро'],
    },
    {
      id: '6',
      name: 'Омлет с овощами',
      description: 'Пышный омлет с брокколи и шпинатом',
      category: 'breakfast',
      times: { total: 15 },
      servings: 2,
      nutrition: { calories: 190, protein: 16, carbs: 6, fat: 12 },
      difficulty: 'easy',
      tags: ['завтрак', 'овощи'],
    },
    {
      id: '7',
      name: 'Куриная грудка гриль',
      description: 'Сочная куриная грудка с травами',
      category: 'main',
      times: { total: 25 },
      servings: 4,
      nutrition: { calories: 220, protein: 35, carbs: 2, fat: 8 },
      difficulty: 'medium',
      tags: ['гриль', 'белковое'],
    },
  ];

  const handleCategorySelect = (categoryId) => {
    // Анимация исчезновения
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      // Меняем категорию и фильтруем рецепты
      setSelectedCategory(categoryId);
      
      const allRecipes = recipes.length > 0 ? recipes : getMockRecipes();
      const filteredRecipes = categoryId === 'all' 
        ? allRecipes 
        : allRecipes.filter(recipe => recipe.category === categoryId);
      
      setRecipes(filteredRecipes);

      // Анимация появления
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });

    // Анимация слайда для категорий
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      slideAnim.setValue(0);
    });
  };

  const handleRecipePress = (recipe) => {
    // Анимация нажатия
    Animated.sequence([
    Animated.timing(fadeAnim, {
    toValue: 0.7,
    duration: 100,
    useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 100,
    useNativeDriver: true,
    }),
  ]).start();

// Навигация к детальному экрану
navigation.navigate('RecipeDetail', { recipe });
};

  const renderCategory = ({ item }) => {
    const isActive = selectedCategory === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          isActive && styles.categoryCardActive
        ]}
        onPress={() => handleCategorySelect(item.id)}
        activeOpacity={0.7}
      >
        <Animated.View style={{
          transform: [{
            scale: isActive ? slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }) : 1
          }]
        }}>
          <Ionicons
            name={item.icon}
            size={24}
            color={isActive ? COLORS.surface : COLORS.primary}
          />
        </Animated.View>
        <Text style={[
          styles.categoryText,
          isActive && styles.categoryTextActive
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRecipe = ({ item, index }) => (
    <Animated.View
      style={[
        styles.recipeCard,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            })
          }]
        }
      ]}
    >
      <TouchableOpacity
        onPress={() => handleRecipePress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.recipeContent}>
          <View style={styles.recipeImageContainer}>
            <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
          </View>
          
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeName}>{item.name}</Text>
            <Text style={styles.recipeDescription} numberOfLines={2}>
              {item.description}
            </Text>
            
            <View style={styles.recipeStats}>
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
                <Text style={styles.statText}>{item.times.total} мин</Text>
              </View>
              
              <View style={styles.statItem}>
                <Ionicons name="restaurant-outline" size={16} color={COLORS.textSecondary} />
                <Text style={styles.statText}>{item.servings} порций</Text>
              </View>
              
              <View style={styles.statItem}>
                <Ionicons name="flash-outline" size={16} color={COLORS.textSecondary} />
                <Text style={styles.statText}>{item.nutrition.calories} ккал</Text>
              </View>
            </View>
            
            <View style={styles.tagsContainer}>
              {item.tags?.slice(0, 2).map((tag, tagIndex) => (
                <View key={tagIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const filteredRecipes = selectedCategory === 'all' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Categories */}
      <View style={styles.categoriesSection}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Recipes List */}
      <View style={styles.recipesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Все рецепты' : 
             categories.find(c => c.id === selectedCategory)?.name}
          </Text>
          <Text style={styles.recipesCount}>
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'рецепт' : 'рецептов'}
          </Text>
        </View>

        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.recipesList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  categoriesSection: {
    paddingVertical: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 80,
  },
  categoryCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text,
    marginTop: 4,
    textAlign: 'center',
  },
  categoryTextActive: {
    color: COLORS.surface,
  },
  recipesSection: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  recipesCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  recipesList: {
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeContent: {
    flexDirection: 'row',
    padding: 16,
  },
  recipeImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  recipeDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  recipeStats: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
  },
  tagText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default RecipesTab;