import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import callWeatherApi from '../utils/callWeatherApi';
import parseStateAbbreviations from '../utils/parseStateAbbreviations';

function formatTime(unix, timezone) {
  console.log(unix, timezone);
  if (!unix || timezone === undefined) return '--';
  const now = new Date(unix);
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  //const cityTime = new Date(utcTime + timezone * 1000);
  return new Date(utcTime).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export default function WeatherDisplay({ cityData }) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [localDateString, setLocalDateString] = useState('');
  const [localTimeString, setLocalTimeString] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await callWeatherApi(cityData);
      setApiData(result);
      setLoading(false);
    }
    fetchData();
  }, [cityData]);

  useEffect(() => {
    if (!apiData || apiData.timezone === undefined) return;
    function updateLocalTime() {
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
      const cityTime = new Date(utcTime + apiData.timezone * 1000);
      setLocalDateString(cityTime.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }));
      setLocalTimeString(cityTime.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }));
    }
    updateLocalTime();
    const interval = setInterval(updateLocalTime, 1000);
    return () => clearInterval(interval);
  }, [apiData]);

  return (
    <View style={styles.outerContainer}>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : apiData?.error ? (
        <Text style={styles.errorText}>{apiData.error}</Text>
      ) : apiData ? (
        <View style={styles.weatherDisplay}>
          <Text style={styles.cityText}>
            {cityData.city_ascii}, {cityData.iso2 === "US" ? parseStateAbbreviations(cityData.admin_name) : cityData.country}
          </Text>
          <Text style={styles.dateText}>{localDateString}</Text>
          <Text style={styles.timeText}>{localTimeString}</Text>
          <Text style={styles.temperatureText}>{Math.round(apiData.main?.temp * 10) / 10}°F</Text>
          <Text style={styles.weatherText}>{apiData.weather?.[0]?.description}</Text>
          <View style={styles.divider} />
          <View style={styles.detailsRow}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Feels Like</Text>
              <Text style={styles.detailValue}>{Math.round(apiData.main?.feels_like)}°F</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{apiData.main?.humidity}%</Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Sunrise</Text>
              <Text style={styles.detailValue}>
                {formatTime(apiData.sys?.sunrise, apiData.timezone)}
              </Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Sunset</Text>
              <Text style={styles.detailValue}>
                {formatTime(apiData.sys?.sunset, apiData.timezone)}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.infoText}>Enter a city name to get weather.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherDisplay: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cityText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 15,
    color: '#888',
    marginBottom: 2,
    textAlign: 'center',
  },
  timeText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
    textAlign: 'center',
  },
  temperatureText: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 2,
    textAlign: 'center',
  },
  weatherText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#e6e6e6',
    marginVertical: 10,
    alignSelf: 'center',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 6,
    marginBottom: 2,
  },
  detailBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    marginHorizontal: 2,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1e90ff',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
    marginTop: 30,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#e53e3e',
    marginTop: 30,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginTop: 30,
    textAlign: 'center',
  },
});
