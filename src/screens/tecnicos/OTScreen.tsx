import React from 'react';
import { View } from 'react-native';
import { Header } from '../../components/Header';
import { StackScreenProps } from '@react-navigation/stack';
import { BasePage } from '../../components/OT/Tecnicos/Formulario/Pagina/BasePage';

import { OrdenTrabajo } from '~/api/types';

interface Props extends StackScreenProps<any, any> {}

export const OTScreen = ({ route }: Props) => {
  const OT: OrdenTrabajo | undefined = route.params?.OT;
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
