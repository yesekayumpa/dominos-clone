import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Navigation, Clock, MapPin } from 'lucide-react-native';
import { Colors } from '../theme/colors';

const RouteInfo = ({ 
  distance, 
  duration, 
  estimatedDelivery, 
  onStartNavigation,
  isCalculating = false 
}) => {
  if (isCalculating) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Calculating route...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.routeInfo}>
        <View style={styles.infoItem}>
          <Navigation size={20} color={Colors.primary} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Distance</Text>
            <Text style={styles.infoValue}>{distance || '2.5 km'}</Text>
          </View>
        </View>
        
        <View style={styles.infoItem}>
          <Clock size={20} color={Colors.primary} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{duration || '15 mins'}</Text>
          </View>
        </View>
        
        <View style={styles.infoItem}>
          <MapPin size={20} color={Colors.primary} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Est. Delivery</Text>
            <Text style={styles.infoValue}>{estimatedDelivery || '25-35 mins'}</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.navigateBtn}
        onPress={onStartNavigation}
      >
        <Navigation size={20} color={Colors.white} />
        <Text style={styles.navigateBtnText}>Start Navigation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textLight,
  },
  routeInfo: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  navigateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 15,
  },
  navigateBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default RouteInfo;
