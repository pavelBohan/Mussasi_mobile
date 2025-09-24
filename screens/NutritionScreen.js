
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import MealsTab from '../components/nutrition/MealsTab';
import RecipesTab from '../components/nutrition/RecipesTab';
import ShoppingTab from '../components/nutrition/ShoppingTab';

const NutritionScreen = () => {
  const [activeTab, setActiveTab] = useState('meals');

  const tabs = [
    { id: 'meals', label: 'Приемы пищи', icon: 'restaurant-outline' },
    { id: 'recipes', label: 'Рецепты', icon: 'book-outline' },
    { id: 'shopping', label: 'Корзина', icon: 'basket-outline' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'meals':
        return <MealsTab />;
      case 'recipes':
        return <RecipesTab />;
      case 'shopping':
        return <ShoppingTab />;
      default:
        return <MealsTab />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Питание</Text>
        <Text style={styles.headerSubtitle}>Система "10 контейнеров"</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
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
      <View style={styles.content}>
        {renderTabContent()}
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
    padding: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
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
  content: {
    flex: 1,
  },
});

export default NutritionScreen;
