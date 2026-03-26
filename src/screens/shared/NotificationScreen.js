import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Bell, Gift, ShoppingBag, MapPin } from 'lucide-react-native';
import { Colors } from '../../theme/colors';

const NotificationScreen = ({ navigation }) => {
  const notifications = [
    { id: '1', title: 'Order Arriving Soon!', desc: 'Your driver is 5 minutes away.', time: '10m ago', icon: MapPin, type: 'delivery', unread: true },
    { id: '2', title: 'Order Confirmed', desc: 'Your order #4892 is being prepared.', time: '30m ago', icon: ShoppingBag, type: 'order', unread: true },
    { id: '3', title: 'Weekend Promo 🍕', desc: 'Get 20% off all large pizzas this weekend only!', time: '1d ago', icon: Gift, type: 'promo', unread: false },
    { id: '4', title: 'Welcome to Domino\'s', desc: 'Thanks for joining us. Check out our popular menu.', time: '2d ago', icon: Bell, type: 'system', unread: false },
  ];

  const getIconColor = (type) => {
    switch(type) {
      case 'delivery': return Colors.primary;
      case 'order': return '#4CAF50';
      case 'promo': return '#FF9800';
      default: return Colors.textLight;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{width: 44}} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {notifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <TouchableOpacity key={notif.id} style={[styles.notificationCard, notif.unread && styles.unreadCard]}>
              <View style={styles.iconContainer}>
                 <Icon color={getIconColor(notif.type)} size={24} />
                 {notif.unread && <View style={styles.unreadDotBadge} />}
              </View>
              <View style={styles.textContainer}>
                 <View style={styles.titleRow}>
                    <Text style={[styles.title, notif.unread && styles.unreadText]}>{notif.title}</Text>
                    <Text style={styles.time}>{notif.time}</Text>
                 </View>
                 <Text style={styles.desc}>{notif.desc}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{height: 50}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  headerBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  container: { paddingHorizontal: 20, paddingBottom: 20 },

  notificationCard: { flexDirection: 'row', backgroundColor: Colors.white, borderRadius: 20, padding: 16, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  unreadCard: { backgroundColor: Colors.primaryLight },
  
  iconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  unreadDotBadge: { position: 'absolute', top: 5, right: 5, width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary, borderWidth: 2, borderColor: Colors.white },
  
  textContainer: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  title: { fontSize: 16, fontWeight: '600', color: Colors.text, flex: 1 },
  unreadText: { fontWeight: 'bold' },
  time: { fontSize: 12, color: Colors.textLight, marginLeft: 10 },
  desc: { fontSize: 14, color: Colors.textLight, lineHeight: 20 }
});

export default NotificationScreen;
