import React from 'react';
import {Text, View} from 'react-native';

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
      <Text style={{fontSize: 20, paddingVertical: 10}}>Subtitulo</Text>
    </View>
  );
};

const Divisor = () => {
  return <View style={{borderWidth: 1, borderColor: '#DFDFDF', flex: 1}} />;
};

const Campo = () => {
  const textStyle = {fontSize: 15, flex: 1, paddingVertical: 10};
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={textStyle}>Campo</Text>
      <Text style={[textStyle, {textAlign: 'center'}]}>Si</Text>
    </View>
  );
};

const CampoFoto = () => {
  const textStyle = {fontSize: 15, flex: 1, paddingVertical: 10};
  const Imagen = () => {
    return (
      <View
        style={{
          height: 200,
          width: '30%',
          backgroundColor: 'grey',
          marginVertical: 10,
          marginLeft: 5,
        }}
      />
    );
  };
  return (
    <View>
      <Text style={textStyle}>Fotografia</Text>
      <Divisor />
      <View style={{flexDirection: 'row'}}>
        <Imagen />
        <Imagen />
      </View>
    </View>
  );
};
