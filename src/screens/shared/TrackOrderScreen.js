import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { ChevronLeft, Map, Clock, MapPin, Phone, Navigation } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import MapViewComponent from '../../components/MapView';
import RouteService from '../../services/RouteService';

const TrackOrderScreen = ({ navigation }) => {
  const [routeData, setRouteData] = useState(null);
  const [courierLocation, setCourierLocation] = useState(null);
  const [orderStatus, setOrderStatus] = useState('preparing'); // preparing, ontheway, delivered

  // Mock locations
  const restaurantLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
  };

  const deliveryLocation = {
    latitude: 37.79425,
    longitude: -122.4254,
  };

  useEffect(() => {
    // Initialize route
    const initializeRoute = async () => {
      const route = await RouteService.calculateRoute(restaurantLocation, deliveryLocation);
      setRouteData(route);
      
      // Mock courier movement (in real app, this would come from real-time GPS)
      if (route.coordinates && route.coordinates.length > 0) {
        simulateCourierMovement(route.coordinates);
      }
    };

    initializeRoute();
  }, []);

  // Simulate courier movement along the route
  const simulateCourierMovement = (coordinates) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < coordinates.length) {
        setCourierLocation(coordinates[currentIndex]);
        currentIndex++;
        
        // Update order status based on progress
        const progress = currentIndex / coordinates.length;
        if (progress > 0.8) {
          setOrderStatus('delivered');
          clearInterval(interval);
        } else if (progress > 0.2) {
          setOrderStatus('ontheway');
        }
      } else {
        clearInterval(interval);
      }
    }, 2000); // Update every 2 seconds for demo
  };

  const handleCallCourier = () => {
    // Mock phone call
    Linking.openURL('tel:+1234567890').catch(err => {
      console.error('Error calling courier:', err);
    });
  };

  const getStatusText = () => {
    switch (orderStatus) {
      case 'preparing':
        return 'Your order is being prepared';
      case 'ontheway':
        return 'Courier is on the way';
      case 'delivered':
        return 'Order delivered!';
      default:
        return 'Preparing your order';
    }
  };

  const getStatusColor = () => {
    switch (orderStatus) {
      case 'preparing':
        return '#FFA500'; // Orange
      case 'ontheway':
        return '#4285F4'; // Blue
      case 'delivered':
        return '#34A853'; // Green
      default:
        return Colors.textLight;
    }
  };
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
         <MapViewComponent
           userLocation={deliveryLocation}
           destination={restaurantLocation}
           routeCoordinates={routeData?.coordinates || []}
           showRoute={!!routeData?.coordinates}
           style={styles.mapView}
         />
         
         {/* Courier marker */}
         {courierLocation && (
           <View style={[styles.courierMarker, { top: '50%', left: '50%' }]}>
             <View style={styles.courierIcon}>
               <Navigation size={16} color={Colors.white} />
             </View>
           </View>
         )}
      </View>

      <View style={styles.bottomCard}>
         <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
            <Text style={styles.statusText}>{getStatusText()}</Text>
         </View>
         
         <View style={styles.divider} />
         
         <View style={styles.infoRow}>
            <View style={styles.iconBox}>
               <Clock color={Colors.primary} size={24} />
            </View>
            <View style={styles.infoTextContainer}>
               <Text style={styles.infoTitle}>{routeData?.duration || '15-20 min'}</Text>
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
                  <Text style={styles.infoTitle}>Jordan Smith</Text>
                  <Text style={styles.infoSubtitle}>Courier</Text>
               </View>
            </View>
            <TouchableOpacity style={styles.callBtn} onPress={handleCallCourier}>
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
  
  mapContainer: { flex: 1, position: 'relative' },
  mapView: { flex: 1 },
  courierMarker: { 
    position: 'absolute', 
    width: 40, 
    height: 40, 
    marginLeft: -20, 
    marginTop: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courierIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  
  bottomCard: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: Colors.primaryLight, borderRadius: 30, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 },
  
  statusContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  statusIndicator: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  statusText: { fontSize: 14, fontWeight: '600', color: Colors.text },
  
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
