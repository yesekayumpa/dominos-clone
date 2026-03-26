import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Check } from 'lucide-react-native';
import { Colors } from '../../theme/colors';

const SuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={Colors.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Successfull</Text>
        <View style={{width: 44}} />
      </View>

      <View style={styles.content}>
         <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
               <Check size={60} color={Colors.white} strokeWidth={3} />
            </View>
         </View>
         <Text style={styles.successMessage}>Order Placed Successfully !</Text>
      </View>

      <View style={styles.footer}>
         <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('TrackOrder')}>
            <Text style={styles.continueText}>Track Order</Text>
         </TouchableOpacity>
         <TouchableOpacity style={[styles.continueBtn, { backgroundColor: 'transparent', marginTop: 10 }]} onPress={() => navigation.navigate('Main')}>
            <Text style={[styles.continueText, { color: Colors.white }]}>Back to Home</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.primary },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  headerBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.white },
  
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  outerCircle: { width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  innerCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.5)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: Colors.white },
  successMessage: { fontSize: 22, color: Colors.white, fontWeight: 'bold' },
  
  footer: { padding: 20, paddingBottom: 30 },
  continueBtn: { width: '100%', height: 56, borderRadius: 28, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  continueText: { fontSize: 16, fontWeight: 'bold', color: Colors.primary }
});

export default SuccessScreen;
