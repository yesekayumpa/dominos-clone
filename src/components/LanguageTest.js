import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const LanguageTest = () => {
  const { t, language, isReady } = useLanguage();
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Language: {language}</Text>
      <Text style={styles.text}>Is Ready: {isReady ? 'Yes' : 'No'}</Text>
      <Text style={styles.text}>Test Translation: {t('common.hello')}</Text>
      <Text style={styles.text}>Test Nav: {t('navigation.home')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default LanguageTest;
