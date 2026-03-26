import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Bell, Search, Sliders, MapPin } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { AuthContext } from '../../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const categories = [
    { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200' },
    { name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
    { name: 'Chicken', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200' },
    { name: 'Drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200' }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.locationContainer}>
             {user.profilePic ? (
               <Image source={{ uri: user.profilePic }} style={styles.avatarPlaceholder} />
             ) : (
               <View style={styles.avatarPlaceholder} />
             )}
             <View style={styles.locationTextContainer}>
                <Text style={styles.locationLabel}>Hello, {user.name} 👋</Text>
                <View style={styles.locationCity}>
                  <Text style={styles.locationValue}>Depok, Jawa Barat</Text>
                  <MapPin size={16} color={Colors.primary} style={{marginLeft: 4}} />
                </View>
             </View>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
             <Bell size={24} color={Colors.text} />
             <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroContainer}>
           <ImageBackground 
             source={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800' }} 
             style={styles.heroImagePlaceholder}
             imageStyle={{ borderRadius: 20 }}
           >
              <Text style={styles.heroText}>Delicious Pizza</Text>
           </ImageBackground>
           <View style={styles.searchContainer}>
             <Search size={20} color={Colors.textLight} />
             <TextInput 
               style={styles.searchInput}
               placeholder="Search Fast Station"
               placeholderTextColor={Colors.textLight}
             />
             <TouchableOpacity style={styles.filterBtn}>
               <Sliders size={20} color={Colors.white} />
             </TouchableOpacity>
           </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
           {categories.map((cat, idx) => (
             <TouchableOpacity key={idx} style={styles.categoryCard}>
                <Image source={{ uri: cat.image }} style={styles.categoryImagePlaceholder} />
                <Text style={styles.categoryText}>{cat.name}</Text>
             </TouchableOpacity>
           ))}
        </ScrollView>

        <View style={styles.offerCard}>
           <View style={styles.offerContent}>
              <Text style={styles.offerTitle}>Food Package</Text>
              <Text style={styles.offerTitle}>Offer</Text>
              <Text style={styles.offerDiscount}>40%</Text>
              <Text style={styles.offerSubtitle}>Discount</Text>
           </View>
           <Image source={{ uri: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400' }} style={styles.offerImagePlaceholder} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Book Your Restaurants</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.restaurantsContainer}>
           {[1, 2, 3].map((_, idx) => (
             <View key={idx} style={styles.restaurantCard}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400' }} style={styles.restaurantImage} />
                <Text style={styles.restaurantName}>Domino's Pizza</Text>
             </View>
           ))}
        </ScrollView>

        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  avatarPlaceholder: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.secondary, marginRight: 12 },
  locationTextContainer: { justifyContent: 'center' },
  locationLabel: { fontSize: 12, color: Colors.textLight },
  locationCity: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  locationValue: { fontSize: 14, fontWeight: 'bold', color: Colors.text },
  notificationBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center' },
  badge: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  
  heroContainer: { marginBottom: 25, position: 'relative' },
  heroImagePlaceholder: { width: '100%', height: 160, backgroundColor: '#FFEBEA', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  heroText: { fontSize: 28, fontWeight: 'bold', color: Colors.white, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 5 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, marginHorizontal: 20, marginTop: -25, borderRadius: 25, height: 50, paddingHorizontal: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: Colors.text },
  filterBtn: { backgroundColor: Colors.primary, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  seeAll: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
  
  categoriesContainer: { flexDirection: 'row', marginBottom: 25 },
  categoryCard: { marginRight: 15, alignItems: 'center', backgroundColor: Colors.white, padding: 8, borderRadius: 40, borderWidth: 1, borderColor: Colors.border },
  categoryImagePlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.secondary, marginBottom: 8, overflow: 'hidden' },
  categoryText: { fontSize: 14, fontWeight: '500', color: Colors.text, marginBottom: 8 },
  
  offerCard: { backgroundColor: Colors.primary, borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  offerContent: { flex: 1 },
  offerTitle: { fontSize: 16, color: Colors.white, fontWeight: '500' },
  offerDiscount: { fontSize: 32, color: Colors.white, fontWeight: 'bold', marginTop: 5 },
  offerSubtitle: { fontSize: 14, color: Colors.white, opacity: 0.8 },
  offerImagePlaceholder: { width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(255,255,255,0.2)' },
  
  restaurantsContainer: { flexDirection: 'row', marginBottom: 20 },
  restaurantCard: { marginRight: 15, width: 140 },
  restaurantImage: { width: '100%', height: 100, borderRadius: 15, backgroundColor: Colors.secondary, marginBottom: 10 },
  restaurantName: { fontSize: 14, fontWeight: 'bold', color: Colors.text }
});

export default HomeScreen;
