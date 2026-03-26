import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Mail, Lock } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = React.useContext(AuthContext);

  const handleSignup = () => {
    const defaultName = email ? email.split('@')[0] : 'Nouvel Utilisateur';
    login(defaultName.charAt(0).toUpperCase() + defaultName.slice(1), email || 'nouvel_utilisateur@example.com');
    navigation.navigate('SetPassword');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign up</Text>
          <Text style={styles.subtitle}>Domino,s pizza</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <CustomInput 
            icon={Mail}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <CustomInput 
            icon={Lock}
            placeholder="********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Confirm password</Text>
          <CustomInput 
            icon={Lock}
            placeholder="********"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <CustomButton 
            title="Sign up" 
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
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Log in</Text>
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
