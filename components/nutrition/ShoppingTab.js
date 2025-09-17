import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { NutritionContext } from '../../context/NutritionContext';

const ShoppingTab = () => {
  const { shoppingLists, toggleShoppingItem } = useContext(NutritionContext);
  const [expandedLists, setExpandedLists] = useState({});

  const toggleList = (listId) => {
    setExpandedLists(prev => ({
      ...prev,
      [listId]: !prev[listId]
    }));
  };

  const calculateListStats = (items) => {
    const totalItems = items.length;
    const checkedItems = items.filter(item => item.checked).length;
    const totalCost = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return { totalItems, checkedItems, totalCost };
  };

  const renderShoppingItem = ({ item, listId }) => (
    <TouchableOpacity
      style={[styles.shoppingItem, item.checked && styles.shoppingItemChecked]}
      onPress={() => toggleShoppingItem(listId, item.id)}
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
          {item.quantity} {item.unit} • {item.category}
        </Text>
      </View>
      
      <View style={styles.itemPrice}>
        <Text style={[
          styles.priceText,
          item.checked && styles.priceTextChecked
        ]}>
          {(item.price * item.quantity).toFixed(0)} ₽
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderShoppingList = ({ item: list }) => {
    const isExpanded = expandedLists[list.id];
    const stats = calculateListStats(list.items);
    const progress = stats.totalItems > 0 ? (stats.checkedItems / stats.totalItems) * 100 : 0;

    return (
      <View style={styles.listCard}>
        <TouchableOpacity
          style={styles.listHeader}
          onPress={() => toggleList(list.id)}
        >
          <View style={styles.listHeaderLeft}>
            <View style={styles.listIcon}>
              <Ionicons name="basket-outline" size={24} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.listTitle}>{list.title}</Text>
              <Text style={styles.listSubtitle}>{list.date}</Text>
            </View>
          </View>
          
          <View style={styles.listHeaderRight}>
            <View style={styles.listStats}>
              <Text style={styles.listStatsText}>
                {stats.checkedItems}/{stats.totalItems}
              </Text>
              <Text style={styles.listCost}>
                {stats.totalCost.toFixed(0)} ₽
              </Text>
            </View>
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color={COLORS.textSecondary}
            />
          </View>
        </TouchableOpacity>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill,
              { width: `${progress}%` }
            ]} />
          </View>
          <Text style={styles.progressText}>
            {progress.toFixed(0)}% выполнено
          </Text>
        </View>

        {/* Shopping Items */}
        {isExpanded && (
          <View style={styles.itemsContainer}>
            <FlatList
              data={list.items}
              renderItem={({ item }) => renderShoppingItem({ item, listId: list.id })}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Списки покупок</Text>
          <Text style={styles.headerSubtitle}>
            Meal prep на {shoppingLists.length} {shoppingLists.length === 1 ? 'день' : 'дня'}
          </Text>
        </View>

        {/* Shopping Lists */}
        <View style={styles.listsContainer}>
          <FlatList
            data={shoppingLists}
            renderItem={renderShoppingList}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Add New List Button */}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
          <Text style={styles.addButtonText}>Создать новый список</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
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
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  listsContainer: {
    padding: 16,
  },
  listCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  listHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listIcon: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.background,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  listSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  listHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listStats: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  listStatsText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  listCost: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  progressText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  itemsContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  shoppingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  shoppingItemChecked: {
    opacity: 0.6,
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
  addButton: {
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
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
    marginLeft: 8,
  },
});

export default ShoppingTab;