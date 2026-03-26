import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Info, ScanFace } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/CustomButton';

const ScanQRScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan QR Code</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Info color={Colors.text} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
         <View style={styles.scannerFrame}>
            {/* Corner brackets */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            {/* Fake QR code and scan line */}
            <ScanFace size={120} color={Colors.text} />
            <View style={styles.scanLine} />
         </View>
      </View>

      <View style={styles.footer}>
         <CustomButton 
           title="My QRCode" 
           onPress={() => {}} 
           style={styles.btn}
           type="outline"
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
  
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scannerFrame: { width: 250, height: 250, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: Colors.primary, borderWidth: 0 },
  topLeft: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 20 },
  topRight: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 20 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 20 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 20 },
  scanLine: { position: 'absolute', top: '50%', left: 20, right: 20, height: 2, backgroundColor: Colors.primary, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 10, elevation: 5 },
  
  footer: { padding: 20, paddingBottom: 30 },
  btn: { width: '100%', borderColor: Colors.primary }
});

export default ScanQRScreen;
