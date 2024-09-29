import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import yelp from '../api/yelp';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function ResultsShowScreen({ route }) {
  const [result, setResult] = useState(null);//api sonucunu saklamak için state kullanımı
  const id = route.params.id; //route paramatresinde id yi id ye atama

  //id ile apiden veri almak için asenkron fonksiyon tanımı
  const getResult = async (id) => {
    try {
      const response = await yelp.get(`/${id}`);
      setResult(response.data);//gelen veri state set edilmesi
    } catch (error) {
      console.error(error);//set edilirken hata alınırsa hata kodu fırlatma
    }
  };

  // uygulama yüklernirken api çağrısı yapmak için useeffect kullandım
  useEffect(() => {
    getResult(id);
  }, []);

  //sonuçlar yüklenirken bilgiler yükleniyor ibaresi 
  if (!result) {
    return <Text style={styles.error}>Bilgiler yükleniyor...</Text>;
  }

  const handlePhonePress = () => {
    if (result.phone) {
      Linking.openURL(`tel:${result.phone}`); // telefon numarasına tıklandığında rehbere gitmesi için linking kütüphanesi kullanıyor
    }
  };

  return (
    <View style={styles.container}>
      {/* dükkan adı gösterilmesi */}
      <Text style={styles.title}>{result.name || 'Bilgi yok'}</Text>
      {/* telefon numarası bilgisi kontrol edilir varsa gösterilir yoksa bulunmadığı yazar*/}
      {result.phone ? (
        <TouchableOpacity onPress={handlePhonePress}>
          <Text style={styles.phone}>{result.phone}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.noInfo}>Telefon numarası yok</Text>
      )}
      {/* dükkan açıksa bisiklet ikonu kapalıysa başka bir ikon gösterilir */}
      <View style={styles.icon}>
        {result.is_closed ? (
          <AntDesign name="closecircleo" size={30} color="black" />
        ) : (
          <MaterialIcons name="delivery-dining" size={30} color="black" />
        )}
      </View>
      {/* dükkan içi fotoğraf kontrolü ve gösterilmesi */}
      {result.photos && result.photos.length > 0 ? (
        <FlatList
          data={result.photos}
          keyExtractor={(photo) => photo}
          renderItem={({ item }) => {
            return <Image style={styles.image} source={{ uri: item }} />;
          }}
        />
      ) : (
        <Text style={styles.noInfo}>Fotoğraf yok</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    height: 180,
    margin: 10,
    borderRadius: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    marginVertical: 10,
  },
  phone: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  noInfo: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'gray',
    marginVertical: 5,
  },
  error: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'red',
  },
});
