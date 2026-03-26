import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          const storedUser = await AsyncStorage.getItem('userData');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (e) {
        console.error("Failed to restore token", e);
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const updateProfilePic = async (uri) => {
    try {
      const newUser = { ...user, profilePic: uri };
      await AsyncStorage.setItem('userData', JSON.stringify(newUser));
      setUser(newUser);
    } catch (e) {
      console.error("Failed to update profile pic", e);
    }
  };

  const updateUser = async (userData) => {
    try {
      const updatedUser = { ...user, ...userData };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (e) {
      console.error("Failed to update user data", e);
      throw e;
    }
  };

  const login = async (name, email) => {
    const userData = {
      name,
      email,
      phone: '',
      profilePic: null,
    };
    try {
      await AsyncStorage.setItem('userToken', 'dummy-jwt-token');
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
    } catch (e) {
      console.error("Failed to save session", e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      setUser(null);
    } catch (e) {
      console.error("Failed to clear session", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, updateProfilePic, updateUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
