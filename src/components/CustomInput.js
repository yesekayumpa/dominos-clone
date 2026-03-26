import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { Colors } from '../theme/colors';

const CustomInput = ({ icon: Icon, placeholder, secureTextEntry, value, onChangeText, keyboardType, style }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focusedContainer, style]}>
      {Icon && <Icon size={20} color={isFocused ? Colors.primary : Colors.textLight} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textLight}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
          {isPasswordVisible ? (
            <Eye size={20} color={Colors.textLight} />
          ) : (
            <EyeOff size={20} color={Colors.textLight} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 28,
    height: 56,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  focusedContainer: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    height: '100%',
    color: Colors.text,
    fontSize: 16,
  },
  icon: {
    marginRight: 12,
  },
  eyeIcon: {
    padding: 5,
  }
});

export default CustomInput;
