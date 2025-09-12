import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { CurrentMealWidget, ShoppingWidget, NutritionProgressWidget } from '../components/NutritionWidgets';
import SchedulePreview from '../components/SchedulePreview';

export default function HomeScreen({ navigation }) {
  const [blocks, setBlocks] = useState([
    { id: 1, title: 'Ментальное', type: 'mental', value: 0, target: 100, color: COLORS.secondary },
    { id: 2, title: 'Питание', type: 'nutrition', value: 0, target: 100, color: COLORS.success },
    { id: 3, title: 'Движение', type: 'movement', value: 0, target: 100, color: COLORS.warning },
    { id: 4, title: 'Восстановление', type: 'recovery', value: 0, target: 100, color: COLORS.primary },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const updateBlock = (blockId, newValue) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, value: Math.min(newValue, block.target) } : block
    ));
  };

  const handleBlockPress = (block) => {
    setSelectedBlock(block);
    setInputValue(block.value.toString());
    setModalVisible(true);
  };

  const handleSave = () => {
    if (selectedBlock) {
      const value = parseInt(inputValue) || 0;
      updateBlock(selectedBlock.id, value);
    }
    setModalVisible(false);
    setSelectedBlock(null);
    setInputValue('');
  };

  const BlockComponent = ({ block, onPress }) => (
    <TouchableOpacity style={styles.block} onPress={() => onPress(block)}>
      <View style={styles.blockHeader}>
        <Text style={styles.blockTitle}>{block.title}</Text>
        <Text style={styles.blockValue}>{block.value}/{block.target}</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${(block.value / block.target) * 100}%`,
                backgroundColor: block.color 
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{Math.round((block.value / block.target) * 100)}%</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Заголовок */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ЗОЖ 4.0</Text>
          <Text style={styles.headerSubtitle}>Система здорового образа жизни</Text>
        </View>

        {/* Блоки ЗОЖ 4.0 */}
        <View style={styles.blocksContainer}>
          {blocks.map((block) => (
            <BlockComponent 
              key={block.id} 
              block={block} 
              onPress={handleBlockPress}
            />
          ))}
        </View>

        {/* Виджеты питания */}
        <CurrentMealWidget onPress={() => navigation.navigate('Nutrition')} />
        <ShoppingWidget onPress={() => navigation.navigate('Nutrition')} />
        <NutritionProgressWidget onPress={() => navigation.navigate('Nutrition')} />

        {/* Превью расписания */}
        <SchedulePreview />
      </ScrollView>

      {/* Модальное окно редактирования */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedBlock?.title}
            </Text>
            <TextInput
              style={styles.modalInput}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
              placeholder="Введите значение"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Сохранить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  blocksContainer: {
    marginBottom: 30,
  },
  block: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  blockValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    minWidth: 35,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.border,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  saveButtonText: {
    color: COLORS.surface,
    fontWeight: '600',
  },
});
