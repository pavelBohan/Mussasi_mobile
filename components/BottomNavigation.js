import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

const BottomNavigation = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Главная' },
    { id: 'schedule', icon: '📅', label: 'Расписание' },
    { id: 'stats', icon: '📊', label: 'Статистика' },
    { id: 'settings', icon: '⚙️', label: 'Настройки' },
  ];

  const TabButton = ({ tab, isActive }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={() => onTabPress(tab.id)}
      activeOpacity={0.7}
    >
      {isActive ? (
        <LinearGradient
          colors={['#007AFF', '#5856D6']}
          style={styles.activeTabGradient}
        >
          <Text style={styles.activeTabIcon}>{tab.icon}</Text>
          <Text style={styles.activeTabLabel}>{tab.label}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.inactiveTab}>
          <Text style={styles.inactiveTabIcon}>{tab.icon}</Text>
          <Text style={styles.inactiveTabLabel}>{tab.label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.98)']}
        style={styles.navigationBar}
      >
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  navigationBar: {
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 2,
  },
  activeTabButton: {
    transform: [{ scale: 1.05 }],
  },
  activeTabGradient: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: width / 4 - 20,
  },
  activeTabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  activeTabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  inactiveTab: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  inactiveTabIcon: {
    fontSize: 18,
    marginBottom: 2,
    opacity: 0.6,
  },
  inactiveTabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#8E8E93',
  },
});

export default BottomNavigation;
