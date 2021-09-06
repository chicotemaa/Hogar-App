import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { windowWidth } from '~/dimensions';
import { Title } from './Title';

interface Props {
  title: string;
  color: string;
  width?: number | string;
  height?: number;
  subtitle?: string;
  onPress: () => void;
}

export const Button = ({ title, color, onPress, height, width }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color, height, width }]}
      onPress={onPress}>
      <Text style={[styles.text, {}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const ButtonWithSubtitle = ({
  title,
  color,
  onPress,
  height,
  width,
  subtitle,
}: Props) => {
  return (
    <View>
      <Button
        title={title}
        color={color}
        onPress={onPress}
        height={height}
        width={width}
      />
      <View style={{ margin: 10 }}>
        <Title color="#343030" text={subtitle} size={14} />
      </View>
    </View>
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
