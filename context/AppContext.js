import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: {
    name: 'Павел',
    university: 'РАНХиГС',
    group: '2 ИСОСП (б)',
    diabetesType: 1,
  },
  settings: {
    notifications: true,
    darkMode: false,
    insulinRatio: 5, // 1 ед на 5г углеводов
    longInsulinDose: 14,
  },
  schedule: {
    currentWeek: 1, // 1 или 2
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    case 'SET_CURRENT_WEEK':
      return {
        ...state,
        schedule: { ...state.schedule, currentWeek: action.payload },
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const updateSettings = (settings) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const setCurrentWeek = (week) => {
    dispatch({ type: 'SET_CURRENT_WEEK', payload: week });
  };

  const value = {
    ...state,
    updateSettings,
    setCurrentWeek,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
