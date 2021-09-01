import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { OrdenTrabajo } from '~/api/types';
import { Header } from '~/components/Header';
import { Estado } from '~/components/OT/Detalle/Estado';
import { Formulario } from '~/components/OT/Detalle/Formulario';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';

interface Props extends StackScreenProps<RootStackParams, 'DetalleOTScreen'> { }

export const DetalleOTScreen = ({ route }: Props) => {
  const OT: OrdenTrabajo = route.params.OT;

  return (
    <>
      <Header pageName="Informe de Trabajo" />
      <View style={styles.Header}>
        <ScrollView>
          <Text style={styles.tituloText}>Información General</Text>

          <Text style={styles.subtitulo}>Cliente</Text>
          <Text style={styles.contenido}>{OT.cliente.razonSocial}</Text>
          <Text style={{ ...styles.contenido, fontWeight: 'bold' }}>
            Direccion
          </Text>
          <Text style={styles.contenido}>{OT.direccionSucursalCliente}</Text>

          <View>
            <Estado horaInicio={OT.horaInicio} horaFin={OT.horaFin} />
          </View>

          <Text style={styles.tituloText}>Descripción de trabajo</Text>
          <Formulario ID={OT.id} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Header: { flex: 10, backgroundColor: '#FFFFFF' },
  tituloText: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: '#DFDFDF',
  },
  subtitulo: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: '#DFDFDF',
  },
  contenido: {
    paddingHorizontal: 20,
    fontSize: 15,
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderColor: '#DFDFDF',
  },
  estado: {
    fontSize: 20,
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderColor: '#DFDFDF',
    flex: 1,
  },
});
