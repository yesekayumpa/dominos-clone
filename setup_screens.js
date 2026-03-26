const fs = require('fs');
const path = require('path');

const screens = [
  'src/screens/auth/SplashScreen.js',
  'src/screens/auth/WelcomeScreen.js',
  'src/screens/auth/LoginScreen.js',
  'src/screens/auth/SignUpScreen.js',
  'src/screens/auth/SetPasswordScreen.js',
  'src/screens/main/HomeScreen.js',
  'src/screens/main/CartScreen.js',
  'src/screens/main/OrdersScreen.js',
  'src/screens/main/ProfileScreen.js',
  'src/screens/shared/TrackOrderScreen.js',
  'src/screens/shared/AddressScreen.js',
  'src/screens/shared/ScanQRScreen.js',
  'src/screens/shared/SuccessScreen.js'
];

screens.forEach(file => {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const componentName = path.basename(file, '.js');
  // Adjust import path based on depth
  const depth = file.split('/').length - 2;
  const themePath = depth === 2 ? '../../theme/colors' : '../theme/colors';
  
  const content = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '${themePath}';

const ${componentName} = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>${componentName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: Colors.text,
  }
});

export default ${componentName};
`;
  
  if (!fs.existsSync(file)) fs.writeFileSync(file, content);
});
console.log('Screens created.');
