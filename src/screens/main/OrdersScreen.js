import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { ChevronLeft, Search, Filter, Package } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { useLanguage } from '../../context/LanguageContext';
import OrderCard from '../../components/OrderCard';
import OrderService from '../../services/OrderService';

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const languageContext = useLanguage();
  const t = languageContext?.t || ((key) => key);

  const filters = [
    { key: 'all', label: t('orders.all') },
    { key: 'pending', label: t('orders.pending') },
    { key: 'preparing', label: t('orders.preparing') },
    { key: 'ontheway', label: t('orders.onTheWay') },
    { key: 'delivered', label: t('orders.delivered') },
    { key: 'cancelled', label: t('orders.cancelled') },
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const ordersData = await OrderService.getAllOrders();
      setOrders(ordersData);
      setFilteredOrders(ordersData);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const handleFilterChange = async (filterKey) => {
    setActiveFilter(filterKey);
    setShowFilters(false);
    
    try {
      if (filterKey === 'all') {
        setFilteredOrders(orders);
      } else {
        const filtered = await OrderService.getOrdersByStatus(filterKey);
        setFilteredOrders(filtered);
      }
    } catch (error) {
      console.error('Error filtering orders:', error);
    }
  };

  const handleTrackOrder = (order) => {
    navigation.navigate('TrackOrder', { orderId: order.id });
  };

  const handleOrderAgain = (order) => {
    // Add items back to cart
    console.log('Order again:', order);
    navigation.navigate('HomeTab');
  };

  const handleViewDetails = (order) => {
    navigation.navigate('OrderDetails', { orderId: order.id });
  };

  const getOrderStats = () => {
    return OrderService.getOrderStats(orders);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('orders.orderHistory')}</Text>
        <TouchableOpacity style={styles.headerBtn} onPress={() => setShowFilters(!showFilters)}>
          <Filter color={Colors.text} size={24} />
        </TouchableOpacity>
      </View>

      {/* Filter Pills */}
      {showFilters && (
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterPill,
                  activeFilter === filter.key && styles.filterPillActive
                ]}
                onPress={() => handleFilterChange(filter.key)}
              >
                <Text style={[
                  styles.filterText,
                  activeFilter === filter.key && styles.filterTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Stats Cards */}
      {!isLoading && orders.length > 0 && (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Package size={20} color={Colors.primary} />
            <Text style={styles.statNumber}>{getOrderStats().delivered}</Text>
            <Text style={styles.statLabel}>{t('orders.delivered')}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{getOrderStats().totalSpent}</Text>
            <Text style={styles.statLabel}>FCFA</Text>
          </View>
        </View>
      )}

      <ScrollView 
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>{t('common.loading')}</Text>
          </View>
        ) : filteredOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Package size={48} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>{t('orders.noOrders')}</Text>
            <Text style={styles.emptySubtitle}>{t('orders.startOrdering')}</Text>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => navigation.navigate('HomeTab')}
            >
              <Text style={styles.startButtonText}>{t('menu.pizza')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={{ ...order, t }}
              onPress={() => handleViewDetails(order)}
              onTrackOrder={() => handleTrackOrder(order)}
              onOrderAgain={() => handleOrderAgain(order)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  headerBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  
  filterContainer: { 
    paddingHorizontal: 20, 
    paddingBottom: 15,
    backgroundColor: Colors.background 
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 10,
  },
  filterPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  filterTextActive: {
    color: Colors.white,
  },
  
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
  },
  
  container: { 
    paddingHorizontal: 20, 
    paddingBottom: 20 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  startButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrdersScreen;
