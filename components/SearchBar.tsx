import React, { useRef } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';

type Props = {
  onChangeText: (text: string) => void;
  onSubmit?: (text: string) => void;
};

export default function SearchBar({ onChangeText, onSubmit }: Props) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable
      style={styles.searchBar}
      onPress={() => inputRef.current && inputRef.current.focus()}
    >
      <TextInput
        ref={inputRef}
        style={styles.textInput}
        keyboardType="default"
        placeholder="'boise'"
        placeholderTextColor="#b1c4b6"
        onChangeText={onChangeText}
        onSubmitEditing={e => onSubmit && onSubmit(e.nativeEvent.text)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderColor: '#fff',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    width: '100%',
    outlineWidth: 0,
    borderWidth: 0,           // Remove any border if present
    backgroundColor: 'white',
  },
});
