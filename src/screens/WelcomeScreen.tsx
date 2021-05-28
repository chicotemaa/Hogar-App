import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Title} from '../components/Title';
import {Button} from '../components/Button';

export const WelcomeScreen = ({navigation, route}) => {
  const {email} = route.params.state;
  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <View style={styles.menu} />
      </View>
      <View style={styles.header}>
        <Title color="#343030" text={`Bienvenido ${email}`} size={63} />
        <Title color="#ED2914" text={`Santander Rio`} size={23} />
        <Title color="#EA4D3B" text={`Sucursal Resistencia`} size={23} />
      </View>
      <View style={{marginTop: 5, marginBottom: 15, flex: 2}}>
        <Button
          title={'Solicitar'}
          color="#178C54"
          height={70}
          width={270}
          onPress={() => console.log('solicitar')}
        />
        <View style={styles.aclaraciónContainer}>
          <Title color="#343030" text={`Crear una nueva solicitud`} size={14} />
        </View>

        <Button
          title={'Ver mis solicitudes'}
          color="#253D5B"
          height={70}
          width={270}
          onPress={() => console.log('VerSolicitudes')}
        />
        <View style={styles.aclaraciónContainer}>
          <Title
            color="#343030"
            text={`Ver un historial de solicitudes previas`}
            size={14}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E1E1',
  },
  menuContainer: {
    margin: 5,
  },
  menu: {
    height: 30,
    backgroundColor: '#473E3E',
    alignSelf: 'flex-end',
    margin: 10,
    borderColor: 'blue',
    borderWidth: 2,
  },
  header: {
    flex: 2,
    margin: 10,
    padding: 3,
    alignItems: 'center',
  },
  aclaraciónContainer: {
    margin: 10,
  },
});
