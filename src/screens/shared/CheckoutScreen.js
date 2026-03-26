import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, MapPin, CreditCard, ChevronRight } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/CustomButton';
import { CartContext } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

const CheckoutScreen = ({ navigation }) => {
  const { cartItems, getSubtotal, getTotal, deliveryFee, clearCart } = useContext(CartContext);
  const languageContext = useLanguage();
  const t = languageContext?.t || ((key) => key); // Safe fallback
  const [paymentMethod, setPaymentMethod] = useState(t('checkout.cashOnDelivery'));

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert(t('cart.empty'));
      return;
    }
    clearCart();
    navigation.navigate('Success');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('checkout.title')}</Text>
        <View style={{width: 44}} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>{t('checkout.deliveryAddress')}</Text>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Address')}>
           <View style={styles.cardRow}>
              <View style={styles.iconBox}>
                 <MapPin color={Colors.primary} size={24} />
              </View>
              <View style={styles.cardTextContainer}>
                 <Text style={styles.cardTitle}>Home</Text>
                 <Text style={styles.cardSubtitle}>70 Washington Square South</Text>
              </View>
              <ChevronRight color={Colors.textLight} size={20} />
           </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>{t('checkout.paymentMethod')}</Text>
        <View style={styles.paymentContainer}>
           <TouchableOpacity 
             style={[styles.paymentMethod, paymentMethod === t('checkout.cashOnDelivery') && styles.paymentMethodActive]}
             onPress={() => setPaymentMethod(t('checkout.cashOnDelivery'))}
           >
              <View style={styles.paymentRadio}>
                {paymentMethod === t('checkout.cashOnDelivery') && <View style={styles.paymentRadioInner} />}
              </View>
              <Text style={styles.paymentText}>{t('checkout.cashOnDelivery')}</Text>
           </TouchableOpacity>
           <TouchableOpacity 
             style={[styles.paymentMethod, paymentMethod === 'Card' && styles.paymentMethodActive]}
             onPress={() => setPaymentMethod('Card')}
           >
              <View style={styles.paymentRadio}>
                {paymentMethod === 'Card' && <View style={styles.paymentRadioInner} />}
              </View>
              <CreditCard color={Colors.text} size={20} style={{marginRight: 10}} />
              <Text style={styles.paymentText}>{t('checkout.cardPayment')}</Text>
           </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>{t('cart.orderSummary')}</Text>
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
          title={t('checkout.placeOrder')} 
          onPress={handlePlaceOrder} 
          style={styles.checkoutBtn}
        />
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

  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginTop: 20, marginBottom: 15 },
  
  card: { backgroundColor: Colors.white, borderRadius: 20, padding: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primaryLight, justifyContent: 'center', alignItems: 'center' },
  cardTextContainer: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  cardSubtitle: { fontSize: 14, color: Colors.textLight, marginTop: 4 },

  paymentContainer: { },
  paymentMethod: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: 15, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: Colors.border },
  paymentMethodActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  paymentRadio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: Colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  paymentRadioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  paymentText: { fontSize: 16, fontWeight: '500', color: Colors.text },

  summaryContainer: { marginTop: 10, marginBottom: 20, backgroundColor: Colors.white, borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  summaryLabel: { fontSize: 16, color: Colors.textLight, fontWeight: '500' },
  summaryValue: { fontSize: 16, color: Colors.text, fontWeight: 'bold' },
  checkoutBtn: { marginTop: 20 }
});

export default CheckoutScreen;
