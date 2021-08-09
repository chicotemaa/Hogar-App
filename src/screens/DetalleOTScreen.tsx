import React from 'react';
import { FlexStyle, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { Estado } from '../components/OT/Detalle/Estado';
import { Formulario } from '../components/OT/Detalle/Formulario';

export const DetalleOTScreen = () => {
  return (
    <>
      <Header pageName="Informe de Trabajo" />
      <View style={{ flex: 10, backgroundColor: '#FFFFFF' }}>
        <ScrollView>
          <Text style={styles.tituloText}>Informaciones Generales</Text>

          <Text style={styles.subtitulo}>Cliente</Text>
          <Text style={styles.contenido}>Pedidos ya</Text>
          <Text style={[styles.contenido, { fontWeight: 'bold' }]}>
            Direccion
          </Text>
          <Text style={styles.contenido}>Sarmiento 123</Text>

          <View>
            <Estado horaInicio="9:30" horaFin="10.30" />
          </View>

          <Text style={styles.tituloText}>Descripción de trabajo</Text>
          <Formulario />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
