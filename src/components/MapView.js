import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { MapPin } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const MapViewComponent = ({ 
  userLocation, 
  destination, 
  routeCoordinates = [],
  showRoute = false,
  onMapPress,
  style 
}) => {
  const mapRef = useRef(null);

  const defaultRegion = {
    latitude: userLocation?.latitude || 37.78825,
    longitude: userLocation?.longitude || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const fitMapToMarkers = () => {
    if (mapRef.current && userLocation && destination) {
      mapRef.current.fitToCoordinates(
        [userLocation, destination],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  };

  React.useEffect(() => {
    if (showRoute && userLocation && destination) {
      setTimeout(fitMapToMarkers, 100);
    }
  }, [showRoute]);

  return (
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={defaultRegion}
        onPress={onMapPress}
        showsUserLocation={!!userLocation}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {/* User Location Marker */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Your Location"
            description="You are here"
            pinColor="#4285F4"
          />
        )}

        {/* Destination Marker */}
        {destination && (
          <Marker
            coordinate={destination}
            title="Delivery Address"
            description="Delivery location"
            pinColor="#EA4335"
          />
        )}

        {/* Route Polyline */}
        {showRoute && routeCoordinates.length > 1 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#4285F4"
            strokeWidth={4}
            strokePattern={[1, 0]} // Solid line
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});

export default MapViewComponent;
