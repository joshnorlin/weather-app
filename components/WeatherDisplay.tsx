import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { callWeatherApi } from '../utils/callWeatherApi';
import { parseUserInput } from '../utils/parseUserInput';

type Props = {
  text: string;
};

export default function WeatherDisplay({ text }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const cityData = await parseUserInput(text);
      if(cityData) {
        const cityWeatherData = await callWeatherApi(cityData);
        setData(cityWeatherData);
      }
      setLoading(false);
    }
    fetchData();
  }, [text]);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : data?.error ? (
        <Text>{data.error}</Text>
      ) : data ? (
        <>
          <Text>latitude: {data.coord?.lat}</Text>
          <Text>longitude: {data.coord?.lon}</Text>
          <Text>temperature: {data.main?.temp}</Text>
          <Text>humidity: {data.main?.humidity}</Text>
          <Text>weather: {data.weather?.[0]?.description}</Text>
        </>
      ) : (
        <Text>Enter a city name to get weather.</Text>
      )}
    </View>
  );
}
