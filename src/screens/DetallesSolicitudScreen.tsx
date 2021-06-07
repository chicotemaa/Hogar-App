import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modal, Portal, Text, Button, Provider} from 'react-native-paper';
import {getSolicitudById} from '../api/apiClientes';
import {RootStackParams} from '../navigator/StackNavigator';
import {getData} from '../api/api';
import {Solicitud} from '../components/Solicitud';
import {styles} from '../theme/appTheme';
import {Header} from '../components/Header';

interface Props
  extends StackScreenProps<RootStackParams, 'DetalleSolicitudScreen'> {}

interface InfoSolicitud {
  consulta: string; //description
  createdAt: string;
  estado: string;
  servicio: string;
  necesitasAyuda: string; //incidencia-title
}

export const DetallesSolicitudScreen = ({navigation, route}: Props) => {
  const [visible, setVisible] = useState(false);

  const infoSolicitud: InfoSolicitud = {
    consulta: '',
    createdAt: '',
    servicio: '',
    estado: '',
    necesitasAyuda: '',
  };

  const [solicitud, setSolicitud] = useState(infoSolicitud);

  const id = route.params.codigo;

  useEffect(() => {
    getData('access_token').then(token => {
      getSolicitudById(id, token).then(solicitud => {
        console.log(solicitud);

        setSolicitud({
          consulta: solicitud.consulta,
          createdAt: formatDate(solicitud.createdAt),
          estado: 'Pendiente',
          necesitasAyuda: solicitud.necesitasAyuda,
          servicio: solicitud.servicio,
        });
      });
    });
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <View style={{backgroundColor: '#E7E1E1', flex: 1}}>
        <Header
          id={id}
          title={solicitud.necesitasAyuda}
          fecha={solicitud.createdAt}
        />

        <View style={[styles.container, {flex: 5.3}]}>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={stylesDetalle.containerModal}>
              <Text>{id}</Text>
            </Modal>
          </Portal>

          <View>
            <Solicitud
              consulta={solicitud.consulta}
              servicio={solicitud.servicio}
              estado={solicitud.estado}
            />
            <Button style={{flex: 1}} onPress={showModal}>
              Show
            </Button>
          </View>
        </View>
      </View>
    </Provider>
  );
};

const stylesDetalle = StyleSheet.create({
  containerModal: {
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 200,
    width: '80%',
  },
  headerStyle: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
  },
  number: {
    color: '#EC5342',
  },
});

function formatDate(fecha: string) {
  const date = new Date(fecha);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleString('es-ES', options);
}
