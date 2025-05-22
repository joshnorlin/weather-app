import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

type Props = {
  text: string;
};

export default function WeatherDisplay({ text }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAndFetchWeather = async () => {
      setLoading(true);
      setData(null);

      try {
        // Load and parse CSV
        const csvUrl = 'https://raw.githubusercontent.com/joshnorlin/weather-app/refs/heads/main/assets/worldcities%5B1%5D.csv';
        const csvResult = await fetch(csvUrl);
        if (!csvResult.ok) {
          setData({ error: 'Error loading CSV data' });
          setLoading(false);
          return;
        }

        const csvString = await csvResult.text();
        // Use PapaParse to parse the CSV string
        const parsed = Papa.parse(csvString, { header: true });
        // Extract data from parsed CSV
        const cities = parsed.data as any[];

        // Find city (case-insensitive match)
        const cityData = cities.find(
          (city) => city.city_ascii?.toLowerCase() === text.trim().toLowerCase()
        );

        if (!cityData) {
          setData({ error: 'City not found' });
          setLoading(false);
          return;
        }

        const lat = cityData.lat;
        const lon = cityData.lng;
        // Fetch weather
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=64dd29ae64329d866cdac373ca28f5fc&units=metric`
        );
        const json = await response.json();
        setData(json);
      } catch (error) {
        setData({ error: 'Error loading data' });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (text && text.trim().length > 0) {
      loadAndFetchWeather();
    }
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
