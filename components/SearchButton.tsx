import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function SearchButton({ onPress }: Props) {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Text>go.</Text>
      </Pressable>
    </View>
  );
}
