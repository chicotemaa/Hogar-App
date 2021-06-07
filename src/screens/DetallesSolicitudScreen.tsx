import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Modal, Portal, Text, Button, Provider} from 'react-native-paper';
import {getSolicitudById} from '../api/apiClientes';
import {RootStackParams} from '../navigator/StackNavigator';
import {getData} from '../api/api';
import {Solicitud} from '../components/Solicitud';
import {styles} from '../theme/appTheme';
import {ScrollView} from 'react-native-gesture-handler';
import {HeaderNuevo} from '../components/HeaderNuevo';

interface Props
  extends StackScreenProps<RootStackParams, 'DetalleSolicitudScreen'> {}

export const DetallesSolicitudScreen = ({navigation, route}: Props) => {
  const [visible, setVisible] = React.useState(false);
  const codigo = '144';
  getData('access_token').then(token => {
    getSolicitudById(codigo, token).then(solicitud => {
      console.log(solicitud);
    });
  });

  console.log('se renderiza');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <View style={{backgroundColor: 'black', flex: 1}}>
        <HeaderNuevo />
        <View style={[styles.container, {flex: 5.3}]}>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={stylesDetalle.containerModal}>
              <Text>{codigo}</Text>
            </Modal>
          </Portal>

          <View style={{backgroundColor: 'black'}}>
            <Solicitud />
          </View>
          <Button style={{marginTop: 30, flex: 1}} onPress={showModal}>
            Show
          </Button>
        </View>
      </View>
    </Provider>
  );
};

const Header = ({id}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1.8,
        borderBottomColor: '#343030',
        marginBottom: 5,
      }}>
      <Text style={[styles.title, stylesDetalle.headerStyle]}>Solicitud</Text>
      <Text
        style={[styles.title, stylesDetalle.headerStyle, stylesDetalle.number]}>
        {' #' + id}
      </Text>
    </View>
  );
};

const DetallesHeader = ({title, fecha}) => {
  const style = {
    fontSize: 25,
    marginVertical: 20,
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        alignSelf: 'stretch',
        marginBottom: 15,

        padding: 3,
      }}>
      <Text style={style}>{title}</Text>
      <Text style={style}>{fecha}</Text>
    </View>
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
