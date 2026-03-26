import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ChevronLeft, MapPin, Clock, Phone, Star, Package } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { useLanguage } from '../../context/LanguageContext';
import OrderService from '../../services/OrderService';

const OrderDetailsScreen = ({ navigation, route }) => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const languageContext = useLanguage();
  const t = languageContext?.t || ((key) => key);

  useEffect(() => {
    loadOrderDetails();
  }, []);

  const loadOrderDetails = async () => {
    try {
      setIsLoading(true);
      const orderId = route.params?.orderId;
      if (orderId) {
        const orderData = await OrderService.getOrderById(orderId);
        setOrder(orderData);
      }
    } catch (error) {
      console.error('Error loading order details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = () => {
    if (!order) return Colors.textLight;
    switch (order.status) {
      case 'pending': return '#FFA500';
      case 'preparing': return '#4285F4';
      case 'ontheway': return '#34A853';
      case 'delivered': return '#34A853';
      case 'cancelled': return '#EA4335';
      default: return Colors.textLight;
    }
  };

  const getStatusText = () => {
    if (!order) return '';
    switch (order.status) {
      case 'pending': return t('orders.pending');
      case 'preparing': return t('orders.preparing');
      case 'ontheway': return t('orders.onTheWay');
      case 'delivered': return t('orders.delivered');
      case 'cancelled': return t('orders.cancelled');
      default: return order.status;
    }
  };

  const handleTrackOrder = () => {
    navigation.navigate('TrackOrder', { orderId: order.id });
  };

  const handleReorder = () => {
    Alert.alert(
      t('orders.orderAgain'),
      'This will add all items from this order to your cart.',
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('common.confirm'), onPress: () => console.log('Reordering:', order.id) }
      ]
    );
  };

  const handleCallRestaurant = () => {
    // Mock phone call
    Alert.alert('Call Restaurant', '+1 234 567 8900');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft color={Colors.text} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('orders.orderNumber')}...</Text>
          <View style={{width: 44}} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t('common.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft color={Colors.text} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('common.error')}</Text>
          <View style={{width: 44}} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Order not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('orders.orderNumber')} {order.orderNumber}</Text>
        <View style={{width: 44}} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Order Status */}
        <View style={styles.statusCard}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
          <View style={styles.statusInfo}>
            <Text style={styles.statusText}>{getStatusText()}</Text>
            <Text style={styles.statusDate}>{order.date}</Text>
          </View>
        </View>

        {/* Restaurant Info */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Restaurant</Text>
          <View style={styles.restaurantInfo}>
            <View style={styles.restaurantDetails}>
              <Text style={styles.restaurantName}>{order.restaurant}</Text>
              <Text style={styles.restaurantAddress}>{order.address}</Text>
            </View>
            <TouchableOpacity style={styles.callButton} onPress={handleCallRestaurant}>
              <Phone size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          ))}
        </View>

        {/* Delivery Info */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          <View style={styles.deliveryInfo}>
            <View style={styles.infoRow}>
              <Clock size={16} color={Colors.textLight} />
              <Text style={styles.infoText}>{order.deliveryTime}</Text>
            </View>
            <View style={styles.infoRow}>
              <MapPin size={16} color={Colors.textLight} />
              <Text style={styles.infoText}>{order.address}</Text>
            </View>
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.priceBreakdown}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal</Text>
              <Text style={styles.priceValue}>{order.totalPrice}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Delivery Fee</Text>
              <Text style={styles.priceValue}>{order.deliveryFee}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Tax</Text>
              <Text style={styles.priceValue}>{order.tax}</Text>
            </View>
            <View style={[styles.priceRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{order.totalPrice}</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {order.status === 'delivered' && (
            <TouchableOpacity style={styles.actionButton} onPress={handleReorder}>
              <Package size={20} color={Colors.white} />
              <Text style={styles.actionButtonText}>{t('orders.orderAgain')}</Text>
            </TouchableOpacity>
          )}
          
          {order.status === 'ontheway' && (
            <TouchableOpacity style={[styles.actionButton, styles.trackButton]} onPress={handleTrackOrder}>
              <MapPin size={20} color={Colors.white} />
              <Text style={styles.actionButtonText}>{t('orders.trackOrder')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  headerBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  
  container: { paddingHorizontal: 20, paddingBottom: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, color: Colors.textLight },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: Colors.textLight },

  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statusIndicator: { width: 8, height: 8, borderRadius: 4, marginRight: 15 },
  statusInfo: { flex: 1 },
  statusText: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  statusDate: { fontSize: 14, color: Colors.textLight, marginTop: 2 },

  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 15 },

  restaurantInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  restaurantDetails: { flex: 1 },
  restaurantName: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  restaurantAddress: { fontSize: 14, color: Colors.textLight, marginTop: 4 },
  callButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },

  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, color: Colors.text, fontWeight: '500' },
  itemQuantity: { fontSize: 14, color: Colors.textLight, marginTop: 2 },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: Colors.primary },

  deliveryInfo: { marginTop: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoText: { fontSize: 14, color: Colors.textLight, marginLeft: 8 },

  priceBreakdown: { marginTop: 10 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  priceLabel: { fontSize: 14, color: Colors.textLight },
  priceValue: { fontSize: 14, color: Colors.text, fontWeight: '500' },
  totalRow: { paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.border },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  totalValue: { fontSize: 16, fontWeight: 'bold', color: Colors.primary },

  actionsContainer: { marginTop: 20 },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 20,
  },
  trackButton: { backgroundColor: Colors.primary },
  actionButtonText: { fontSize: 16, fontWeight: 'bold', color: Colors.white, marginLeft: 10 },
});

export default OrderDetailsScreen;
