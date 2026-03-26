import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Map, Clock, MapPin, Phone } from 'lucide-react-native';
import { Colors } from '../../theme/colors';

const TrackOrderScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track order</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Map color={Colors.text} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
         {/* Map Placeholder */}
         <View style={styles.mapPlaceholder}>
            <Map size={48} color={Colors.primary} opacity={0.3} />
            <Text style={styles.mapText}>Map Route Here</Text>
         </View>
      </View>

      <View style={styles.bottomCard}>
         <View style={styles.infoRow}>
            <View style={styles.iconBox}>
               <Clock color={Colors.primary} size={24} />
            </View>
            <View style={styles.infoTextContainer}>
               <Text style={styles.infoTitle}>10-15 min</Text>
               <Text style={styles.infoSubtitle}>Delivery time</Text>
            </View>
         </View>
         <View style={styles.divider} />
         <View style={styles.infoRow}>
            <View style={styles.iconBox}>
               <MapPin color={Colors.primary} size={24} />
            </View>
            <View style={styles.infoTextContainer}>
               <Text style={styles.infoTitle}>70 Washington Square</Text>
               <Text style={styles.infoSubtitle}>Delivery address</Text>
            </View>
         </View>
         <View style={styles.divider} />
         <View style={[styles.infoRow, { justifyContent: 'space-between' }]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
               <View style={styles.avatarPlaceholder} />
               <View style={styles.infoTextContainer}>
                  <Text style={styles.infoTitle}>Jordan smith</Text>
                  <Text style={styles.infoSubtitle}>Courier</Text>
               </View>
            </View>
            <TouchableOpacity style={styles.callBtn}>
               <Phone color={Colors.white} size={20} />
            </TouchableOpacity>
         </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFEBEA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15, zIndex: 10 },
  headerBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  
  mapContainer: { ...StyleSheet.absoluteFillObject, backgroundColor: '#E0E0E0' },
  mapPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mapText: { color: Colors.textLight, marginTop: 10, fontWeight: '500' },
  
  bottomCard: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: Colors.primaryLight, borderRadius: 30, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  iconBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  infoTextContainer: { marginLeft: 15 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  infoSubtitle: { fontSize: 12, color: Colors.textLight, marginTop: 2 },
  divider: { height: 1, backgroundColor: 'rgba(255,75,75,0.2)', marginVertical: 5 },
  
  avatarPlaceholder: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#CCC' },
  callBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' }
});

export default TrackOrderScreen;
