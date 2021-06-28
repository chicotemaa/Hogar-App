import React from 'react';
import {Text, View} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {windowHeight} from '../../../App';

interface Props {
  page: string;
  subtitle: string;
}

export const HeaderWithSteps = ({page, subtitle}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'orange',
        padding: 10,
      }}>
      <View style={{borderWidth: 1}}>
        <ProgressCircle
          percent={25}
          radius={windowHeight * 0.05}
          borderWidth={8}
          color="#95E745"
          shadowColor="#999"
          bgColor="#fff">
          <Text style={{fontSize: windowHeight * 0.02, textAlign: 'center'}}>
            {page + 1} de 4
          </Text>
        </ProgressCircle>
      </View>
      <View style={{paddingLeft: 10, justifyContent: 'center'}}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: windowHeight * 0.035,
          }}>
          Nueva Solicitud
        </Text>
        <Text>{subtitle}</Text>
      </View>
    </View>
  );
};
