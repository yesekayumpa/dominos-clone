import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Mail, ArrowLeft } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSendResetLink = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    // Simulate sending email
    setIsSent(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color={Colors.text} size={24} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            {isSent 
              ? "Check your email for recovery instructions." 
              : "Enter your email address to recover your password."}
          </Text>
        </View>

        {!isSent ? (
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <CustomInput 
              icon={Mail}
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <CustomButton 
              title="Send Reset Link" 
              onPress={handleSendResetLink} 
              style={styles.resetBtn}
            />
          </View>
        ) : (
          <View style={styles.form}>
             <CustomButton 
              title="Return to Login" 
              onPress={() => navigation.navigate('Login')} 
              style={styles.resetBtn}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 8,
    marginBottom: -5,
    marginTop: 10,
    fontWeight: '500',
  },
  resetBtn: {
    marginTop: 30,
    marginBottom: 20,
  }
});

export default ForgotPasswordScreen;
