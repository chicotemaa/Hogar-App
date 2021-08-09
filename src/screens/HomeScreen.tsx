import React, { useEffect } from 'react';

import { DrawerScreenProps } from '@react-navigation/drawer';
import { Text, View, Image, ScrollView, ImageBackground } from 'react-native';
import { windowHeight, windowWidth } from '~/dimensions';

import santander from '~/assets/images/clientes/santander.png';
import apex from '~/assets/images/clientes/apex.png';
import easy from '~/assets/images/clientes/easy.png';
import atento from '~/assets/images/clientes/atento.png';
import naranja from '~/assets/images/clientes/naranja.jpg';
import libertad from '~/assets/images/clientes/libertad.png';

import fondo from '~/assets/images/util/fondo.jpeg';
import logo from '~/assets/images/util/logo.png';

import { StyleSheet } from 'react-native';
import { Button } from '~/components/Button';

interface Props extends DrawerScreenProps<any, any> {}

export const HomeScreen = ({ navigation }: Props) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Header navigation={navigation} />
        <View
          style={{
            backgroundColor: '#E7E1E1',
            paddingHorizontal: 0.05 * windowWidth,
          }}>
          <Info />
          <Clientes />
          <ContactoSection />
        </View>
      </ScrollView>
    </View>
  );
};

const Header = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{
          flex: 1,
          height: 0.3 * windowHeight,
          padding: 5,
          paddingBottom: 20,
        }}
        imageStyle={{ opacity: 0.3 }}
        resizeMode="repeat"
        source={fondo}>
        <View
          style={{
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            marginBottom: 30,
          }}>
          <Button
            onPress={() => {
              navigation.navigate('Stack');
            }}
            title="Iniciar Sesion"
            width={windowWidth * 0.3}
            color="#ef4920"
          />
        </View>
        <Image
          resizeMode="contain"
          style={{
            borderRadius: windowWidth * 0.2,
            alignSelf: 'center',
            width: '65%',
            height: '60%',
          }}
          source={logo}
        />
      </ImageBackground>
    </View>
  );
};

const Info = () => {
  return (
    <View style={{ flex: 1 }}>
      <Title text="Nosotros" />
      <Text style={{ fontSize: 20, color: '#171616' }}>
        Hogar Servicios de Mantenimiento, es una empresa dedicada a la solución
        de las necesidades de mantenimiento y remodelación de industrias,
        comercios y hogares.
      </Text>
    </View>
  );
};

const Title = ({ text }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        marginTop: 30,
        marginBottom: 20,
      }}>
      <Text style={styles.title}>{text}</Text>
      <View style={styles.divisor} />
    </View>
  );
};

const Clientes = () => {
  return (
    <View style={{ flex: 1 }}>
      <Title text="Clientes" />
      <View style={{ padding: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Image style={styles.logoCliente} source={santander} />
          <Image style={styles.logoCliente} source={apex} />
          <Image style={styles.logoCliente} source={easy} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10 }}>
          <Image style={styles.logoCliente} source={atento} />
          <Image style={styles.logoCliente} source={naranja} />
          <Image style={styles.logoCliente} source={libertad} />
        </View>
      </View>
    </View>
  );
};

const ContactoSection = () => {
  return (
    <View style={{ flex: 1 }}>
      <Title text="Contacto" />
      <View
        style={{
          backgroundColor: 'rgba(245, 142, 131, 0.53)',
          marginVertical: 10,
          borderRadius: 10,
          padding: 20,
        }}>
        <Text
          style={[
            styles.contactoText,
            { fontWeight: 'bold', textAlign: 'center' },
          ]}>
          Oficina Principal
        </Text>
        <Text style={styles.contactoText}>RN 16, Km 17.5 3500</Text>
        <Text style={styles.contactoText}>Resistencia Chaco Argentina.</Text>
        <Text style={styles.contactoText}>info@hogarmantenimiento.com</Text>
        <Text style={styles.contactoText}>Teléfono: +54 9 362 519 5548</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoCliente: {
    resizeMode: 'center',
    marginHorizontal: 10,
    width: 0.25 * windowWidth,
    height: 0.25 * windowWidth,
    borderRadius: windowWidth / 2,
    padding: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 0.08 * windowWidth,
    fontWeight: 'bold',
  },
  divisor: {
    borderWidth: 3,
    borderRadius: 10,
    width: '50%',
    alignSelf: 'center',
    borderColor: '#ef4920',
  },
  contactoText: {
    fontSize: 0.025 * windowHeight,
    paddingVertical: 10,
    fontWeight: '200',
  },
});
