import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { windowWidth } from '../../App';

interface Props {
  id: number;
  titulo: string;
  location: string;
  date: string;
  estado: number;
  goToScreen: Function;
  tecnico?: string;
  rol?: string;
  cliente?: string;
}

export const ItemOT = ({
  id,
  titulo,
  location,
  date,
  estado,
  goToScreen,
  tecnico,
  rol,
  cliente,
}: Props) => {
  const isVistaTecnico = rol == 'tecnico'

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <Text style={styles.number}>#{id}</Text>
            <Estado estado={estado} />
          </View>
          <Text style={styles.title}>{titulo}</Text>
          <View style={styles.divisor} />
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.tecnico}>{!isVistaTecnico ? 'Técnico:' : null}</Text>
                <Text
                  style={[
                    styles.tecnico,
                    { paddingHorizontal: !isVistaTecnico ? 5 : 0, textAlign: 'auto' },
                  ]}>
                  {isVistaTecnico ? cliente : 'Martin Sastre'}
                </Text>
              </View>
              <View>
                {/* <TouchableOpacity>
                  <Text style={[styles.tecnico, { color: '#3B58A5' }]}>
                    Ver info de tecnico
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <View style={styles.divisor} />
            <View>
              <Text style={styles.info}>{location}</Text>
              <Text style={styles.info}>{date}</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{ padding: 10, alignSelf: 'center', margin: 2, width: '100%' }}>
        <View style={[styles.divisor]} />
        {(isVistaTecnico ? <DetalleBtnTecnico estado={estado} goToScreen={goToScreen} /> : <DetalleBtn estado={estado} goToScreen={goToScreen} />)}
      </View>
    </View>
  );
};

function formatDate(date: string) {
  return date.split('T', 1);
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#c5cbe3',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    marginHorizontal: 8,
    marginVertical: 10,
    elevation: 6,
  },
  number: {
    fontSize: 23,
    color: '#3D3D3D',
  },
  title: {
    marginTop: 3,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 19,
  },
  tecnico: {
    marginTop: 3,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#474747',
    fontSize: 18,
  },
  divisor: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCCCCC',
    marginBottom: 5,
  },
  info: {
    marginVertical: 3,
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

interface PropEstado {
  estado: number;
}

const Estado = ({ estado }: PropEstado) => {
  const Estado = [
    { name: 'Pendiente', color: '#F13C20' },
    { name: 'Estoy en camino', color: '#D79922' },
    { name: 'Me recibió', color: '#4056A1' },
    { name: 'No me atendió', color: 'brown' },
    { name: 'Finalizado', color: 'green' },
    { name: 'No me recibió', color: 'purple' },
  ];

  return (
    <Text
      style={{
        fontSize: 21,
        fontWeight: 'bold',
        color: Estado[estado].color,
        textAlign: 'right',
        alignSelf: 'center',
      }}>
      {Estado[estado].name}
    </Text>
  );
};

interface PropBtn {
  estado: number;
  goToScreen: Function;
}
const DetalleBtn = ({ estado, goToScreen }: PropBtn) => {
  const colorBtn = estado == 4 ? 'green' : '#5E5E5E';
  return (
    <View style={{ marginVertical: 5 }}>
      <TouchableOpacity
        disabled={estado != 4}
        onPress={() => {
          goToScreen();
        }}>
        <Text
          style={{
            borderColor: colorBtn,
            color: colorBtn,
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          {estado === 4
            ? 'Ver detalle'
            : 'Detalle aún no disponible'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const DetalleBtnTecnico = ({ estado, goToScreen }: PropBtn) => {

  const states = ['Pendiente',
    'Estoy en camino',
    'Me recibió',
    'No me atendio',
    'Realizado',
    'Postergado',
    'Pendiente de envio']



  return (
    <View style={{ marginVertical: 5 }}>
      <TouchableOpacity
        onPress={() => {
          goToScreen();
        }}
        style={{
          borderRadius: 8,
          alignSelf: 'flex-end',
          width: 0.35 * windowWidth,
          backgroundColor: '#32367A',
          elevation: 10,
          paddingVertical: 9,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '100',
            alignSelf: 'center',
          }}>
          {estado == 0 ? 'Tomar orden' : estado < 3 ? 'Continuar' : 'Ver orden'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};


