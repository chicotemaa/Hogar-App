import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {Header} from '../components/Header';

import ProgressCircle from 'react-native-progress-circle';
import {useNavigation} from '@react-navigation/native';
import {windowHeight} from '../../App';
import {TransitionView} from '../components/TransitionView';

export const NewSolicitudScreen = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [percent, setPercent] = useState(25);

  return (
    <View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'orange',
            padding: 10,
          }}>
          <ProgressCircle
            percent={percent}
            radius={windowHeight * 0.08}
            borderWidth={8}
            color="#95E745"
            shadowColor="#999"
            bgColor="#fff">
            <Text style={{fontSize: windowHeight * 0.03, textAlign: 'center'}}>
              {currentPage} de 4
            </Text>
          </ProgressCircle>

          <Text
            style={{
              alignSelf: 'center',
              fontSize: windowHeight * 0.03,
              padding: 10,
            }}>
            Crear Solicitud
          </Text>
        </View>
        <Button
          onPress={() => {
            setPercent(percent + 25);
            setCurrentPage(currentPage + 1);
          }}>
          <Text>press</Text>
        </Button>
      </View>
    </View>
  );
};
