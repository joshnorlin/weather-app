import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import callForecastApi from '../utils/callForecastApi';
import groupDailyForecast from '../utils/groupDailyForecast';

export default function ForecastDisplay({ cityData }) {
  const [queryData, setQueryData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [fullList, setFullList] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [localDateString, setLocalDateString] = useState('');
  const [localTimeString, setLocalTimeString] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await callForecastApi(cityData);
      setQueryData(result);
      setFullList(result.list); // <-- This should be the raw list from the API
      const sections = groupDailyForecast(result.list, result.city.timezone);
      setApiData(sections);     // <-- This should be the grouped daily forecast
      setLoading(false);
    }
    fetchData();
  }, [cityData]);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : apiData?.error ? (
        <Text>{apiData.error}</Text>
      ) : apiData ? (
        <View>
          {/* Today's details */}
          <Text style={styles.sectionHeader}>Today</Text>
          {/* Show more details for today, e.g., next 3-4 slots */}
          {fullList
            .slice(0, 8)
            .map(item => (
              <View key={item.dt_txt} style={styles.forecastRow}>
                <Text style={styles.timeText}>
                  {new Date(item.dt_txt).toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </Text>
                <Image
                  style={styles.icon}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                  }}
                />
                <Text style={styles.tempText}>{Math.round(item.main.temp)}°F</Text>
                <Text style={styles.descText}>{item.weather[0].description}</Text>
              </View>
            ))}

          {/* Next days summary */}
          <Text style={styles.sectionHeader}>Next Days</Text>
          {apiData.slice(1).map(day => (
            <View key={day.date} style={styles.forecastRow}>
              <Text>
                {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
              </Text>
              <Image
                source={{ uri: `https://openweathermap.org/img/wn/${day.forecast.weather[0].icon}@2x.png` }}
                style={styles.icon}
              />
              <Text style={styles.weeklyForecastText}>{Math.round(day.forecast.main.temp)}°F</Text>
              <Text style={styles.weeklyForecastText}>{day.forecast.weather[0].description}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text>Enter a city to get weather.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f8fafc',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  timeText: {
    minWidth: 70,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    flexShrink: 0,
    alignSelf: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 8,
  },
  tempText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  descText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 12,
  },
  weeklyForecastText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 12,
  },
  weatherDisplay: {
	  backgroundColor: '#ffffff',
	  borderRadius: 10,
    marginTop: 20,
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
	dateText: {
	  fontSize: 16,
	  color: '#888',
	  marginBottom: 8,
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