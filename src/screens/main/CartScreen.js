import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ChevronLeft, MoreHorizontal, Plus, Minus, Trash2 } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/CustomButton';
import { CartContext } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

const CartScreen = ({ navigation }) => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getSubtotal, 
    getTotal, 
    deliveryFee 
  } = useContext(CartContext);
  const languageContext = useLanguage();
  const t = languageContext?.t || ((key) => key); // Safe fallback

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('cart.title')}</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <MoreHorizontal color={Colors.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('cart.empty')}</Text>
            <CustomButton 
              title={t('common.browsePizzas')} 
              onPress={() => navigation.navigate('HomeTab')} 
              style={{marginTop: 20, width: 200}}
            />
          </View>
        ) : (
          <>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                 <Image source={{ uri: item.image }} style={styles.itemImagePlaceholder} />
                 <View style={styles.itemDetails}>
                   <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                   <Text style={styles.itemPrice}>{item.price} FCFA</Text>
                 </View>
                 
                 <View style={styles.qtyContainer}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>
                      <Minus size={14} color={Colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>
                      <Plus size={14} color={Colors.text} />
                    </TouchableOpacity>
                 </View>

                 <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteBtn}>
                    <Trash2 size={20} color={Colors.primary} />
                 </TouchableOpacity>
              </View>
            ))}

            <View style={styles.summaryContainer}>
               <View style={styles.summaryRow}>
                 <Text style={styles.summaryLabel}>{t('cart.subtotal')}</Text>
                 <Text style={styles.summaryValue}>{getSubtotal()} FCFA</Text>
               </View>
               <View style={styles.summaryRow}>
                 <Text style={styles.summaryLabel}>{t('cart.delivery')}</Text>
                 <Text style={styles.summaryValue}>{deliveryFee} FCFA</Text>
               </View>
               <View style={[styles.summaryRow, { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.border }]}>
                 <Text style={[styles.summaryLabel, { fontWeight: 'bold', color: Colors.text }]}>{t('cart.total')}</Text>
                 <Text style={[styles.summaryValue, { color: Colors.primary }]}>{getTotal()} FCFA</Text>
               </View>
            </View>

            <CustomButton 
              title={t('cart.checkout')} 
              onPress={() => navigation.navigate('Checkout')} 
              style={styles.checkoutBtn}
            />
          </>
        )}
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
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 },
  emptyText: { fontSize: 18, color: Colors.textLight, fontWeight: '500' },
  cartItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: 20, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  itemImagePlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,75,75,0.2)' },
  itemDetails: { flex: 1, marginLeft: 15, marginRight: 10 },
  itemName: { fontSize: 15, fontWeight: '600', color: Colors.text },
  itemPrice: { fontSize: 15, fontWeight: 'bold', color: Colors.primary, marginTop: 8 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background, borderRadius: 20, padding: 4 },
  qtyBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  qtyText: { fontSize: 14, fontWeight: 'bold', marginHorizontal: 10, color: Colors.text },
  deleteBtn: { marginLeft: 15, padding: 5 },
  summaryContainer: { marginTop: 30, marginBottom: 20, backgroundColor: Colors.white, borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  summaryLabel: { fontSize: 16, color: Colors.textLight, fontWeight: '500' },
  summaryValue: { fontSize: 16, color: Colors.text, fontWeight: 'bold' },
  checkoutBtn: { marginTop: 10 }
});

export default CartScreen;
