import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { NutritionContext } from '../../context/NutritionContext';
import { recipesDatabase } from '../../data/recipesDatabase';

const RecipesTab = ({ navigation }) => {
  const { selectedCategory, setSelectedCategory } = useContext(NutritionContext);
  const [recipes, setRecipes] = useState(recipesDatabase.getAllRecipes());

  const categories = [
    { id: 'all', name: 'Все', icon: 'grid-outline' },
    { id: 'breakfast', name: 'Завтраки', icon: 'sunny-outline' },
    { id: 'soups', name: 'Супы', icon: 'restaurant-outline' },
    { id: 'main', name: 'Основные', icon: 'nutrition-outline' },
    { id: 'salads', name: 'Салаты', icon: 'leaf-outline' },
    { id: 'snacks', name: 'Перекусы', icon: 'fast-food-outline' },
    { id: 'baking', name: 'Выпечка', icon: 'cafe-outline' },
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setRecipes(recipesDatabase.getAllRecipes());
    } else {
      setRecipes(recipesDatabase.getRecipesByCategory(categoryId));
    }
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.id && styles.categoryCardActive
      ]}
      onPress={() => handleCategorySelect(item.id)}
    >
      <Ionicons
        name={item.icon}
        size={24}
        color={selectedCategory === item.id ? COLORS.surface : COLORS.primary}
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.categoryTextActive
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => handleRecipePress(item)}
    >
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
        
        <View style={styles.difficultyContainer}>
          <Text style={[
            styles.difficultyText,
            { color: item.difficulty === 'easy' ? COLORS.success : 
                     item.difficulty === 'medium' ? COLORS.warning : COLORS.danger }
          ]}>
            {item.difficulty === 'easy' ? 'Легко' : 
             item.difficulty === 'medium' ? 'Средне' : 'Сложно'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
            {recipes.length} {recipes.length === 1 ? 'рецепт' : 'рецептов'}
          </Text>
        </View>

        <FlatList
          data={recipes}
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
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  difficultyContainer: {
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default RecipesTab;