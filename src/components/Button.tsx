import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { windowWidth } from '../../App';

interface Props {
  title: string;
  color: string;
  width?: number | string;
  height?: number;
  onPress: () => void;
}

export const Button = ({ title, color, onPress, height, width, style = {} }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color, height, width }]}
      onPress={onPress}>
      <Text style={[styles.text, {}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    width: 200,
    borderRadius: 10,
    elevation: 9,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  text: {
    fontSize: 0.045 * windowWidth,
    fontWeight: 'normal',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
  },
});
