import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function SearchButton({ onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.searchButton,
        {
          backgroundColor: pressed ? '#63b3ed' : '#1e90ff',
        },
      ]}
    >
      <Text style={styles.searchButtonText}>go.</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
