import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Utilisateur', // Initial generic name
    email: 'utilisateur@example.com',
    profilePic: null, // null means use placeholder
  });

  const updateProfilePic = (uri) => {
    setUser((prev) => ({ ...prev, profilePic: uri }));
  };

  const login = (name, email) => {
    setUser((prev) => ({ ...prev, name, email }));
  };

  return (
    <AuthContext.Provider value={{ user, updateProfilePic, login }}>
      {children}
    </AuthContext.Provider>
  );
};
