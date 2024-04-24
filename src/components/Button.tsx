import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title?: string;
  color?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <Pressable style={({ pressed }) => [{backgroundColor: pressed ? '#7F7F7F' : props.color || '#2196F3'}, styles.button]} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    color: 'white',
    letterSpacing: 0.25,
    fontFamily: 'AveriaLibre-Bold',
  },
});
