import React, { useState } from 'react';
import { Text, View } from 'react-native';

import App from '@/components/App';
import SearchBar from '@/components/SearchBar';
import SearchButton from '@/components/SearchButton';
import WeatherDisplay from '@/components/WeatherDisplay';

export default function Index() {
  const [input, setInput] = useState<string | null>('');
  const [citySelected, setCitySelected] = useState<bool>(false);

  const onChangeSearchBar = (newInput) => {
    console.log("Text Changed");
    setInput(newInput);
  };

  const onPressSearchButton = () => {
    console.log("Button Pressed");
    setCitySelected(true);
  };

  if(citySelected) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchBar onChangeText={onChangeSearchBar} />
        <SearchButton onPress={onPressSearchButton} />
        <WeatherDisplay text={input} />
      </View>

    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchBar onChangeText={onChangeSearchBar} />
        <SearchButton onPress={onPressSearchButton} />
      </View>
    );
  }
}
