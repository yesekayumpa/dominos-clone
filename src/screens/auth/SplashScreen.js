import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Domino logo mockup */}
        <View style={[styles.dominoHalf, { backgroundColor: '#006491', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]}>
           <View style={styles.dot} />
        </View>
        <View style={[styles.dominoHalf, { backgroundColor: '#E31837', borderTopRightRadius: 8, borderBottomRightRadius: 8 }]}>
           <View style={[styles.dot, { alignSelf: 'flex-start', margin: 6 }]} />
           <View style={[styles.dot, { alignSelf: 'flex-end', margin: 6 }]} />
        </View>
      </View>
      <Text style={styles.title}>Domino,s</Text>
      <Text style={styles.subtitle}>Pizza</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    transform: [{ rotate: '-45deg' }],
    marginBottom: 20,
  },
  dominoHalf: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 32,
    color: 'white',
  }
});

export default SplashScreen;
