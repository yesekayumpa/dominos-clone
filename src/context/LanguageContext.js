import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import en from '../locales/en.json';
import fr from '../locales/fr.json';

const translations = {
  en,
  fr,
};

// Create a default context value that's always safe
const defaultContextValue = {
  language: 'en',
  changeLanguage: async () => {},
  t: (key) => key,
  isLoading: true,
  isReady: false,
  availableLanguages: ['en', 'fr'],
};

const LanguageContext = createContext(defaultContextValue);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  // Always return the context, which has safe default values
  return context || defaultContextValue;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const t = React.useCallback((key) => {
    // Always return a function, even if not ready
    if (!isReady) return key;
    
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in English either
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }, [language, isReady]);

  const value = React.useMemo(() => ({
    language,
    changeLanguage,
    t,
    isLoading,
    isReady,
    availableLanguages: Object.keys(translations),
  }), [language, changeLanguage, t, isLoading, isReady]);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage && translations[savedLanguage]) {
        setLanguage(savedLanguage);
      } else {
        // Use device locale as fallback
        const deviceLocale = Localization.locale;
        if (deviceLocale) {
          const deviceLanguage = deviceLocale.split('-')[0];
          if (translations[deviceLanguage]) {
            setLanguage(deviceLanguage);
          }
        }
        // Default to English if no device locale or unsupported language
      }
    } catch (error) {
      console.error('Error loading language:', error);
    } finally {
      setIsLoading(false);
      setIsReady(true);
    }
  };

  const changeLanguage = React.useCallback(async (lang) => {
    if (translations[lang]) {
      try {
        await AsyncStorage.setItem('language', lang);
        setLanguage(lang);
      } catch (error) {
        console.error('Error saving language:', error);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
