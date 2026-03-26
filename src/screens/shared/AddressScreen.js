import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, Home, Briefcase, MapPin } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/CustomButton';

const AddressScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('1');
  
  const addresses = [
    { id: '1', type: 'Home', address: '4233 Kimball Ave. Chicago, IL 60618', icon: Home },
    { id: '2', type: 'Work', address: '4233 Logan St. Oldsmar, Delaware 10299', icon: Briefcase },
    { id: '3', type: 'Other', address: '5012 Hardcove Yohanban 32442', icon: MapPin },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Address</Text>
        <View style={{width: 44}} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
         {addresses.map((item) => {
           const Icon = item.icon;
           const isSelected = selected === item.id;
           return (
             <TouchableOpacity 
                key={item.id} 
                style={[styles.addressCard, isSelected && styles.addressCardSelected]}
                onPress={() => setSelected(item.id)}
             >
                <View style={styles.iconWrap}>
                  <Icon size={24} color={isSelected ? Colors.primary : Colors.textLight} />
                </View>
                <View style={styles.addressInfo}>
                  <Text style={[styles.typeTitle, isSelected && styles.typeTitleSelected]}>{item.type}</Text>
                  <Text style={styles.addressText}>{item.address}</Text>
                </View>
                <View style={styles.radioContainer}>
                   <View style={[styles.radioOutline, isSelected && styles.radioOutlineSelected]}>
                     {isSelected && <View style={styles.radioInner} />}
                   </View>
                </View>
             </TouchableOpacity>
           );
         })}
      </ScrollView>

      <View style={styles.footer}>
         <CustomButton 
           title="ADD NEW ADDRESS" 
           onPress={() => {}} 
           style={styles.addBtn}
         />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  headerBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  container: { paddingHorizontal: 20, paddingTop: 10 },
  addressCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: 20, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: Colors.border },
  addressCardSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  iconWrap: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  addressInfo: { flex: 1, marginLeft: 15 },
  typeTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 5 },
  typeTitleSelected: { color: Colors.primary },
  addressText: { fontSize: 13, color: Colors.textLight, lineHeight: 20 },
  radioContainer: { paddingLeft: 10 },
  radioOutline: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center' },
  radioOutlineSelected: { borderColor: Colors.primary },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.primary },
  footer: { padding: 20, paddingBottom: 30 },
  addBtn: { width: '100%' }
});

export default AddressScreen;
