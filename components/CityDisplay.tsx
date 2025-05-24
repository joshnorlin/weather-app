import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function CityList({ city, onPress }) {
  return (
    <View>
      <Pressable>
        <Text>{city.city_ascii}</Text>
        <Text>{city.country}</Text>
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