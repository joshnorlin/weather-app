import React, {useState} from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

type Props = {
  onChangeText: () => void;
};

export default function SearchBar({ onChangeText }: Props) {
  return (
    <View>
      <TextInput
        style={styles.searchBar}
        keyboardType="default"
        placeholder="'boise'"
        placeholderTextColor="#b1c4b6"
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    color: '#333',
  },
});
