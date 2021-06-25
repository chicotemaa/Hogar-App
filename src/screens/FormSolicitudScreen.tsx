import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors, IconButton, List, TextInput} from 'react-native-paper';
import {Button as BtnDialog, Paragraph, Dialog, Portal} from 'react-native-paper';
import {getAllServiciosAPI} from '../api/api';
import {getSucursalesAPI, sendSolicitud} from '../api/apiClientes';
import {Button} from '../components/Button';
import {Header} from '../components/Header';
import {RootStackParams} from '../navigator/StackNavigator';
import Spinner from 'react-native-loading-spinner-overlay';
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

   const [visible, setVisible] = React.useState(false);
   const showDialog = () => setVisible(true);
   const hideDialog = () => setVisible(false);

  const [solicitud, setSolicitud] = useState({
    tipoServicio: '',
    nombreServicio: '',
    causa: '',
    descripcion: '',
    foto: '1234',
  });

  const validateInputs = () => {    
    const { causa,descripcion } = solicitud;
    if(causa == '' || descripcion == ''){
      showDialog()          
      setValido(false)      
    }else{
      enviarSolicitud();    
    }  
  };
  

  function enviarSolicitud() {
    sendSolicitud(solicitud).then(success => {
      navigation.navigate('SuccessScreen', {success});
    });  
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
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {  
    
    getSucursalesAPI().then(sucursales => {      
      setSucursal(sucursales);
    });
    getAllServiciosAPI().then(arrayServicios => {      
      setServicios(arrayServicios);
      setSpinner(!spinner);
    });
  }, []);

  const handlePress = () => setExpanded(!expanded);

  //Spinner

  
  
    
  
  return (
    <>
      <Header pageName="Crear Solicitud" />
      {spinner ? (
        <View>
          <Spinner
            visible={spinner}
            textContent={'Cargando...'}
            textStyle={{color: '#FFF'}}
          />
        </View>
      ) : (
        <View style={[styles.container, {paddingTop: 10, flex: 8}]}>
          <Alerta
            campo={solicitud.causa == '' ? 'causa' : 'descripción'}
            hideDialog={hideDialog}
            visible={visible}
          />
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
                  setValido(true);
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
                  setValido(true);
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
      )}
    </>
  );
};


const labelInput = ({text}) => {
  return (
    <View style={{marginVertical: 5}}>
      <Text style={{fontSize: 23, color: '#111111'}}>{text}</Text>
    </View>
  );
};

//numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
//minHeight={(Platform.OS === 'ios' && numberOfLines) ? (20 * numberOfLines) : null}

interface PropsAlert {
  campo:string;
  visible:boolean;
  hideDialog:()=>void;
}
const Alerta = ({campo,visible,hideDialog}:PropsAlert) => {
  return (<Portal>
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Title>Solucitud Erronea</Dialog.Title>
      <Dialog.Content>
        <Paragraph style={{fontSize: 19}}>
          La {campo} no puede estar vacia.
        </Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <BtnDialog onPress={hideDialog}>Aceptar</BtnDialog>
      </Dialog.Actions>
    </Dialog>
  </Portal>)
}