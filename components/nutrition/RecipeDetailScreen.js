import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

const RecipeDetailScreen = ({ route, navigation }) => {
  const { recipe } = route.params;
  const [activeTab, setActiveTab] = useState('ingredients');
  const [servings, setServings] = useState(recipe.servings);

  const adjustQuantity = (originalQuantity, originalServings, newServings) => {
    const ratio = newServings / originalServings;
    const adjusted = originalQuantity * ratio;
    return adjusted % 1 === 0 ? adjusted.toString() : adjusted.toFixed(1);
  };

  const renderNutritionInfo = () => (
    <View style={styles.nutritionGrid}>
      <View style={styles.nutritionItem}>
        <Text style={styles.nutritionValue}>
          {Math.round(recipe.nutrition.calories * servings / recipe.servings)}
        </Text>
        <Text style={styles.nutritionLabel}>ккал</Text>
      </View>
      <View style={styles.nutritionItem}>
        <Text style={styles.nutritionValue}>
          {Math.round(recipe.nutrition.protein * servings / recipe.servings)}г
        </Text>
        <Text style={styles.nutritionLabel}>белки</Text>
      </View>
      <View style={styles.nutritionItem}>
        <Text style={styles.nutritionValue}>
          {Math.round(recipe.nutrition.carbs * servings / recipe.servings)}г
        </Text>
        <Text style={styles.nutritionLabel}>углеводы</Text>
      </View>
      <View style={styles.nutritionItem}>
        <Text style={styles.nutritionValue}>
          {Math.round(recipe.nutrition.fat * servings / recipe.servings)}г
        </Text>
        <Text style={styles.nutritionLabel}>жиры</Text>
      </View>
    </View>
  );

  const renderIngredients = () => (
    <View style={styles.tabContent}>
      {recipe.ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientItem}>
          <Text style={styles.ingredientName}>{ingredient.name}</Text>
          <Text style={styles.ingredientQuantity}>
            {adjustQuantity(ingredient.quantity, recipe.servings, servings)} {ingredient.unit}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderInstructions = () => (
    <View style={styles.tabContent}>
      {recipe.instructions.map((step, index) => (
        <View key={index} style={styles.instructionStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepText}>{step.text}</Text>
            {step.timer && (
              <View style={styles.timerContainer}>
                <Ionicons name="timer-outline" size={16} color={COLORS.primary} />
                <Text style={styles.timerText}>{step.timer} мин</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const renderEquipment = () => (
    <View style={styles.tabContent}>
      {recipe.equipment.map((item, index) => (
        <View key={index} style={styles.equipmentItem}>
          <Ionicons name="hardware-chip-outline" size={20} color={COLORS.primary} />
          <Text style={styles.equipmentText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{recipe.name}</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recipe Image Placeholder */}
        <View style={styles.imageContainer}>
          <Ionicons name="image-outline" size={80} color={COLORS.textSecondary} />
        </View>

        {/* Recipe Info */}
        <View style={styles.infoSection}>
          <Text style={styles.recipeDescription}>{recipe.description}</Text>
          
          <View style={styles.recipeStats}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <Text style={styles.statText}>{recipe.times.total} мин</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="bar-chart-outline" size={20} color={COLORS.primary} />
              <Text style={styles.statText}>
                {recipe.difficulty === 'easy' ? 'Легко' : 
                 recipe.difficulty === 'medium' ? 'Средне' : 'Сложно'}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
              <Text style={styles.statText}>
                {Math.round(recipe.cost * servings / recipe.servings)} ₽
              </Text>
            </View>
          </View>

          {/* Servings Adjuster */}
          <View style={styles.servingsContainer}>
            <Text style={styles.servingsLabel}>Порций:</Text>
            <View style={styles.servingsControls}>
              <TouchableOpacity
                style={styles.servingsButton}
                onPress={() => setServings(Math.max(1, servings - 1))}
              >
                <Ionicons name="remove" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.servingsValue}>{servings}</Text>
              <TouchableOpacity
                style={styles.servingsButton}
                onPress={() => setServings(servings + 1)}
              >
                <Ionicons name="add" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Nutrition Info */}
          {renderNutritionInfo()}
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabsHeader}>
            {[
              { id: 'ingredients', label: 'Ингредиенты', icon: 'list-outline' },
              { id: 'instructions', label: 'Приготовление', icon: 'document-text-outline' },
              { id: 'equipment', label: 'Оборудование', icon: 'hardware-chip-outline' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Ionicons
                  name={tab.icon}
                  size={20}
                  color={activeTab === tab.id ? COLORS.primary : COLORS.textSecondary}
                />
                <Text style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          {activeTab === 'ingredients' && renderIngredients()}
          {activeTab === 'instructions' && renderInstructions()}
          {activeTab === 'equipment' && renderEquipment()}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Ionicons name="basket-outline" size={20} color={COLORS.surface} />
          <Text style={styles.addToCartText}>В корзину</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startCookingButton}>
          <Ionicons name="play-outline" size={20} color={COLORS.surface} />
          <Text style={styles.startCookingText}>Готовить</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  favoriteButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: 200,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoSection: {
    padding: 20,
    backgroundColor: COLORS.surface,
  },
  recipeDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  recipeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 4,
    fontWeight: '500',
  },
  servingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  servingsLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  servingsControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  servingsValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  nutritionLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  tabsContainer: {
    backgroundColor: COLORS.surface,
    marginTop: 8,
  },
  tabsHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
  },
  tabContent: {
    padding: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  ingredientName: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  ingredientQuantity: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
  },
  instructionStep: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
  },
  stepContent: {
    flex: 1,
  },
  stepText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timerText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 4,
    fontWeight: '500',
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  equipmentText: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.textSecondary,
    paddingVertical: 16,
    borderRadius: 12,
    marginRight: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
    marginLeft: 8,
  },
  startCookingButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 8,
  },
  startCookingText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.surface,
    marginLeft: 8,
  },
});

export default RecipeDetailScreen;