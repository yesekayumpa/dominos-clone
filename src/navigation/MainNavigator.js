import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, ShoppingBag, List, User } from 'lucide-react-native';
import HomeScreen from '../screens/main/HomeScreen';
import CartScreen from '../screens/main/CartScreen';
import OrdersScreen from '../screens/main/OrdersScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { Colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: {
          backgroundColor: Colors.black,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="CartTab" 
        component={CartScreen} 
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => <ShoppingBag color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="OrdersTab" 
        component={OrdersScreen} 
        options={{
          tabBarLabel: 'My Order',
          tabBarIcon: ({ color, size }) => <List color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
