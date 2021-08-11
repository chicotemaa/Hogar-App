import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { windowHeight, windowWidth } from '~/dimensions';
import {
  changeStateEnCamino,
  changeStateMeRecibio,
  changeStateNoMeRecibio,
} from '../services/tecnicosServices';

interface Props {
  id: number;
  titulo: string;
  location: string;
  date: string;
  estadoOT: number;
  goToScreen: Function;
  tecnico?: string;
  rol?: string;
  cliente?: string;
  horaDesde: string;
  horaHasta: string;
  OT: any;
}

export const ItemOT = ({
  id,
  titulo,
  location,
  date,
  estadoOT,
  goToScreen,
  rol,
  cliente,
  horaDesde,
  horaHasta,
  OT,
}: Props) => {
  const isVistaTecnico = rol == 'tecnico';
  const [estado, setEstado] = useState(estadoOT);
  const handleState = async (estado: number, newState: number) => {
    switch (newState) {
      case 1:
        setEstado(newState);
        changeStateEnCamino(OT);
        break;
      case 2:
        //Verificar si existe resultado de ot
        changeStateMeRecibio(OT).then(status => {
          status && setEstado(newState);
        });
        break;
      case 3:
        setEstado(newState);
        changeStateNoMeRecibio(OT);
        break;
    }
  };

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
          <View style={styles.divisor} />
          <Text style={styles.title}>{titulo}</Text>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.tecnico}>
                  {!isVistaTecnico ? 'Técnico:' : null}
                </Text>
                <Text
                  style={[
                    styles.tecnico,
                    {
                      paddingHorizontal: !isVistaTecnico ? 5 : 0,
                      textAlign: 'auto',
                    },
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
              <Text
                style={[
                  styles.info,
                  { fontSize: 0.027 * windowHeight, marginBottom: 10 },
                ]}>
                {location}
              </Text>
              <View style={styles.divisor} />
              <Text style={styles.info}>Fecha: {formatDate(date, 0)}</Text>
              <View style={styles.divisor} />
              <Text style={styles.info}>Desde: {formatDate(horaDesde, 1)}</Text>
              <Text style={styles.info}>Hasta: {formatDate(horaHasta, 1)}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ padding: 10, alignSelf: 'center', width: '100%' }}>
        <View style={[styles.divisor]} />
        {isVistaTecnico ? (
          <DetalleBtnTecnico
            estado={estado}
            changeState={(state: number) => handleState(estado, state)}
            goToScreen={goToScreen}
          />
        ) : (
          <DetalleBtn
            estado={estado}
            changeState={() => {}}
            goToScreen={goToScreen}
          />
        )}
      </View>
    </View>
  );
};

function formatDate(date: string, position: number) {
  const d = date.split('T', 2)[position];
  if (position === 1) {
    return d.slice(0, 5);
  }
  return d;
}

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
  changeState: Function;
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
          {estado === 4 ? 'Ver detalle' : 'Detalle aún no disponible'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const DetalleBtnTecnico = ({
  estado: estadoActual,
  goToScreen,
  changeState,
}: PropBtn) => {
  const textState = ['Tomar orden', 'Ya llegué', 'Realizar'];

  return (
    <View style={{ marginVertical: 5 }}>
      <View
        style={{
          flexDirection: estadoActual == 1 ? 'row' : 'column',
          justifyContent: 'space-between',
        }}>
        {estadoActual == 1 ? (
          <TouchableOpacity
            onPress={() => {
              changeState(3);
              // goToScreen();
              console.log('no me atendio');
            }}
            style={{
              borderRadius: 8,
              borderWidth: 1,
              alignSelf: 'flex-start',
              width: 0.35 * windowWidth,
              borderColor: '#D17D2A',
              elevation: 0,
              paddingVertical: 9,
            }}>
            <Text
              style={{
                color: '#D17D2A',
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {'No me recibio'}
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            estadoActual === 0
              ? changeState(1)
              : estadoActual === 1 && changeState(2);
            if (estadoActual === 2) {
              goToScreen('realizarOT');
            } else if (estadoActual > 3) {
              goToScreen('detalleOTRealizada');
            } else if (estadoActual === 3) {
              //TODO: mostrar en que momento fue a la sucursal
              console.log('no me recibio el dia x a las x horas');
            }
          }}
          style={{
            borderRadius: 8,
            alignSelf: 'flex-end',
            width: 0.35 * windowWidth,
            backgroundColor: estadoActual == 0 ? '#32367A' : '#178C54',
            elevation: 10,
            paddingVertical: 9,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'normal',
              alignSelf: 'center',
            }}>
            {estadoActual < 3 ? textState[estadoActual] : 'Ver detalle'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginTop: 5,
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 0.035 * windowHeight,
    textTransform: 'capitalize',
  },
  tecnico: {
    marginTop: 3,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#F13C20',
    fontSize: 0.025 * windowHeight,
  },
  divisor: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCCCCC',
    marginBottom: 5,
  },
  info: {
    marginVertical: 3,
    color: '#282828',
    fontWeight: '600',
    fontSize: 0.04 * windowWidth,
  },
});
