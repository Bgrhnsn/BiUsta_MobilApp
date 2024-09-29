// WelcomeScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/BiUSTA.png')} 
        style={styles.image} 
      />
      <Text style={styles.title}>BiUsta</Text>
      <Text style={styles.slogan}>En İyi Ustaları Bulun!</Text>
      <TouchableOpacity 
        style={styles.mapContainer} 
        onPress={() => navigation.navigate('Map')}
      >
        <Image 
          source={require('../assets/map-icon.png')} 
          style={styles.mapIcon} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  slogan: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 40,
  },
  mapContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  mapIcon: {
    width: 100,
    height: 100,
  },
});

export default WelcomeScreen;
