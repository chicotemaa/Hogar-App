import { ScrollView, Text, View } from 'react-native';
import { OrdenTrabajo } from '~/api/types';
import { Header } from '~/components/Header';
import { Estado } from '~/components/OT/Detalle/Estado';
import { Formulario } from '~/components/OT/Detalle/Formulario';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { formulariosStyle } from '~/theme/appTheme';

interface Props extends StackScreenProps<RootStackParams, 'DetalleOTScreen'> { }

export const DetalleOTScreen = ({ route }: Props) => {
  const OT: OrdenTrabajo = route.params.OT;

  return (
    <>
      <Header pageName="Informe de Trabajo" />
      <View style={formulariosStyle.Header}>
        <ScrollView>
          <Text style={formulariosStyle.tituloText}>
            Información General #{OT.id}
          </Text>

          <Text style={formulariosStyle.subtitulo}>Cliente</Text>
          <Text style={formulariosStyle.contenido}>
            {OT.cliente.razonSocial}
          </Text>
          <Text style={{ ...formulariosStyle.contenido, fontWeight: 'bold' }}>
            Direccion
          </Text>
          <Text style={formulariosStyle.contenido}>
            {OT.direccionSucursalCliente}
          </Text>

          <View>
            <Estado horaInicio={OT.horaInicio} horaFin={OT.horaFin} />
          </View>

          <Text style={formulariosStyle.tituloText}>
            Descripción de trabajo
          </Text>
          <Formulario
            firma={OT.imageName}
            aclaracion={OT.responsableFirma}
            idFormulario={OT.formulario.id}
            idResultado={OT.formularioResultado}
          />
        </ScrollView>
      </View>
    </>
  );
};
