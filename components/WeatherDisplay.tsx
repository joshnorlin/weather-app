import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import callWeatherApi from '../utils/callWeatherApi';
import parseStateAbbreviations from '../utils/parseStateAbbreviations';

export default function WeatherDisplay({ data }) {
  const [apiData, setApiData] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			setApiData(await callWeatherApi(data));
			setLoading(false);
		}
		fetchData();
	}, []);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : apiData?.error ? (
        <Text>{apiData.error}</Text>
      ) : apiData ? (
        <View style={styles.weatherDisplay}>
          <Text style={styles.cityText}>{data.city_ascii}, {data.iso2 === "US" ? parseStateAbbreviations(data.admin_name) : data.country}</Text>
          <Text style={styles.temperatureText}>{apiData.main?.temp}°F</Text>
          <Text style={styles.weatherText}>{apiData.weather?.[0]?.description}</Text>
        </View>
      ) : (
        <Text>Enter a city name to get weather.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
	weatherDisplay: {
	  backgroundColor: '#ffffff',
	  borderRadius: 10,
	  padding: 20,
	  alignItems: 'center',
	  shadowColor: '#000',
	  shadowOffset: { width: 0, height: 2 },
	  shadowOpacity: 0.1,
	  shadowRadius: 5,
	},
	cityText: {
	  fontSize: 22,
	  fontWeight: '600',
	  color: '#333',
	  marginBottom: 10,
	},
	temperatureText: {
	  fontSize: 48,
	  fontWeight: 'bold',
	  color: '#1e90ff',
	},
	weatherText: {
	  fontSize: 18,
    color: '#555',
	},
});
