import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, Clock, Tag, MapPin, Heart, LogOut, ChevronRight } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { AuthContext } from '../../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
  const { user, updateProfilePic } = React.useContext(AuthContext);

  const menuItems = [
    { id: '1', title: 'Manage Account', icon: Settings },
    { id: '2', title: 'Order History', icon: Clock },
    { id: '3', title: 'My promocodes', icon: Tag },
    { id: '4', title: 'Location', icon: MapPin },
    { id: '5', title: 'My Favorite', icon: Heart },
    { id: '6', title: 'Sign Out', icon: LogOut, isLogout: true },
  ];

  const handlePress = (item) => {
    if (item.isLogout) {
      navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
    } else if (item.title === 'Location') {
      navigation.navigate('Address');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      updateProfilePic(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
           <Text style={styles.title}>My Profile</Text>
        </View>

        <View style={styles.profileCard}>
           <TouchableOpacity onPress={pickImage}>
             {user.profilePic ? (
               <Image source={{ uri: user.profilePic }} style={styles.avatarPlaceholder} />
             ) : (
               <View style={styles.avatarPlaceholder} />
             )}
           </TouchableOpacity>
           <View style={styles.profileDetails}>
             <Text style={styles.profileName}>{user.name}</Text>
             <Text style={styles.profileEmail}>{user.email}</Text>
           </View>
        </View>

        <View style={styles.menuContainer}>
           {menuItems.map((item, index) => {
             const Icon = item.icon;
             const isLast = index === menuItems.length - 1;
             return (
               <TouchableOpacity 
                  key={item.id} 
                  style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}
                  onPress={() => handlePress(item)}
               >
                  <View style={styles.menuItemLeft}>
                     <Icon size={24} color={Colors.textLight} />
                     <Text style={styles.menuItemText}>{item.title}</Text>
                  </View>
                  <ChevronRight size={20} color={Colors.textLight} />
               </TouchableOpacity>
             );
           })}
        </View>
        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { padding: 24 },
  header: { marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: Colors.text, textAlign: 'center' },
  profileCard: { backgroundColor: Colors.primary, borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 30, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  avatarPlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  profileDetails: { marginLeft: 15 },
  profileName: { fontSize: 18, fontWeight: 'bold', color: Colors.white, marginBottom: 5 },
  profileEmail: { fontSize: 14, color: Colors.white, opacity: 0.8 },
  menuContainer: { backgroundColor: Colors.white, borderRadius: 20, paddingVertical: 5, borderWidth: 1, borderColor: Colors.border },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: Colors.border },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemText: { fontSize: 16, color: Colors.text, marginLeft: 15, fontWeight: '500' }
});

export default ProfileScreen;
