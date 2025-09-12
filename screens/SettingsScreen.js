import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [userProfile, setUserProfile] = useState({
    name: 'Пользователь',
    height: '179',
    weight: '73',
    targetWeight: '68',
    insulinRatio: '1:5',
    longInsulin: '14',
  });

  const [notifications, setNotifications] = useState({
    glucose: true,
    insulin: true,
    meals: true,
    volleyball: true,
  });

  // Загрузка данных при монтировании
  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      Alert.alert('✅ Успешно', 'Профиль сохранен');
    } catch (error) {
      Alert.alert('❌ Ошибка', 'Не удалось сохранить профиль');
    }
  };

  const handleExportData = async () => {
    try {
      const data = await AsyncStorage.getItem('dailyData');
      if (data) {
        Alert.alert('📤 Экспорт данных', `Данные готовы к экспорту:\n${data.substring(0, 100)}...`);
      } else {
        Alert.alert('📤 Экспорт данных', 'Нет данных для экспорта');
      }
    } catch (error) {
      Alert.alert('❌ Ошибка', 'Не удалось экспортировать данные');
    }
  };

  const handleClearData = () => {
    Alert.alert(
      '⚠️ Внимание',
      'Вы уверены, что хотите очистить все данные? Это действие нельзя отменить.',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Очистить',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('✅ Готово', 'Все данные очищены');
            } catch (error) {
              Alert.alert('❌ Ошибка', 'Не удалось очистить данные');
            }
          },
        },
      ]
    );
  };

  const updateProfile = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const SettingCard = ({ children, title }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );

  const SettingRow = ({ label, value, onPress, rightComponent }) => (
    <TouchableOpacity style={styles.settingRow} onPress={onPress}>
      <Text style={styles.settingLabel} numberOfLines={2}>{label}</Text>
      {rightComponent || <Text style={styles.settingValue}>{value}</Text>}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Профиль пользователя */}
      <SettingCard title="👤 Профиль">
        <View style={styles.profileSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Имя</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите имя"
              value={userProfile.name}
              onChangeText={(text) => updateProfile('name', text)}
            />
          </View>
          
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Рост (см)</Text>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="179"
                value={userProfile.height}
                keyboardType="numeric"
                onChangeText={(text) => updateProfile('height', text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Вес (кг)</Text>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="73"
                value={userProfile.weight}
                keyboardType="numeric"
                onChangeText={(text) => updateProfile('weight', text)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Целевой вес (кг)</Text>
            <TextInput
              style={styles.input}
              placeholder="68"
              value={userProfile.targetWeight}
              keyboardType="numeric"
              onChangeText={(text) => updateProfile('targetWeight', text)}
            />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Соотношение инсулина</Text>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="1:5"
                value={userProfile.insulinRatio}
                onChangeText={(text) => updateProfile('insulinRatio', text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Длинный инсулин (ед)</Text>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="14"
                value={userProfile.longInsulin}
                keyboardType="numeric"
                onChangeText={(text) => updateProfile('longInsulin', text)}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <LinearGradient
              colors={['#34C759', '#30D158']}
              style={styles.saveButtonGradient}
            >
              <Text style={styles.saveButtonText}>💾 Сохранить профиль</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SettingCard>

      {/* Уведомления */}
      <SettingCard title="🔔 Уведомления">
        <SettingRow
          label="Напоминания об измерении глюкозы"
          rightComponent={
            <Switch
              value={notifications.glucose}
              onValueChange={(value) => setNotifications({...notifications, glucose: value})}
              trackColor={{ false: '#E5E5EA', true: '#34C759' }}
              thumbColor="#FFFFFF"
            />
          }
        />
        <SettingRow
          label="Напоминания об инсулинотерапии"
          rightComponent={
            <Switch
              value={notifications.insulin}
              onValueChange={(value) => setNotifications({...notifications, insulin: value})}
              trackColor={{ false: '#E5E5EA', true: '#34C759' }}
              thumbColor="#FFFFFF"
            />
          }
        />
        <SettingRow
          label="Напоминания о приемах пищи"
          rightComponent={
            <Switch
              value={notifications.meals}
              onValueChange={(value) => setNotifications({...notifications, meals: value})}
              trackColor={{ false: '#E5E5EA', true: '#34C759' }}
              thumbColor="#FFFFFF"
            />
          }
        />
        <SettingRow
          label="Напоминания о тренировках по волейболу"
          rightComponent={
            <Switch
              value={notifications.volleyball}
              onValueChange={(value) => setNotifications({...notifications, volleyball: value})}
              trackColor={{ false: '#E5E5EA', true: '#34C759' }}
              thumbColor="#FFFFFF"
            />
          }
        />
      </SettingCard>

      {/* Данные */}
      <SettingCard title="💾 Управление данными">
        <TouchableOpacity style={styles.actionButton} onPress={handleExportData}>
          <Text style={styles.actionButtonText}>📤 Экспорт данных</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={handleClearData}>
          <Text style={[styles.actionButtonText, styles.dangerText]}>🗑️ Очистить все данные</Text>
        </TouchableOpacity>
      </SettingCard>

      {/* Информация о приложении */}
      <SettingCard title="ℹ️ О приложении">
        <SettingRow label="Версия" value="1.0.0" />
        <SettingRow label="Система" value="ЗОЖ 4.0" />
        <SettingRow label="Платформа" value="React Native + Expo" />
        <SettingRow label="Разработчик" value="Mussasi Team" />
      </SettingCard>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💙 Создано с заботой о здоровье
        </Text>
        <Text style={styles.footerSubtext}>
          Mussasi • Персональная система ЗОЖ 4.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 15,
  },
  profileSection: {
    gap: 15,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#1C1C1E',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  saveButton: {
    marginTop: 10,
  },
  saveButtonGradient: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingLabel: {
    fontSize: 16,
    color: '#1C1C1E',
    flex: 1,
    marginRight: 10,
  },
  settingValue: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 5,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
  dangerButton: {
    backgroundColor: '#FFEBEE',
  },
  dangerText: {
    color: '#FF3B30',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 120, // Увеличенный отступ для нижней навигации
  },
  footerText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  footerSubtext: {
    fontSize: 14,
    color: '#C7C7CC',
    marginTop: 5,
  },
});

export default SettingsScreen;
