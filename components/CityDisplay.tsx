import { Pressable, StyleSheet, Text } from 'react-native';
import parseStateAbbreviations from '../utils/parseStateAbbreviations';

export default function CityList({ city, onPress }) {
  return ( 
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cityContainer,
        {
          backgroundColor: pressed ? '#e6f0fa' : '#fff',
        },
      ]}
    >
      <Text style={styles.cityDetails}>
        {city.city_ascii}, {city.iso2 === "US" ? parseStateAbbreviations(city.admin_name) : city.country}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cityContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2, // Android shadow
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  cityDetails: {
    fontSize: 14,
    color: '#555',
  },
});