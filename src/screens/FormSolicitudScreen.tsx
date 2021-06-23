import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors, IconButton, List, TextInput} from 'react-native-paper';
import {getAllServiciosAPI} from '../api/api';
import {getSucursalesAPI, sendSolicitud} from '../api/apiClientes';
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
  const [sucursal, setSucursal] = useState('');
  const [valido, setValido] = useState(true);

  const [solicitud, setSolicitud] = useState({
    tipoServicio: '',
    nombreServicio: '',
    causa: '',
    descripcion: '',
    foto: '1234',
  });

  const validateInputs = () => {
    solicitud.causa == '' ? emptyInput('causa') : solicitud.causa;
    solicitud.descripcion == ''
      ? emptyInput('descripcion')
      : solicitud.descripcion;
    //TODO: comprobar el input corregido
    if (valido) {
      enviarSolicitud();
    }
  };

  const emptyInput = (input: string) => {
    setValido(false);
    setSolicitud({
      ...solicitud,
      [input]: `Debe ingresar la ${input} del problema`,
    });
  };

  function enviarSolicitud() {
    sendSolicitud(solicitud).then(success => {
      navigation.navigate('SuccessScreen', {success});
    });
    //TODO: controlar que respuesta envió la creacion de la solicitud
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
    getSucursalesAPI().then(sucursales => {
      console.log(sucursal);
      setSucursal(sucursales);
    });

    getAllServiciosAPI().then(arrayServicios => {
      //console.log(arrayServicios);
      setServicios(arrayServicios);
    });
  }, []);

  const handlePress = () => setExpanded(!expanded);
  return (
    <>
      <Header pageName="Crear Solicitud" />
      <View style={[styles.container, {paddingTop: 10, flex: 8}]}>
        <ScrollView>
          <View style={{justifyContent: 'space-between'}}>
            {labelInput({text: 'Sucursal'})}
            <TextInput disabled value={sucursal} />
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
              style={{backgroundColor: 'white', borderRadius: 5}}
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
              value={solicitud.causa}
              mode={'outlined'}
              error={!valido}
              theme={{roundness: 5}}
              style={{
                fontSize: 20,
                backgroundColor: 'white',
              }}
              onChangeText={text => {
                setSolicitud({
                  ...solicitud,
                  causa: text,
                });
              }}
              label=""
            />
            {labelInput({text: 'Descripción'})}
            <TextInput
              value={solicitud.descripcion}
              mode={'outlined'}
              error={!valido}
              multiline
              theme={{roundness: 5}}
              numberOfLines={5}
              style={{
                textTransform: 'uppercase',
                fontSize: 18,
                backgroundColor: 'white',
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
                onPress={validateInputs}
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
      <Text style={{fontSize: 23, color: '#111111'}}>{text}</Text>
    </View>
  );
};

//numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
//minHeight={(Platform.OS === 'ios' && numberOfLines) ? (20 * numberOfLines) : null}
