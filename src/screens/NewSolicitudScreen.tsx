import React from 'react';
import { View } from 'react-native';
import Wizard from '~/components/Wizard';
import { SucursalStep } from '~/components/Solicitud/Steps/SucursalStep';
import { ServicioStep } from '~/components/Solicitud/Steps/ServicioStep';
import { CausaSept } from '~/components/Solicitud/Steps/CausaStep';
import { DescripcionStep } from '~/components/Solicitud/Steps/DescripcionStep';

export const NewSolicitudScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Wizard>
        <Wizard.Step>
          <SucursalStep />
        </Wizard.Step>
        <Wizard.Step>
          <ServicioStep />
        </Wizard.Step>
        <Wizard.Step>
          <CausaSept />
        </Wizard.Step>
        <Wizard.Step>
          <DescripcionStep />
        </Wizard.Step>
      </Wizard>
    </View>
  );
};
