import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { windowHeight, windowWidth } from '~/dimensions';
import { Encabezado } from './Componentes/Encabezado';
import { BodyOT } from './Componentes/BodyOT';
import { Formulario, OrdenTrabajo } from './interfaces';
import { getFormularioAPI } from '~/api/api';
import { FormProvider } from '~/context/fomulario/FormularioContext';
import { Button } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

interface Props {
  OrdenTrabajo: OrdenTrabajo;
}

export const BasePage = ({ OrdenTrabajo }: Props) => {
  const [formulario, setFormulario] = useState<Formulario>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFormularioAPI(OrdenTrabajo.formulario.id).then(response => {
      setFormulario(response);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <View>
          <Spinner
            visible={loading}
            textContent={'Cargando formulario...'}
            textStyle={{ color: '#FFF' }}
          />
        </View>
      ) : (
        <View style={styles.page}>
          <Encabezado OrdenTrabajo={OrdenTrabajo} />
          <FormState>
            <View style={{ flex: 1 }}>
              {formulario ? <BodyOT Formulario={formulario} /> : null}
            </View>
            <View style={styles.footer}>
              <Button mode="text" onPress={() => {}}>
                Postergar
              </Button>
              <Button mode="text" onPress={() => {}}>
                Firmar
              </Button>
              <Button mode="text" onPress={() => {}}>
                Guardar
              </Button>
            </View>
          </FormState>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginVertical: 0.005 * windowHeight,
    marginHorizontal: 0.005 * windowWidth,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'red',
  },
});

const FormState = ({ children }: any) => {
  return <FormProvider>{children}</FormProvider>;
};
