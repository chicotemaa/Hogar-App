import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors, IconButton, TextInput} from 'react-native-paper';
import {Header} from '../components/Header';
import {RootStackParams} from '../navigator/StackNavigator';
import {styles} from '../theme/appTheme';

interface Props
  extends StackScreenProps<RootStackParams, 'FormSolicitudScreen'> {}

export const FormSolicitudScreen = ({navigation, route}: Props) => {
  const {tipoServicio} = route.params || '/api/servicios/2';
  return (
    <>
      <Header pageName="Generar Solicitud" />
      <View style={[styles.container, {flex: 5}]}>
        <ScrollView>
          <Text>{tipoServicio}</Text>
          <View style={{justifyContent: 'space-between'}}>
            {labelInput({text: 'Tipo Solicitud'})}
            <TextInput style={{fontSize: 20}} disabled value={'Electricidad'} />
            {labelInput({text: 'Sucursal'})}
            <TextInput
              style={{fontSize: 20}}
              disabled
              value={'Parrilla ruta 11'}
            />
            {labelInput({text: 'Causa del problema?'})}
            <TextInput style={{fontSize: 20}} label="" />
            {labelInput({text: 'Descripción'})}
            <TextInput
              style={{
                fontSize: 20,
                height: 200,
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
              }}
              label=""
            />
            <IconButton
              icon="camera"
              color={Colors.red500}
              size={40}
              onPress={() => console.log('Pressed')}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styleForm = StyleSheet.create({});

const labelInput = ({text}) => {
  return (
    <View style={{marginVertical: 5}}>
      <Text style={{fontSize: 20}}>{text}</Text>
    </View>
  );
};
