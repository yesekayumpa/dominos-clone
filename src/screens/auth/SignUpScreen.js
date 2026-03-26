import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Mail, Lock, User } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const languageContext = useLanguage();
  const t = languageContext?.t || ((key) => key); // Safe fallback
  const handleSignup = () => {
    // Basic validation
    if (!email || !password || password !== confirmPassword) {
      alert(t('auth.passwordMismatch'));
      return;
    }
    
    const defaultName = email.split('@')[0];
    const nameToUse = fullName.trim() || defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
    
    // Pass info to next screen, will login there
    navigation.navigate('SetPassword', { 
      name: nameToUse, 
      email: email 
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('auth.register')}</Text>
          <Text style={styles.subtitle}>Domino's pizza</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>{t('auth.fullName')}</Text>
          <CustomInput 
            icon={User}
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <Text style={styles.label}>{t('auth.email')}</Text>
          <CustomInput 
            icon={Mail}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>{t('auth.password')}</Text>
          <CustomInput 
            icon={Lock}
            placeholder="********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>{t('auth.confirmPassword')}</Text>
          <CustomInput 
            icon={Lock}
            placeholder="********"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <CustomButton 
            title={t('auth.register')} 
            onPress={handleSignup} 
            style={styles.signupBtn}
          />

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialContainer}>
             <TouchableOpacity style={styles.socialBtn}>
                <Text style={styles.socialText}>Google</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.socialBtn}>
                <Text style={styles.socialText}>Facebook</Text>
             </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>{t('auth.haveAccount')} </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>{t('auth.login')}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginTop: 8,
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
  signupBtn: {
    marginTop: 20,
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  orText: {
    marginHorizontal: 15,
    color: Colors.textLight,
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  socialText: {
    fontWeight: '600',
    color: Colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    color: Colors.textLight,
  },
  footerLink: {
    color: Colors.primary,
    fontWeight: 'bold',
  }
});

export default SignUpScreen;
