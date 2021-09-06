import React from 'react';
import { View } from 'react-native';
import { Header } from '../../components/Header';
import { StackScreenProps } from '@react-navigation/stack';
import { BasePage } from '../../components/OT/Tecnicos/Formulario/Pagina/BasePage';
import { RootStackParams } from '~/navigator/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'OTScreen'> {}

export const OTScreen = ({ route }: Props) => {
  const OT = route.params?.OT;
  console.log(route.params);

  return (
    <>
      <Header pageName="Orden de Trabajo" roleUser={'tecnico'} />
      <View style={[{ flex: 1, paddingHorizontal: 0 }]}>
        {OT && <BasePage ordenTrabajo={OT} />}
      </View>
    </>
  );
};
