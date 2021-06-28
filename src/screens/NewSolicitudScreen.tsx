import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {Header} from '../components/Header';

import ProgressCircle from 'react-native-progress-circle';
import {useNavigation} from '@react-navigation/native';
import {windowHeight} from '../../App';
import {TransitionView} from '../components/TransitionView';
import Wizard from '../components/Wizard';

export const NewSolicitudScreen = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [percent, setPercent] = useState(25);

  return (
    <View>
      <Wizard>
        <Wizard.Step>
          <Text>Seleccione Sucursal</Text>
        </Wizard.Step>
        <Wizard.Step>
          <Text>Seleccione Servicio</Text>
        </Wizard.Step>
        <Wizard.Step>
          <Text>Ingrese causa</Text>
        </Wizard.Step>
        <Wizard.Step>
          <Text>Ingrese descripcion</Text>
        </Wizard.Step>
      </Wizard>
    </View>
  );
};
