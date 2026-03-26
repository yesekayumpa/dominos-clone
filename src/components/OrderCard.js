import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Clock, MapPin, ChevronRight, Package } from 'lucide-react-native';
import { Colors } from '../theme/colors';

const OrderCard = ({ order, onPress, onTrackOrder, onOrderAgain }) => {
  const getStatusColor = () => {
    switch (order.status) {
      case 'pending': return '#FFA500';
      case 'preparing': return '#4285F4';
      case 'ontheway': return '#34A853';
      case 'delivered': return '#34A853';
      case 'cancelled': return '#EA4335';
      default: return Colors.textLight;
    }
  };

  const getStatusText = (t) => {
    switch (order.status) {
      case 'pending': return t('orders.pending');
      case 'preparing': return t('orders.preparing');
      case 'ontheway': return t('orders.onTheWay');
      case 'delivered': return t('orders.delivered');
      case 'cancelled': return t('orders.cancelled');
      default: return order.status;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <Text style={styles.orderDate}>{order.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{getStatusText(order.t)}</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.itemsContainer}>
        {order.items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.itemQuantity}>x{item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
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
        
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>{order.itemCount} {order.t('orders.items')}</Text>
          <Text style={styles.totalPrice}>{order.totalPrice}</Text>
        </View>
      </View>

      {order.status === 'delivered' && (
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.orderAgainButton]} 
            onPress={onOrderAgain}
          >
            <Package size={16} color={Colors.primary} />
            <Text style={styles.orderAgainText}>{order.t('orders.orderAgain')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {order.status === 'ontheway' && (
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.trackButton]} 
            onPress={onTrackOrder}
          >
            <MapPin size={16} color={Colors.white} />
            <Text style={styles.trackButtonText}>{order.t('orders.trackOrder')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  orderDate: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  itemsContainer: {
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 8,
    minWidth: 120,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 8,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
  },
  itemQuantity: {
    fontSize: 10,
    color: Colors.textLight,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  deliveryInfo: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 6,
  },
  totalContainer: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 12,
    color: Colors.textLight,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
  },
  orderAgainButton: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  orderAgainText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 8,
  },
  trackButton: {
    backgroundColor: Colors.primary,
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
    marginLeft: 8,
  },
});

export default OrderCard;
