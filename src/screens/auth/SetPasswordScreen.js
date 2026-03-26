import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { CircleCheckBig } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/CustomButton';

const SetPasswordScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome again!</Text>
          <Text style={styles.subtitle}>Login and sit for your domino,s pizza</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <CircleCheckBig size={80} color={Colors.primary} />
          </View>
          <Text style={styles.successTitle}>Successfully</Text>
          <Text style={styles.successDesc}>
            You are successfully reached in Batam's station
          </Text>
        </View>

        <View style={styles.footer}>
          <CustomButton 
            title="Done" 
            onPress={() => navigation.navigate('Main')} 
            style={styles.doneBtn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginVertical: 40,
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 30,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  successDesc: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingBottom: 20,
  },
  doneBtn: {
    width: '100%',
  }
});

export default SetPasswordScreen;
