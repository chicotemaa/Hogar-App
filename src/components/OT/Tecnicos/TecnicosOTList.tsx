import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View, RefreshControl, Text } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { OrdenTrabajo } from '~/services/interfaces';
import { getOrdenesTrabajoInfo } from '~/services/tecnicosServices';
import { ItemOT } from '~/components/ItemOT';
import { TransitionView } from '~/components/TransitionView';

export const TecnicosOTList = () => {
  const queryClient = useQueryClient();
  const { data, error, isFetching } = useQuery('OTList', getOrdenesTrabajoInfo);

  const [refreshing, setRefreshing] = React.useState(false);
  const stackNavigator = useNavigation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    queryClient.refetchQueries('OTList');
    setRefreshing(false);
  }, []);

  if (error) {
    return (
      <View>
        <Text>Error al obtener el listado de las ot {error}</Text>
      </View>
    );
  }

  if (isFetching) {
    return (
      <View>
        <Text>Cargando ot </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {data &&
          (data.length > 0 ? (
            data.map((OT: OrdenTrabajo) => {
              return (
                <TransitionView
                  key={OT.id}
                  animation="slideInUp"
                  index={0}
                  isOT>
                  <ItemOT
                    OT={OT}
                    id={OT.id}
                    estadoOT={OT.estado}
                    cliente={OT.cliente.razonSocial}
                    titulo={OT.formulario.titulo}
                    location={OT.direccionSucursalCliente}
                    date={OT.fecha}
                    rol="tecnico"
                    horaDesde={OT.horaDesde}
                    horaHasta={OT.horaHasta}
                    goToScreen={(estado: string) => {
                      if (estado === 'realizarOT') {
                        //TODO: controlar ubicacion
                        stackNavigator.navigate('OTScreen', { OT });
                      } else if ((estado = 'detalleOTRealizada')) {
                        stackNavigator.navigate('DetalleOTScreen');
                      }
                    }}
                  />
                </TransitionView>
              );
            })
          ) : (
            <EmptyList />
          ))}
      </ScrollView>
    </View>
  );
};

const EmptyList = () => {
  return <View style={{ flex: 1 }}>{<Text>No hay ot pendientes</Text>}</View>;
};
