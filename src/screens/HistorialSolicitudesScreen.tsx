import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '~/theme/appTheme';
import { ItemHistorial } from '~/components/ItemHistorial';
import { ScrollView } from 'react-native-gesture-handler';
import { getSolicitudesAPI } from '~/api/apiClientes';
import { RootStackParams } from '~/navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { Header } from '~/components/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { TransitionView } from '~/components/TransitionView';
import { Solicitudes } from '~/api/types';

interface Props
  extends StackScreenProps<RootStackParams, 'HistorialSolicitudesScreen'> {}

export const HistorialSolicitudesScreen = ({ navigation }: Props) => {
  const [items, setItems] = useState(empty);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const array = await getSolicitudesAPI();
        setItems(getItems(array));
        setTimeout(() => {
          setLoading(false);
        }, 900);
      } catch {
        setItems(empty);
      }

      function getItems(array: Solicitudes[]): JSX.Element {
        if (array.length === 0) {
          return empty;
        } else {
          return (
            <>
              {array
                .slice()
                .reverse()
                .map((element, index) => (
                  <ItemHistorial
                    key={element.id}
                    index={index}
                    solicitud={element}
                    navigation={navigation}
                  />
                ))}
            </>
          );
        }
      }
    })();
  }, [navigation]);

  return (
    <>
      <Header pageName={'Solicitudes'} />
      <View style={[styles.container, { flex: 9 }]}>
        <View style={stylesHistorial.containerItems}>
          {loading ? (
            <View>
              <Spinner
                visible={loading}
                textContent={'Cargando...'}
                textStyle={{ color: '#FFF' }}
              />
            </View>
          ) : (
            <ScrollView>
              <TransitionView>{items}</TransitionView>
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
};

const stylesHistorial = StyleSheet.create({
  containerItems: {
    flex: 5,
    flexDirection: 'column-reverse',
    marginHorizontal: 1,
    marginBottom: 10,
  },
  message: {
    fontSize: 30,
    marginVertical: 200,
    textAlign: 'center',
    fontWeight: '500',
  },
});

const empty = (
  <View>
    <Text style={stylesHistorial.message}>No hay solicitudes</Text>
  </View>
);
