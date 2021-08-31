import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { windowHeight, windowWidth } from '~/dimensions';
import { Encabezado } from './Componentes/Encabezado';
import { BodyOT } from './Componentes/BodyOT';
import { Formulario, OrdenTrabajo } from '~/api/types';
import { getFormularioAPI } from '~/api/api';
import { Button, Dialog, Portal } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { changeStateFinalizado } from '~/services/tecnicosServices';
import { Platform } from 'react-native';
import { ModalCierre } from './Componentes/ModalCierre';
import { useOrdenesTrabajoInfo } from '~/api/hooks';
import { FormProvider } from '~/context/formulario/FormularioContext';

interface Props {
  OrdenTrabajo: OrdenTrabajo;
  hasResultado: boolean;
}

export const BasePage = ({ OrdenTrabajo, hasResultado }: Props) => {
  const [formulario, setFormulario] = useState<Formulario>();
  const [loading, setLoading] = useState(true);
  //Para firma
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  //Para loading
  const [textLoading, setTextLoading] = useState('Cargando formulario...');
  const { refetch } = useOrdenesTrabajoInfo();

  const navigator = useNavigation();

  const finalizadoHandler = async (firma: string, aclaracion: string) => {
    hideDialog();
    setTextLoading('Enviando informacion...');
    setLoading(!loading);

    const resolved = await changeStateFinalizado(
      OrdenTrabajo,
      firma,
      aclaracion,
    );
    setLoading(!loading);
    refetch();
    navigator.navigate('SuccessScreen', { success: resolved, isOt: true });
  };

  const postergarHandler = () => {
    showDialog();
    console.log('postergar');
  };

  const guardarHandler = () => {
    console.log('guardando');
    navigator.goBack();
  };

  useEffect(() => {
    getFormularioAPI(OrdenTrabajo.formulario.id).then(response => {
      setFormulario(response);
      setLoading(false);
    });
  }, [OrdenTrabajo.formulario.id]);

  return (
    <>
      {loading ? (
        <View>
          <Spinner
            visible={loading}
            textContent={textLoading}
            textStyle={{ color: '#FFF' }}
          />
        </View>
      ) : (
        <View style={styles.page}>
          <Encabezado OrdenTrabajo={OrdenTrabajo} />
          <View style={{ flex: 1 }}>
            <Portal>
              <ModalCierre
                finalizadoHandler={finalizadoHandler}
                visible={visible}
                hideDialog={hideDialog}
              />
            </Portal>
            {formulario ? (
              <FormProvider otID={OrdenTrabajo.id} formulario={formulario}>
                <BodyOT formulario={formulario} otID={OrdenTrabajo.id} />
              </FormProvider>
            ) : null}
          </View>
          <View style={styles.footer}>
            <Button
              mode="text"
              icon="clock"
              labelStyle={{ color: 'red' }}
              onPress={postergarHandler}>
              Postergar
            </Button>
            <Button
              mode="text"
              icon="draw"
              labelStyle={{ color: 'blue' }}
              onPress={showDialog}>
              Firmar
            </Button>
            {/* <Button
              mode="text"
              labelStyle={{ color: 'green' }}
              onPress={guardarHandler}>
              Guardar
            </Button> */}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: 0.005 * windowHeight,
    marginBottom: Platform.OS === 'ios' ? windowHeight * 0.025 : 0,
    alignItems: 'stretch',
    marginHorizontal: 0.005 * windowWidth,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'red',
    marginTop: 5,
    marginBottom: Platform.OS === 'android' ? 20 : 0,
  },
});
