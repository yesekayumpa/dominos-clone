import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, Clock, Tag, MapPin, Heart, LogOut, ChevronRight, Globe } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { AuthContext } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../../components/LanguageSelector';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
  const { user, updateProfilePic, logout } = React.useContext(AuthContext);
  const languageContext = useLanguage();
  const t = languageContext?.t || ((key) => key); // Safe fallback
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);

  const menuItems = [
    { id: '1', title: t('profile.editProfile'), icon: Settings, screen: 'EditProfile' },
    { id: '2', title: t('profile.orderHistory'), icon: Clock, screen: 'OrdersTab' },
    { id: '3', title: t('profile.promocodes'), icon: Tag, screen: 'Promocodes' },
    { id: '4', title: t('profile.addresses'), icon: MapPin, screen: 'Address' },
    { id: '5', title: t('profile.favorites'), icon: Heart, screen: 'Favorites' },
    { id: '6', title: t('settings.language'), icon: Globe, isLanguage: true },
    { id: '7', title: t('profile.logout'), icon: LogOut, isLogout: true },
  ];

  const handlePress = async (item) => {
    if (item.isLogout) {
      await logout();
    } else if (item.isLanguage) {
      setShowLanguageSelector(true);
    } else if (item.screen) {
      navigation.navigate(item.screen);
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
           <Text style={styles.title}>{t('profile.title')}</Text>
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
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
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
