import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ChevronLeft, Search, ShoppingBag } from 'lucide-react-native';
import { Colors } from '../../theme/colors';

const OrdersScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Pizza', 'Burger', 'Noodles', 'Drinks'];
  
  const items = [
    { id: '1', name: 'Udon with peanut Pizza', price: '35000 FCFA', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
    { id: '2', name: 'Udon with peanut Dressing', price: '35000 FCFA', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' },
    { id: '3', name: 'Beef Burger Combo', price: '15000 FCFA', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
    { id: '4', name: 'Spicy Chicken Wings', price: '12500 FCFA', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Order</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Search color={Colors.text} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
           {categories.map((cat, idx) => (
             <TouchableOpacity 
                key={idx} 
                style={styles.categoryWrap}
                onPress={() => setActiveCategory(cat)}
             >
                <View style={[styles.categoryIcon, activeCategory === cat && styles.categoryIconActive]}>
                  <Text style={{fontWeight: 'bold', color: activeCategory === cat ? Colors.white : Colors.text}}>{cat[0]}</Text>
                </View>
                <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>{cat}</Text>
             </TouchableOpacity>
           ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
         <View style={styles.grid}>
            {items.map((item) => (
              <View key={item.id} style={styles.gridItem}>
                 <Image source={{ uri: item.image }} style={styles.itemImagePlaceholder} />
                 <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                 <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            ))}
         </View>
         <View style={{height: 180}} />
      </ScrollView>

      {/* Floating Checkout Banner */}
      <View style={styles.floatingBanner}>
         <View>
            <Text style={styles.bannerLabel}>Total price</Text>
            <Text style={styles.bannerPrice}>35000 FCFA</Text>
         </View>
         <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate('CartTab')}>
            <ShoppingBag color={Colors.white} size={20} />
            <Text style={styles.checkoutText}>Checkout</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  headerBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  
  categoriesWrapper: { paddingLeft: 20, marginBottom: 20 },
  categoriesContainer: { paddingRight: 20 },
  categoryWrap: { alignItems: 'center', marginRight: 20 },
  categoryIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.primaryLight, marginBottom: 8, justifyContent: 'center', alignItems: 'center' },
  categoryIconActive: { backgroundColor: Colors.primary },
  categoryText: { fontSize: 13, color: Colors.textLight, fontWeight: '500' },
  categoryTextActive: { color: Colors.primary, fontWeight: 'bold' },
  
  gridContainer: { paddingHorizontal: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '47%', marginBottom: 20, backgroundColor: Colors.white, borderRadius: 20, padding: 10, borderWidth: 1, borderColor: Colors.border },
  itemImagePlaceholder: { width: '100%', height: 120, backgroundColor: '#FFEBEA', borderRadius: 15, marginBottom: 10 },
  itemName: { fontSize: 14, fontWeight: '600', color: Colors.text, marginBottom: 5, height: 40 },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: Colors.primary },
  
  floatingBanner: { position: 'absolute', bottom: 90, left: 20, right: 20, backgroundColor: '#902020', borderRadius: 20, padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  bannerLabel: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  bannerPrice: { fontSize: 20, fontWeight: 'bold', color: Colors.white, marginTop: 2 },
  checkoutBtn: { flexDirection: 'row', backgroundColor: '#E31837', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25, alignItems: 'center' },
  checkoutText: { color: Colors.white, fontWeight: 'bold', marginLeft: 8 }
});

export default OrdersScreen;
