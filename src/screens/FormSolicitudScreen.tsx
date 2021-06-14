import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors, IconButton, List, TextInput} from 'react-native-paper';
import {getAllServiciosAPI} from '../api/api';
import {sendSolicitud} from '../api/apiClientes';
import {Button} from '../components/Button';
import {Header} from '../components/Header';
import {RootStackParams} from '../navigator/StackNavigator';
import {styles} from '../theme/appTheme';

interface Props
  extends StackScreenProps<RootStackParams, 'FormSolicitudScreen'> {}

interface Servicio {
  ['id']: string;
  descripcion: string;
  titulo: string;
}

export const FormSolicitudScreen = ({navigation, route}: Props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [servicios, setServicios] = useState([]);

  const [solicitud, setSolicitud] = useState({
    tipoServicio: '',
    nombreServicio: '',
    causa: '',
    descripcion: '',
    foto: '1234',
  });

  function enviarSolicitud() {
    sendSolicitud(solicitud);
    //console.log(solicitud);
    //navigation.navigate('SuccessScreen');
  }

  const iconosServicio = {
    Electricidad: 'flash',
    ['Plomería']: 'pipe',
    Carpintero: 'hand-saw',
    ['Jardinería']: 'watering-can-outline',
    ['Aires Acondicionados']: 'air-conditioner',
    Pintura: 'format-paint',
    Otro: 'hammer-wrench',
  };
  //TODO: Cambiar empty array x elemento texto que indique cargando
  useEffect(() => {
    getAllServiciosAPI().then(arrayServicios => {
      //console.log(arrayServicios);
      setServicios(arrayServicios);
    });
  }, []);

  const handlePress = () => setExpanded(!expanded);
  return (
    <>
      <Header pageName="Generar Solicitud" />
      <View style={[styles.container, {flex: 9}]}>
        <ScrollView>
          <View style={{justifyContent: 'space-between'}}>
            {labelInput({text: 'Sucursal'})}
            <TextInput disabled value={'Parrilla ruta 11'} />
            {labelInput({text: 'Tipo Solicitud'})}
            <List.Accordion
              title={
                solicitud.nombreServicio == ''
                  ? 'Seleccione tipo de servicio'
                  : solicitud.nombreServicio
              }
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    solicitud.tipoServicio == ''
                      ? 'hammer-wrench'
                      : iconosServicio[solicitud.nombreServicio]
                  }
                />
              )}
              style={{backgroundColor: 'white', elevation: 1}}
              theme={{roundness: 20}}
              expanded={expanded}
              onPress={handlePress}>
              {servicios.map((servicio: Servicio) => {
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
                      setSolicitud({
                        ...solicitud,
                        tipoServicio: servicio['@id'],
                        nombreServicio: servicio.titulo,
                      });
                    }}
                  />
                );
              })}
            </List.Accordion>

            {labelInput({text: 'Causa del problema'})}
            <TextInput
              style={{
                fontSize: 20,
                backgroundColor: 'white',

                elevation: 1,
              }}
              onChangeText={text => {
                console.log(solicitud.causa);
                setSolicitud({
                  ...solicitud,
                  causa: text,
                });
              }}
              label=""
            />
            {labelInput({text: 'Descripción'})}
            <TextInput
              multiline={true}
              numberOfLines={5}
              style={{
                textTransform: 'uppercase',
                fontSize: 18,
                backgroundColor: 'white',
                elevation: 1,
              }}
              onChangeText={text => {
                setSolicitud({
                  ...solicitud,
                  descripcion: text,
                });
              }}
            />
            <IconButton
              icon="camera"
              color={Colors.deepOrangeA700}
              size={40}
              onPress={() => console.log('Pressed')}
            />
            <View
              style={{
                marginBottom: 50,
                alignSelf: 'center',
                width: '70%',
              }}>
              <Button
                title={'Enviar'}
                width={'100%'}
                color={'#178C54'}
                onPress={enviarSolicitud}
              />
            </View>
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
      <Text style={{fontSize: 23}}>{text}</Text>
    </View>
  );
};

//numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
//minHeight={(Platform.OS === 'ios' && numberOfLines) ? (20 * numberOfLines) : null}

/*

servicios.map((servicio: Servicio) => {
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
                      setSolicitud({
                        ...solicitud,
                        tipoServicio: servicio.titulo,
                      });
                    }}
                  />
                );
              })

*/
