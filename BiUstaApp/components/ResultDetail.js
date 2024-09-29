import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


//işletmeye dair bilgilerin içinde tuttuğu result propunun çekilmesi
const ResultsDetail = ({ result }) => {
  const defaultImage = require('../assets/BiUSTA.png'); // Varsayılan resim dosyasını ekleyin

  return (
    <View style={styles.container}>
      <Image 
        style={styles.image} 
        source={result.image_url ? { uri: result.image_url } : defaultImage} 
      />
      {/* Dükkanın adı*/}
      <Text style={styles.name}>{result.name}</Text>
      {/* Dükkanın değerlendirme bilgileri*/}
      <Text>{result.rating} Yıldız, {result.review_count} Değerlendirme</Text>
      {/* Dükkanın kullanıcıya olan uzaklığı*/}
      {result.distance && <Text>{result.distance} km Uzaklıkta</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    backgroundColor: '#fff',
    //dükkanlar listelenirken daha güzel gözükmesi için shadow eklendi
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Android için gölge
    padding: 10, // Gölge efektinin daha belirgin olması için içeriği biraz içe çekiyoruz
    marginBottom: 15, // Kartların birbirinden ayrılması için alt boşluk
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
  },
});

export default ResultsDetail;
