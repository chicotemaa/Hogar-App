import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View, RefreshControl, Text } from 'react-native';
import { useQuery } from 'react-query';
import { OrdenTrabajo } from '~/api/types';
import { getOrdenesTrabajoRealizadasInfo } from '~/services/tecnicosServices';
import { ItemOT } from '~/components/ItemOT';
import { TransitionView } from '~/components/TransitionView';
import { otStyle } from '../../../theme/appTheme';

export const TecnicosOTListRealizadas = () => {
  const { data, error, isFetching, refetch } = useQuery(
    'OTListRealizada',
    getOrdenesTrabajoRealizadasInfo,
  );
  const stackNavigator = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }>
        {data && !isFetching ? (
          data.length > 0 ? (
            data.map((OT: OrdenTrabajo) => {
              return <ListItem OTR={OT} stackNavigator={stackNavigator} />;
            })
          ) : (
            <EmptyList />
          )
        ) : isFetching ? (
          <LoadingMessage />
        ) : (
          <ErrorMessage />
        )}
      </ScrollView>
    </View>
  );
};

const EmptyList = () => {
  return (
    <View style={{ flex: 1 }}>
      {<Text style={otStyle.TextCargando}>No hay ot pendientes</Text>}
    </View>
  );
};

const ListItem = ({ OTR, stackNavigator }) => {
  return (
    <TransitionView key={OTR.fecha} animation="slideInUp" index={0} isOT>
      <ItemOT
        OT={OTR}
        titulo={OTR.formulario.titulo}
        rol="tecnico"
        goToScreen={(estado: string) => {
          if (estado === 'realizarOT') {
            //TODO: controlar ubicacion
            stackNavigator.navigate('OTScreen', { OTR });
          } else if ((estado = 'detalleOTRealizada')) {
            stackNavigator.navigate('DetalleOTScreen', { OTR });
          }
        }}
      />
    </TransitionView>
  );
};

const LoadingMessage = () => {
  return (
    <View>
      <Text style={otStyle.TextCargando}>Cargando OT </Text>
    </View>
  );
};

const ErrorMessage = () => {
  return (
    <View>
      <Text style={otStyle.TextCargando}>
        Error al obtener el listado de las ot { }
      </Text>
    </View>
  );
};
