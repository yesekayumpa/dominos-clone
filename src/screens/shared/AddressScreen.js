import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { ChevronLeft, Home, Briefcase, MapPin, Navigation } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/CustomButton';
import MapViewComponent from '../../components/MapView';
import RouteInfo from '../../components/RouteInfo';
import RouteService from '../../services/RouteService';

const AddressScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('1');
  const [showMap, setShowMap] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  
  // Mock user location (in real app, this would come from GPS)
  const userLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
  };

  // Mock destination coordinates for each address
  const addressCoordinates = {
    '1': { latitude: 37.79425, longitude: -122.4254 }, // Home
    '2': { latitude: 37.78225, longitude: -122.4384 }, // Work
    '3': { latitude: 37.79025, longitude: -122.4194 }, // Other
  };
  
  const addresses = [
    { id: '1', type: 'Home', address: '4233 Kimball Ave. Chicago, IL 60618', icon: Home },
    { id: '2', type: 'Work', address: '4233 Logan St. Oldsmar, Delaware 10299', icon: Briefcase },
    { id: '3', type: 'Other', address: '5012 Hardcove Yohanban 32442', icon: MapPin },
  ];

  const handleAddressSelect = async (addressId) => {
    setSelected(addressId);
    setShowMap(true);
    setIsCalculatingRoute(true);
    
    // Calculate route to selected address
    const destination = addressCoordinates[addressId];
    if (destination) {
      const route = await RouteService.calculateRoute(userLocation, destination);
      setRouteData(route);
    }
    setIsCalculatingRoute(false);
  };

  const handleStartNavigation = () => {
    if (routeData && routeData.coordinates.length > 0) {
      const destination = routeData.coordinates[routeData.coordinates.length - 1];
      const navigationUrl = RouteService.openNavigation(userLocation, destination);
      
      // Open in external maps app
      Linking.openURL(navigationUrl).catch(err => {
        console.error('Error opening navigation:', err);
      });
    }
  };

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
         {/* Address List */}
         <Text style={styles.sectionTitle}>Select Delivery Address</Text>
         {addresses.map((item) => {
           const Icon = item.icon;
           const isSelected = selected === item.id;
           return (
             <TouchableOpacity 
                key={item.id} 
                style={[styles.addressCard, isSelected && styles.addressCardSelected]}
                onPress={() => handleAddressSelect(item.id)}
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

         {/* Map View */}
         {showMap && (
           <View style={styles.mapContainer}>
             <Text style={styles.sectionTitle}>Delivery Route</Text>
             <MapViewComponent
               userLocation={userLocation}
               destination={addressCoordinates[selected]}
               routeCoordinates={routeData?.coordinates || []}
               showRoute={!!routeData?.coordinates}
               style={styles.mapView}
             />
             
             {/* Route Information */}
             <RouteInfo
               distance={routeData?.distance}
               duration={routeData?.duration}
               estimatedDelivery={routeData?.estimatedDelivery}
               onStartNavigation={handleStartNavigation}
               isCalculating={isCalculatingRoute}
             />
           </View>
         )}
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
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: Colors.text, 
    marginBottom: 15,
    marginTop: 20 
  },
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
  mapContainer: { marginTop: 20 },
  mapView: { 
    height: 300, 
    borderRadius: 20, 
    overflow: 'hidden',
    marginBottom: 15 
  },
  footer: { padding: 20, paddingBottom: 30 },
  addBtn: { width: '100%' }
});

export default AddressScreen;
