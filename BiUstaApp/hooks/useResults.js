import { useEffect, useState } from 'react';
import yelp from '../api/yelp';
//custom hook tanımı
export default () => {
  const [results, setResults] = useState([]);//arama sonuçlarını tutmak için state
  const [errorMessage, setErrorMessage] = useState('');//hata mesajını tutmak için state

  //yelp api ye aranan kelimenin gönderilmesi ve  GET isteği
  const searchApi = async (searchTerm, location) => {
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,//sonuç sayısı 50 yi aşmaması için
          term: searchTerm,//aranan kelime
          //kullanıcı konum bilgisi
          latitude: location.latitude,
          longitude: location.longitude,
          radius: 15000, // arama yarıçapı 15km
        }
      });

      //dükkanların kullanıcıya olan uzaklığını bulma
      const resultsWithDistance = response.data.businesses.map((business) => ({
        ...business,
        distance: (business.distance / 1000).toFixed(2), // km olarak alma
      }));
      return resultsWithDistance;
    } catch (err) {
      setErrorMessage('Bir şeyler yanlış gitti');
    }
  };

  // İlk yüklemede sonuç almak için
  useEffect(() => {
    searchApi('restaurant', { latitude: 39.9334, longitude: 32.8597 });
  }, []);//ilk açıldığında çalışır

  return [searchApi, results, errorMessage];
};
