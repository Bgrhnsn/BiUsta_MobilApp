import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

export default function SearchScreen({ navigation, route }) {
  const { location } = route.params || {};//konum bilgisi alma
  const [searchApi, results, errorMessage] = useResults();//arama yerinde lazım olan fonksiyon ve durum değişkenlerinin içeri aktarılması
  const [term, setTerm] = useState('');//arama için state tercih ettim
  //elektrikçi , camcı , tesisatçı için arama sonuçlarını state ile kullanma
  const [electricResults, setElectricResults] = useState([]);
  const [plumbingResults, setPlumbingResults] = useState([]);
  const [glassResults, setGlassResults] = useState([]);

  useEffect(() => {
    if (location) {
      //konum ile api araması yaparak sonuçların set edilmesi
      searchApi('elektrik', location).then((res) => setElectricResults(res));
      searchApi('plumbing', location).then((res) => setPlumbingResults(res));
      searchApi('cam', location).then((res) => setGlassResults(res));
    }
  }, [location]);// konum değişirse tekrar çalıştırmak için

  const handleTermSubmit = () => {
    //arama yeri çalışınca bu fonksiyon çalışıcak ve sonucu state set edecek
    searchApi(term, location).then((res) => {
      setElectricResults([]);
      setPlumbingResults([]);
      setGlassResults([]);
      setSearchResults(res);
    });
  };

  const [searchResults, setSearchResults] = useState([]);

  return (
    <View style={{ flex: 1 }}>
      {/* arama çubuğu */}
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={handleTermSubmit}
      />
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <>
          <ScrollView>
            {term ? (
              <>
                {searchResults.length === 0 ? (
                  <Text>Arama sonucu bulunamadı</Text>//arama yerinde kelimeye uygun dükkan yoksa bu text gösterilir
                ) : (
                  searchResults.map((result) => (
                    <ResultsList
                      key={result.id}
                      title={result.name}
                      results={[result]}  // tek bir sonucu ResultsList bileşenine gönderiyoruz
                    />
                  ))
                )}
              </>
            ) : (
              <>
              {/* arama yerine bir kelime yazılmadığında elektrikçi ,tesisatçı .camcı gösterilcek */}
                {electricResults.length === 0 &&
                  plumbingResults.length === 0 &&
                  glassResults.length === 0 ? (
                  <Text>Arama sonucu bulunamadı</Text>
                ) : (
                  <>
                    <ResultsList
                      title="Elektrikçi"
                      results={electricResults}
                    />
                    <ResultsList
                      title="Tesisatçı"
                      results={plumbingResults}
                    />
                    <ResultsList
                      title="Camcı"
                      results={glassResults}
                    />
                  </>
                )}
              </>
            )}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              title="Haritada Konum Seç"
              onPress={() => navigation.navigate('Map')}//haritaya tekrar erişme
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
});
