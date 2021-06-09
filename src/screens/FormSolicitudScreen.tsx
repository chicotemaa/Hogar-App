import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomSheet, ListItem} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors, IconButton, List, TextInput} from 'react-native-paper';
import {getAllServiciosAPI} from '../api/api';
import {Header} from '../components/Header';
import {RootStackParams} from '../navigator/StackNavigator';
import {styles} from '../theme/appTheme';

interface Props
  extends StackScreenProps<RootStackParams, 'FormSolicitudScreen'> {}

export const FormSolicitudScreen = ({navigation, route}: Props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [servicioSelected, setServicioSelected] = useState('');
  const [servicios, setServicios] = useState([]);
  const iconosServicio = {
    Electricidad: 'flash',
    ['Plomería']: 'pipe',
    Carpintero: 'hand-saw',
    ['Jardinería']: 'watering-can-outline',
    ['Aires Acondicionados']: 'air-conditioner',
    Pintura: 'format-paint',
  };
  //TODO: Cambiar empty array x elemento texto que indique cargando
  useEffect(() => {
    getAllServiciosAPI().then(arrayServicios => {
      setServicios(arrayServicios);
    });
  }, []);

  const handlePress = () => setExpanded(!expanded);
  return (
    <>
      <Header pageName="Generar Solicitud" />
      <View style={[styles.container, {flex: 5}]}>
        <ScrollView>
          <View style={{justifyContent: 'space-between'}}>
            {labelInput({text: 'Sucursal'})}
            <TextInput
              theme={{roundness: 5}}
              style={{fontSize: 20, borderRadius: 5}}
              disabled
              value={'Parrilla ruta 11'}
            />
            {labelInput({text: 'Tipo Solicitud'})}
            <List.Accordion
              title={
                servicioSelected == ''
                  ? 'Seleccione tipo de servicio'
                  : servicioSelected
              }
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    servicioSelected == ''
                      ? 'hammer-wrench'
                      : iconosServicio[servicioSelected]
                  }
                />
              )}
              style={{backgroundColor: 'white'}}
              theme={{roundness: 20}}
              expanded={expanded}
              onPress={handlePress}>
              {servicios.map(servicio => {
                const servicioKey: string = servicio['@id'];
                return (
                  <List.Item
                    key={servicioKey}
                    title={servicio.titulo}
                    style={{
                      backgroundColor: 'white',
                      borderWidth: 0.5,
                      marginTop: 5,
                      borderColor: 'grey',
                    }}
                    left={props => (
                      <List.Icon
                        {...props}
                        icon={iconosServicio[servicio.titulo]}
                      />
                    )}
                    onPress={() => {
                      setExpanded(!expanded);
                      setServicioSelected(servicio.titulo);
                    }}
                  />
                );
              })}
            </List.Accordion>

            {labelInput({text: 'Causa del problema?'})}
            <TextInput
              outlineColor="transparent"
              theme={{roundness: 5}}
              style={{fontSize: 20, backgroundColor: 'white', borderRadius: 10}}
              label=""
            />
            {labelInput({text: 'Descripción'})}
            <TextInput
              multiline={true}
              numberOfLines={6}
              theme={{roundness: 5}}
              style={{
                padding: 5,
                fontSize: 20,
                backgroundColor: 'white',
                borderRadius: 5,
              }}
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

//numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
//minHeight={(Platform.OS === 'ios' && numberOfLines) ? (20 * numberOfLines) : null}
