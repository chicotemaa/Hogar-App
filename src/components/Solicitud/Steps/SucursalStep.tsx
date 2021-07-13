import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { windowHeight } from '../../../../App';
import { RadioSelect } from '../../RadioSelect';
import { styleStep } from './styleStep';

export const SucursalStep = () => {
  const sucursales = ['Maipu 247','Sarmiento 123']
  const [value, setValue] = React.useState('');

  return (
    <View
      style={styleStep.container}>
      <ScrollView>
        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
          {
            sucursales.map(sucursal => {
              return (
                <RadioButton.Item label={sucursal} value={sucursal} />
              )
            })
          }
        </RadioButton.Group>
      </ScrollView>      
    </View>
  );
};


const style = StyleSheet.create({
  text:{
    fontSize:windowHeight*0.03,
    color:'#575757'
  }
})
