import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function SearchButton({ onPress }: Props) {
  return (
    <View>
      <Pressable style={styles.searchButton} onPress={onPress}>
        <Text style={styles.searchButtonText}>go.</Text>
      </Pressable>
    </View>
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
