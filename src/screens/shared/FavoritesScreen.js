import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ChevronLeft, Heart, Plus, Trash2 } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { useLanguage } from '../../context/LanguageContext';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      name: 'Pepperoni Pizza',
      description: 'Classic pepperoni with mozzarella cheese',
      price: '12000 FCFA',
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200',
      category: 'Pizza',
      rating: 4.5,
    },
    {
      id: '2',
      name: 'BBQ Chicken Wings',
      description: 'Spicy chicken wings with BBQ sauce',
      price: '8000 FCFA',
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200',
      category: 'Chicken',
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, basil',
      price: '10000 FCFA',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200',
      category: 'Pizza',
      rating: 4.3,
    },
    {
      id: '4',
      name: 'Garlic Bread',
      description: 'Toasted garlic bread with herbs',
      price: '3000 FCFA',
      image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=200',
      category: 'Sides',
      rating: 4.6,
    },
  ]);
  
  const languageContext = useLanguage();
  const t = languageContext?.t || ((key) => key);

  const handleRemoveFavorite = (itemId) => {
    setFavorites(favorites.filter(item => item.id !== itemId));
  };

  const handleAddToCart = (item) => {
    console.log('Adding to cart:', item.name);
    // In a real app, this would add to cart context
  };

  const handleOrderNow = (item) => {
    console.log('Ordering now:', item.name);
    navigation.navigate('HomeTab');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Heart key={i} size={12} color={Colors.primary} fill={Colors.primary} />);
    }
    
    if (hasHalfStar) {
      stars.push(<Heart key="half" size={12} color={Colors.primary} fill="none" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Heart key={`empty-${i}`} size={12} color={Colors.textLight} fill="none" />);
    }
    
    return stars;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={Colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('profile.favorites')}</Text>
        <View style={{width: 44}} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Heart size={48} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySubtitle}>Start adding your favorite items!</Text>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => navigation.navigate('HomeTab')}
            >
              <Text style={styles.startButtonText}>Browse Menu</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.subtitle}>{favorites.length} items in favorites</Text>
            
            {favorites.map((item) => (
              <View key={item.id} style={styles.favoriteCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                
                <View style={styles.itemInfo}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => handleRemoveFavorite(item.id)}
                    >
                      <Trash2 size={16} color={Colors.textLight} />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  
                  <View style={styles.itemMeta}>
                    <View style={styles.ratingContainer}>
                      {renderStars(item.rating)}
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                    <Text style={styles.category}>{item.category}</Text>
                  </View>
                  
                  <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity 
                        style={styles.addToCartButton}
                        onPress={() => handleAddToCart(item)}
                      >
                        <Plus size={16} color={Colors.white} />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.orderButton}
                        onPress={() => handleOrderNow(item)}
                      >
                        <Text style={styles.orderButtonText}>Order</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}
        
        <View style={{height: 50}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  headerBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  
  container: { paddingHorizontal: 20, paddingBottom: 20 },
  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 20,
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  startButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  favoriteCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    backgroundColor: Colors.background,
    marginRight: 15,
  },
  
  itemInfo: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  removeButton: {
    padding: 5,
  },
  
  itemDescription: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 8,
    lineHeight: 16,
  },
  
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: Colors.text,
    marginLeft: 5,
  },
  category: {
    fontSize: 12,
    color: Colors.primary,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  orderButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
  },
  orderButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;
