import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { styleStep } from './styleStep';

export const SucursalStep = () => {
  const sucursales = [
    'San martin 1234',
    'Sarmiento 123',
    'Sarmiento 13',
    'Sarmiento 11',
    'Sarmiento 133',
    'Sarmiento 123',
  ];
  const [value, setValue] = React.useState('');

  return (
    <View style={styleStep.container}>
      <ScrollView>
        <RadioButton.Group
          onValueChange={value => setValue(value)}
          value={value}>
          {sucursales.map(sucursal => {
            return (
              <View style={style.item}>
                <RadioButton.Item
                  label={sucursal}
                  labelStyle={{ color: 'grey' }}
                  color="orange"
                  value={sucursal}
                />
              </View>
            );
          })}
        </RadioButton.Group>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  item: {
    marginVertical: 10,
    borderBottomWidth: 0.5,
    marginHorizontal: 10,
    borderBottomColor: '#E8E8E8',
  },
});
