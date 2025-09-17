import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { COLORS } from '../constants/colors';
import MealsTab from '../components/nutrition/MealsTab';
import RecipesTab from '../components/nutrition/RecipesTab';
import ShoppingTab from '../components/nutrition/ShoppingTab';

const NutritionScreen = () => {
  const [activeTab, setActiveTab] = useState('meals');

  const handleTabPress = (tabName) => {
    console.log('Tab pressed:', tabName);
    setActiveTab(tabName);
  };

  const renderContent = () => {
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
        {renderContent()}
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
});

export default NutritionScreen;