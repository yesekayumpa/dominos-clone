import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Colors } from '../theme/colors';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import TrackOrderScreen from '../screens/shared/TrackOrderScreen';
import AddressScreen from '../screens/shared/AddressScreen';
import ScanQRScreen from '../screens/shared/ScanQRScreen';
import SuccessScreen from '../screens/shared/SuccessScreen';
import CheckoutScreen from '../screens/shared/CheckoutScreen';
import NotificationScreen from '../screens/shared/NotificationScreen';
import OrderDetailsScreen from '../screens/shared/OrderDetailsScreen';
import PromocodesScreen from '../screens/shared/PromocodesScreen';
import FavoritesScreen from '../screens/shared/FavoritesScreen';
import EditProfileScreen from '../screens/shared/EditProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={MainNavigator} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
          <Stack.Screen name="Address" component={AddressScreen} />
          <Stack.Screen name="Promocodes" component={PromocodesScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="ScanQR" component={ScanQRScreen} />
          <Stack.Screen name="Success" component={SuccessScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
