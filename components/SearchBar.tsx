import React, {useState} from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

type Props = {
  onChangeText: () => void;
};

export default function SearchBar({ onChangeText }: Props) {

  return (
    <View>
      <TextInput
        keyboardType="default"
        placeholder="'boise'"
        placeholderTextColor="#b1c4b6"
        onChangeText={onChangeText}
      />
    </View>
  );
}
