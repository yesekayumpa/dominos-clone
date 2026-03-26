import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ChevronLeft, Tag, Plus, Check } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { useLanguage } from '../../context/LanguageContext';

const PromocodesScreen = ({ navigation }) => {
  const [promoCode, setPromoCode] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const languageContext = useLanguage();
  const t = languageContext?.t || ((key) => key);

  const promocodes = [
    { 
      id: '1', 
      code: 'PIZZA20', 
      discount: '20%', 
      description: 'Get 20% off on all pizzas',
      validUntil: '2024-12-31',
      isActive: true
    },
    { 
      id: '2', 
      code: 'WELCOME10', 
      discount: '10%', 
      description: 'Welcome discount for new users',
      validUntil: '2024-06-30',
      isActive: false
    },
    { 
      id: '3', 
      code: 'WEEKEND25', 
      discount: '25%', 
      description: 'Weekend special offer',
      validUntil: '2024-12-31',
      isActive: true
    },
    { 
      id: '4', 
      code: 'FREEDelivery', 
      discount: 'Free Delivery', 
      description: 'Free delivery on orders above 5000 FCFA',
      validUntil: '2024-11-30',
      isActive: true
    },
  ];

  const handleAddPromo = () => {
    if (promoCode.trim()) {
      console.log('Adding promo code:', promoCode);
      setPromoCode('');
      setShowAddForm(false);
    }
  };

  const handleApplyPromo = (code) => {
    console.log('Applying promo code:', code);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('profile.promocodes')}</Text>
        <TouchableOpacity style={styles.headerBtn} onPress={() => setShowAddForm(!showAddForm)}>
          <Plus color={Colors.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Add Promo Code Form */}
        {showAddForm && (
          <View style={styles.addForm}>
            <TextInput
              style={styles.input}
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddPromo}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Active Promocodes */}
        <Text style={styles.sectionTitle}>Active Promocodes</Text>
        {promocodes.filter(p => p.isActive).map((promo) => (
          <View key={promo.id} style={styles.promoCard}>
            <View style={styles.promoHeader}>
              <View style={styles.promoCodeContainer}>
                <Tag size={20} color={Colors.primary} />
                <Text style={styles.promoCode}>{promo.code}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: '#34A853' }]}>
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>
            <Text style={styles.description}>{promo.description}</Text>
            <View style={styles.promoFooter}>
              <Text style={styles.discount}>{promo.discount}</Text>
              <TouchableOpacity 
                style={styles.applyButton} 
                onPress={() => handleApplyPromo(promo.code)}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.validUntil}>Valid until {promo.validUntil}</Text>
          </View>
        ))}

        {/* Expired Promocodes */}
        {promocodes.filter(p => !p.isActive).length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Expired Promocodes</Text>
            {promocodes.filter(p => !p.isActive).map((promo) => (
              <View key={promo.id} style={[styles.promoCard, styles.expiredCard]}>
                <View style={styles.promoHeader}>
                  <View style={styles.promoCodeContainer}>
                    <Tag size={20} color={Colors.textLight} />
                    <Text style={[styles.promoCode, { color: Colors.textLight }]}>{promo.code}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: '#EA4335' }]}>
                    <Text style={styles.statusText}>Expired</Text>
                  </View>
                </View>
                <Text style={[styles.description, { color: Colors.textLight }]}>{promo.description}</Text>
                <Text style={[styles.validUntil, { color: Colors.textLight }]}>Expired on {promo.validUntil}</Text>
              </View>
            ))}
          </>
        )}

        <View style={{height: 50}} />
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
  addForm: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  
  promoCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  expiredCard: {
    opacity: 0.6,
  },
  
  promoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  
  description: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 15,
    lineHeight: 20,
  },
  
  promoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  discount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  validUntil: {
    fontSize: 12,
    color: Colors.textLight,
  },
});

export default PromocodesScreen;
