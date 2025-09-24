
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

const ShoppingTab = () => {
  const [shoppingItems, setShoppingItems] = useState([
    { id: '1', name: 'Куриное филе', quantity: '1 кг', price: 350, checked: false, category: 'Мясо' },
    { id: '2', name: 'Творог 0%', quantity: '500 г', price: 120, checked: true, category: 'Молочные' },
    { id: '3', name: 'Овсянка', quantity: '1 кг', price: 80, checked: false, category: 'Крупы' },
    { id: '4', name: 'Тунец в с/с', quantity: '2 банки', price: 200, checked: false, category: 'Консервы' },
    { id: '5', name: 'Яйца', quantity: '10 шт', price: 90, checked: true, category: 'Молочные' },
    { id: '6', name: 'Брокколи', quantity: '400 г', price: 150, checked: false, category: 'Овощи' },
    { id: '7', name: 'Лук репчатый', quantity: '1 кг', price: 40, checked: false, category: 'Овощи' },
    { id: '8', name: 'Морковь', quantity: '1 кг', price: 50, checked: true, category: 'Овощи' },
  ]);

  const [animatedValues] = useState(
    shoppingItems.reduce((acc, item) => {
      acc[item.id] = new Animated.Value(1);
      return acc;
    }, {})
  );

  const toggleItem = (itemId) => {
    // Анимация нажатия
    Animated.sequence([
      Animated.timing(animatedValues[itemId], {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[itemId], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setShoppingItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const totalCost = shoppingItems.reduce((sum, item) => sum + item.price, 0);
  const checkedItems = shoppingItems.filter(item => item.checked).length;
  const progressPercentage = (checkedItems / shoppingItems.length) * 100;

  // Группировка по категориям
  const groupedItems = shoppingItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const renderShoppingItem = (item) => (
    <Animated.View
      key={item.id}
      style={[
        styles.shoppingItem,
        item.checked && styles.shoppingItemChecked,
        {
          transform: [{ scale: animatedValues[item.id] }]
        }
      ]}
    >
      <TouchableOpacity
        style={styles.itemTouchable}
        onPress={() => toggleItem(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.itemCheckbox}>
          <Ionicons
            name={item.checked ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={item.checked ? COLORS.success : COLORS.textSecondary}
          />
        </View>
        
        <View style={styles.itemInfo}>
          <Text style={[
            styles.itemName,
            item.checked && styles.itemNameChecked
          ]}>
            {item.name}
          </Text>
          <Text style={styles.itemDetails}>
            {item.quantity}
          </Text>
        </View>
        
        <View style={styles.itemPrice}>
          <Text style={[
            styles.priceText,
            item.checked && styles.priceTextChecked
          ]}>
            {item.price} ₽
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Список покупок</Text>
          <Text style={styles.headerSubtitle}>
            Meal prep на 3 дня • {checkedItems}/{shoppingItems.length} готово
          </Text>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View style={[
              styles.progressFill,
              { width: `${progressPercentage}%` }
            ]} />
          </View>
          <Text style={styles.progressText}>
            {Math.round(progressPercentage)}% выполнено
          </Text>
        </View>

        {/* Shopping Items by Category */}
        <View style={styles.itemsContainer}>
          {Object.entries(groupedItems).map(([category, items]) => (
            <View key={category} style={styles.categorySection}>
              <View style={styles.categoryHeader}>
                <Ionicons 
                  name={getCategoryIcon(category)} 
                  size={20} 
                  color={COLORS.primary} 
                />
                <Text style={styles.categoryTitle}>{category}</Text>
                <Text style={styles.categoryCount}>
                  {items.filter(item => item.checked).length}/{items.length}
                </Text>
              </View>
              
              {items.map(renderShoppingItem)}
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Общая стоимость:</Text>
            <Text style={styles.totalAmount}>{totalCost} ₽</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.budgetLabel}>Бюджет на неделю:</Text>
            <Text style={[
              styles.budgetAmount,
              { color: totalCost <= 5000 ? COLORS.success : COLORS.warning }
            ]}>
              5000 ₽
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[
              styles.budgetProgressFill,
              { 
                width: `${Math.min((totalCost / 5000) * 100, 100)}%`,
                backgroundColor: totalCost <= 5000 ? COLORS.success : COLORS.warning
              }
            ]} />
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
          <Text style={styles.actionButtonText}>Добавить продукт</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const getCategoryIcon = (category) => {
  const icons = {
    'Мясо': 'restaurant-outline',
    'Молочные': 'water-outline',
    'Крупы': 'nutrition-outline',
    'Консервы': 'archive-outline',
    'Овощи': 'leaf-outline',
  };
  return icons[category] || 'basket-outline';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  progressContainer: {
    padding: 16,
    backgroundColor: COLORS.surface,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 2,
  },
  budgetProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  itemsContainer: {
    marginTop: 8,
  },
  categorySection: {
    backgroundColor: COLORS.surface,
    marginBottom: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
    flex: 1,
  },
  categoryCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  shoppingItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  shoppingItemChecked: {
    opacity: 0.6,
  },
  itemTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  itemCheckbox: {
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  itemDetails: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  itemPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  priceTextChecked: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  totalContainer: {
    padding: 20,
    backgroundColor: COLORS.surface,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: COLORS.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  budgetLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  budgetAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
    marginLeft: 8,
  },
});

export default ShoppingTab;
