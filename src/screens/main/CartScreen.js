import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ChevronLeft, MoreHorizontal } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/CustomButton';

const CartScreen = ({ navigation }) => {
  const cartItems = [
    { id: '1', name: 'Delicious Pizza', desc: 'hot beef pizza', price: '8500 FCFA', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200' },
    { id: '2', name: 'Spaghetti bloui', desc: 'hot beef pasta', price: '4500 FCFA', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200' },
    { id: '3', name: 'Chicken salads', desc: 'fresh tender chicken', price: '3000 FCFA', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200' },
    { id: '4', name: 'Frutti beef pizza', desc: 'hot beef pizza', price: '9000 FCFA', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <MoreHorizontal color={Colors.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
             <Image source={{ uri: item.image }} style={styles.itemImagePlaceholder} />
             <View style={styles.itemDetails}>
               <Text style={styles.itemName}>{item.name}</Text>
               <Text style={styles.itemDesc}>{item.desc}</Text>
               <Text style={styles.itemPrice}>{item.price}</Text>
             </View>
          </View>
        ))}

        <View style={styles.summaryContainer}>
           <View style={styles.summaryRow}>
             <Text style={styles.summaryLabel}>Subtotal</Text>
             <Text style={styles.summaryValue}>25000 FCFA</Text>
           </View>
           <View style={styles.summaryRow}>
             <Text style={styles.summaryLabel}>Total</Text>
             <Text style={styles.summaryValue}>28000 FCFA</Text>
           </View>
        </View>

        <CustomButton 
          title="Checkout" 
          onPress={() => navigation.navigate('Success')} 
          style={styles.checkoutBtn}
        />
        <View style={{height: 100}} />
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
  cartItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primaryLight, borderRadius: 20, padding: 15, marginBottom: 15 },
  itemImagePlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,75,75,0.2)' },
  itemDetails: { flex: 1, marginLeft: 15 },
  itemName: { fontSize: 16, fontWeight: '600', color: Colors.text },
  itemDesc: { fontSize: 12, color: Colors.textLight, marginTop: 4 },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: Colors.primary, marginTop: 8 },
  summaryContainer: { marginTop: 30, marginBottom: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  summaryLabel: { fontSize: 16, color: Colors.textLight, fontWeight: '500' },
  summaryValue: { fontSize: 16, color: Colors.text, fontWeight: 'bold' },
  checkoutBtn: { marginTop: 10 }
});

export default CartScreen;
