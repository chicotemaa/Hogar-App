import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { windowHeight, windowWidth } from '~/dimensions';

interface Props {
  page: string;
}

export const HeaderWithSteps = ({ page }: Props) => {
  return (
    <View style={styles.headerContainer}>
      <ProgressCircle
        percent={25}
        radius={windowHeight * 0.05}
        borderWidth={6}
        color="#95E745"
        shadowColor="#999"
        bgColor="#fff">
        <Text style={{ fontSize: windowHeight * 0.02, textAlign: 'center' }}>
          {page + 1} de 4
        </Text>
      </ProgressCircle>
      <View style={styles.textHeaderContainer}>
        <Text style={styles.titleHeader}>Elija Sucursal</Text>
        <Text style={styles.subtitleHeader} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 10,
    flexDirection: 'row',
    padding: windowHeight * 0.03,
    elevation: 10,
  },
  textHeaderContainer: { marginHorizontal: 20, marginVertical: 10 },
  titleHeader: { fontSize: windowWidth * 0.06, fontWeight: '700' },
  subtitleHeader: {
    fontSize: windowWidth * 0.04,
    fontWeight: '200',
    color: '#2D2D2D',
  },
});
