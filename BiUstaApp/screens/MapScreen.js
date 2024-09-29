import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState({
    // uygulama açıldığında haritada ilk olarak Ankarayı göstermek için kordinatlar 
    latitude: 39.9334, 
    longitude: 32.8597, 
    latitudeDelta: 5.0,
    longitudeDelta: 5.0, 
  });
  //kullanıcı konumunu saklamak için state kullandım
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();//konum için izin isteme
      if (status !== 'granted') {
        console.log('Konum için gerekli izinler verilmedi tekrar dene...');//izin verilmezse hata
        return;
      }

      //kullanıcının konumu
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);
  //harita için gerekli fonksiyon
  const handleMapPress = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };
  //konum onaylandığında seçilen konumun konsola yazılması ,konum bilgilerinin SearcScreene aktarılması ve SearchScreen ekranına gidilmesi
  const handleConfirmLocation = () => {
    if (selectedLocation) {
      console.log('Seçilen Konum:', selectedLocation);
      // SearchScreen'e selectedLocation ile gidin
      navigation.navigate('Search', { location: selectedLocation });
    }
  };

  return (
    <View style={styles.container}>
      {/* haritanın başlangıç konumu ve haritaya tıklandığında handlepress çalışyıor */}
      <MapView
        style={styles.map}
        initialRegion={location}
        onPress={handleMapPress}
      >
        {/* seçilen yere işaret bırakma  */}
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Seçilen Konum"
          />
        )}
      </MapView>
      {/* konum onaylandığında handleconfirlocation fonksiyonu çalışıyor ve konum seçilmemişse butona tıklanmıyor*/}
      <Button
        title="Konumu Onayla"
        onPress={handleConfirmLocation}
        disabled={!selectedLocation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
