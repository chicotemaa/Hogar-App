import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/* TODO: ver tipos de campos
    -Texto
    -Numero
    -Seleccion multiple
    -Casilla de verificacion
    -Desplegable
    -Fecha
    -Fecha y hora
    -Hora
    -Foto
    -Titulo
    -Texto en mayuscula

*/

export const Modulo = () => {
  return (
    <View>
      <Subtitulo />
      <Divisor />
      <Campo />
      <Divisor />
      <CampoFoto />
    </View>
  );
};

const Subtitulo = () => {
  return (
    <View>
      <Text style={styles.Subtitulo}>Subtitulo</Text>
    </View>
  );
};

const Divisor = () => {
  return <View style={styles.Divisor} />;
};

const Campo = () => {
  return (
    <View style={styles.Campo}>
      <Text style={styles.textStyle}>Campo</Text>
      <Text style={styles.textStyleCenter}>Si</Text>
    </View>
  );
};

const CampoFoto = () => {
  const textStyle = { fontSize: 15, flex: 1, paddingVertical: 10 };
  const Imagen = () => {
    return <View style={styles.Imagen} />;
  };
  return (
    <View>
      <Text style={textStyle}>Fotografia</Text>
      <Divisor />
      <View style={styles.RowImagen}>
        <Imagen />
        <Imagen />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Subtitulo: { fontSize: 20, paddingVertical: 10 },
  Divisor: { borderWidth: 1, borderColor: '#DFDFDF', flex: 1 },
  Campo: { flexDirection: 'row', justifyContent: 'space-between' },
  textStyle: { fontSize: 15, flex: 1, paddingVertical: 10 },
  textStyleCenter: {
    fontSize: 15,
    flex: 1,
    paddingVertical: 10,
    textAlign: 'center',
  },
  Imagen: {
    height: 200,
    width: '30%',
    backgroundColor: 'grey',
    marginVertical: 10,
    marginLeft: 5,
  },
  RowImagen: { flexDirection: 'row' },
});
