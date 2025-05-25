import { Pressable, StyleSheet, Text, View } from 'react-native';
import parseStateAbbreviations from '../utils/parseStateAbbreviations';

export default function CityList({ city, onPress }) {
  console.log(city.admin_name);
  console.log(city.iso2);
  return (
    <View>
      <Pressable onPress={onPress}>
        <Text>{city.city_ascii}, {city.iso2 === "US" ? parseStateAbbreviations(city.admin_name) : city.country}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cityContainer: {
  },
  cityButton: {
  },
  cityText: {
  },
});