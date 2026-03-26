// Route service for calculating directions and routes

class RouteService {
  // Calculate route between two points using Google Directions API
  static async calculateRoute(origin, destination) {
    try {
      // For demo purposes, we'll create a mock route
      // In production, you would use Google Directions API or similar
      const routeCoordinates = this.generateMockRoute(origin, destination);
      const routeInfo = this.calculateRouteInfo(origin, destination);
      
      return {
        coordinates: routeCoordinates,
        ...routeInfo,
        success: true
      };
    } catch (error) {
      console.error('Error calculating route:', error);
      return {
        coordinates: [],
        distance: 'Unknown',
        duration: 'Unknown',
        estimatedDelivery: 'Unknown',
        success: false
      };
    }
  }

  // Generate mock route coordinates (straight line with some curves)
  static generateMockRoute(origin, destination) {
    if (!origin || !destination) return [];
    
    const coordinates = [origin];
    const steps = 10; // Number of intermediate points
    
    for (let i = 1; i < steps; i++) {
      const progress = i / steps;
      const lat = origin.latitude + (destination.latitude - origin.latitude) * progress;
      const lng = origin.longitude + (destination.longitude - origin.longitude) * progress;
      
      // Add some curve to make it look more realistic
      const curveOffset = Math.sin(progress * Math.PI) * 0.002;
      coordinates.push({
        latitude: lat + curveOffset,
        longitude: lng
      });
    }
    
    coordinates.push(destination);
    return coordinates;
  }

  // Calculate basic route information
  static calculateRouteInfo(origin, destination) {
    if (!origin || !destination) {
      return {
        distance: 'Unknown',
        duration: 'Unknown',
        estimatedDelivery: 'Unknown'
      };
    }

    // Calculate distance using Haversine formula
    const distance = this.calculateDistance(origin, destination);
    
    // Estimate duration (assuming average speed of 30 km/h in city)
    const durationMinutes = Math.round((distance / 30) * 60);
    
    // Estimate delivery time (prep time + travel time)
    const prepTime = 15; // 15 minutes preparation
    const totalDeliveryTime = prepTime + durationMinutes;
    
    return {
      distance: `${distance.toFixed(1)} km`,
      duration: `${durationMinutes} mins`,
      estimatedDelivery: `${totalDeliveryTime}-${totalDeliveryTime + 10} mins`
    };
  }

  // Calculate distance between two points using Haversine formula
  static calculateDistance(point1, point2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(point2.latitude - point1.latitude);
    const dLon = this.toRadians(point2.longitude - point1.longitude);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(point1.latitude)) * Math.cos(this.toRadians(point2.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance;
  }

  static toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Open navigation in external maps app
  static openNavigation(origin, destination) {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}`;
    
    // In a real app, you would use Linking.openURL(url)
    console.log('Navigation URL:', url);
    return url;
  }
}

export default RouteService;
