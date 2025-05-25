import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CityDisplay from '@/components/CityDisplay';
import SearchBar from '@/components/SearchBar';
import SearchButton from '@/components/SearchButton';
import WeatherDisplay from '@/components/WeatherDisplay';

import parseUserInput from '../utils/parseUserInput';

export default function Index() {
  const refUserInput = useRef('');
  const [city, setCity] = useState<string>();
  const [searchResults, setSearchResults] = useState<[]>([]);

  const onChangeSearchBar = (newInput) => {
    refUserInput.current = newInput;
  };

  const onPressSearchButton = async () => {
    setCity(refUserInput.current);
    setSearchResults(await parseUserInput(refUserInput.current)); // don't know if city state variable will be saved.
  };

  const onPressCityDisplay = (selectedCity) => {
    setSearchResults([selectedCity]);
  };

  function renderSwitch(results) {
    if (!city) return;
    if (!results || results.length === 0) {
      return <Text>no city found.</Text>;
    }
    if (results.length === 1) {
      return <WeatherDisplay data={results[0]}/>;
    }
    return renderCities(results);
  }

  function renderCities(results) {
    return results.map((city, i) => (
      <CityDisplay key={i} city={city} onPress={() => onPressCityDisplay(city)} />
    ));
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar onChangeText={onChangeSearchBar} />
        <SearchButton onPress={onPressSearchButton} />
      </View>
      {renderSwitch(searchResults)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
    justifyContent: 'center',
  },
  searchContainer: {
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  alignItems: 'center',
	  marginBottom: 20,
	  backgroundColor: '#fff',
	  borderRadius: 10,
	  paddingHorizontal: 10,
	  paddingVertical: 8,
	  shadowColor: '#000',
	  shadowOffset: { width: 0, height: 2 },
	  shadowOpacity: 0.1,
	  shadowRadius: 5,
	  elevation: 3, // Android shadow
	},
});
