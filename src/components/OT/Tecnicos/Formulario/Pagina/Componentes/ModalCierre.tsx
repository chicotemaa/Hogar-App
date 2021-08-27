import React, { useState } from 'react';
import { Dialog, Button } from 'react-native-paper';
import { View, TextInput, StyleSheet } from 'react-native';
import { Sign } from '~/components/signPad';
import { Text } from 'react-native';
import { windowHeight } from '~/dimensions';

interface Props {
  visible: boolean;
  hideDialog: () => void;
  finalizadoHandler: (firma: string, aclaracion: string) => void;
}

export const ModalCierre = ({
  visible,
  hideDialog,
  finalizadoHandler,
}: Props) => {
  const [firma, setFirma] = useState<string | undefined>();
  const [aclaracion, setAclaracion] = useState<string | undefined>();

  const validate = (
    firmaValue: string | undefined,
    aclaracionValue: string | undefined,
  ) => {
    return firmaValue && aclaracionValue;
  };

  const pressFinalizar = () => {
    if (validate(firma, aclaracion)) {
      console.log('valid');      
      finalizadoHandler(firma, aclaracion);
    } else {
      console.log('is not valid');
    }
  };

  const aclaracionHandler = (aclaracionValue: string) => {
    setAclaracion(aclaracionValue);
  };

  return (
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Title style={{ color: '#FF3D2A' }}>Cierre de Orden</Dialog.Title>
      <Dialog.Content>
        <View style={{ height: 350 }}>
          <Text style={styles.title}>Firma:</Text>
          <Sign
            onOK={firmaValue => {
              setFirma(firmaValue);
            }}
            clearSignature={() => {
              setFirma(undefined);
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>Aclaración:</Text>
          <TextInput
            onChangeText={aclaracionHandler}
            placeholder={'Ingrese aclaración'}
            style={styles.aclaracionInput}
          />
        </View>
      </Dialog.Content>
      <Dialog.Actions
        style={{
          marginHorizontal: 13,
          marginBottom: 5,
          justifyContent: 'space-between',
        }}>
        <Button labelStyle={styles.buttonLabelAtras} onPress={hideDialog}>
          Volver atras
        </Button>
        <Button
          style={{ backgroundColor: '#2A911F' }}
          labelStyle={styles.buttonLabelFin}
          mode={'contained'}
          onPress={pressFinalizar}>
          Finalizar
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: windowHeight * 0.02,
    color: '#6E6E6E',
    marginVertical: 10,
  },
  aclaracionInput: {
    borderColor: '#C2C2C2',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  buttonLabelFin: {
    color: 'white',
  },
  buttonLabelAtras: {
    color: '#DBB21F',
  },
});
