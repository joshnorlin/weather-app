import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import callForecastApi from '../utils/callForecastApi';
import formatForecastList from '../utils/formatForecastList';
import groupForecastByDay from '../utils/groupForecastByDay';

function getLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function ForecastDisplay({ cityData }) {
  const [fullList, setFullList] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [timezone, setTimezone] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const result = await callForecastApi(cityData);
      setTimezone(result.city?.timezone);

      const formattedForecastList = formatForecastList(result.list, result.city?.timezone);
      setFullList(formattedForecastList);

      setLoading(false);
    }
    fetchData();
  }, [cityData]);

  // Group forecasts by day after fetching and formatting the data
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const cityTime = new Date(utcTime + timezone * 1000);
  const todayStr = getLocalDateKey(cityTime);
  const groupedForecasts = groupForecastByDay(fullList, timezone);

  return (
    <View>
      {loading ? (
        <Text></Text>
      ) : fullList?.error ? (
        <Text>{fullList.error}</Text>
      ) : fullList ? (
        <View style={styles.responsiveContainer}>
          {/* Today's details */}
          {groupedForecasts.map(({ date, forecasts }, idx) => {
            let sectionLabel;
            if (idx === 0 && date === todayStr) {
              sectionLabel = 'Today';
            } else {
              const now = new Date(date);
              const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
              const cityDate = new Date(utcTime + timezone * 1000);
              sectionLabel = cityDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
            }
            return (
              <View key={date}>
                <Text style={styles.sectionHeader}>{sectionLabel}</Text>
                {forecasts.map(item => (
                  <View key={item.dt_txt} style={styles.forecastRow}>
                    <Text style={styles.timeText}>
                      {new Date(item.dt_txt).toLocaleTimeString(undefined, {
                        hour: 'numeric',
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
              </View>
            );
          })}
        </View>
      ) : (
        <Text>Enter a city to get weather.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  responsiveContainer: {
    width: '100%',
    maxWidth: 350, // or whatever width looks good (e.g., 400-600)
    alignSelf: 'center',
    paddingHorizontal: 16, // for some side padding
  },
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