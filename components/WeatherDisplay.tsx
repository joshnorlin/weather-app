import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WeatherDisplay(data) {
  const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState<boolean>(false);


  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : data?.error ? (
        <Text>{data.error}</Text>
      ) : data ? (
        <View style={styles.weatherDisplay}>
          <Text style={styles.cityText}>{data.name}</Text>
          <Text style={styles.temperatureText}>{data.main?.temp}°F</Text>
          <Text style={styles.weatherText}>{data.weather?.[0]?.description}</Text>
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
