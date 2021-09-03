import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { DateInput } from '~/components/OT/Tecnicos/Formulario/Campos/Date';
import { Header } from '~/components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { windowWidth } from '~/dimensions';
import { useQuery } from 'react-query';
import {
  filtrarSucClienteBySector,
  getAllInfoOT,
} from '~/services/AdministradorServices';
import { Picker } from '~/components/Picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Sucursal } from '~/api/types';

export const FormNewOTScreen = () => {
  const { data, isFetching } = useQuery('infoOt', getAllInfoOT);
  const [sector, setSector] = useState<number>();
  const [sucursalCliente, setSucurscalCliente] = useState<string>();

  useEffect(() => {
    console.log('data del query', data);
  }, [data]);

  const handleValueSector = (sector: Sucursal) => {
    setSector(sector.id);
    filtrarSucClienteBySector(sector.sucursalDeClientes);
  };

  const handleValueSucursalCliente = (id: number) => {
    console.log(id);
  };

  if (isFetching) {
    return (
      <View>
        <Spinner
          visible={isFetching}
          textContent={'Cargando...'}
          textStyle={{ color: '#FFF' }}
        />
      </View>
    );
  }

  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  return (
    <>
      {data && (
        <>
          <Header pageName="Orden de Trabajo" />
          <View style={styles.container}>
            <Text style={styles.title}>Información</Text>
            <ScrollView contentContainerStyle={styles.containerItems}>
              <Title text={'Sector de Hogar'} />
              <Picker
                handleValue={handleValueSector}
                title={'Seleccione región'}
                items={data[1]}
              />
              <Title text={'Sucursal de cliente'} />
              <Picker
                handleValue={handleValueSector}
                title={'Seleccione una sucursal'}
                items={data[1]}
              />
              <Title text={'Técnico asignado'} />
              <Picker
                handleValue={handleValueSector}
                title={'Seleccione un técnico'}
                items={data[0]}
              />
              <Title text={'Formulario'} />
              <Picker
                handleValue={handleValueSector}
                title={'Seleccione formulario'}
                items={data[1]}
              />
              <Title text={'Comentario'} />
              <TextInput placeholder="Ingrese un comentario para el técnico" />
              <Title text={'Fecha'} />
              <DateInput modo={'date'} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <View>
                  <Title text={'Hora desde'} />
                  <DateInput modo={'time'} />
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Title text={'Hora hasta'} />
                  <DateInput modo={'time'} />
                </View>
              </View>
              <Button
                color={'#ee5020'}
                mode={'contained'}
                onPress={createTwoButtonAlert}>
                Crear Orden de Trabajo
              </Button>
            </ScrollView>
          </View>
        </>
      )}
    </>
  );
};

const Divisor = () => {
  return <View style={styles.divisor} />;
};

const Title = ({ text }: { text: string }) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={styles.titleComponent}>{text}</Text>
      <Divisor />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 8,
    backgroundColor: '#f5f7fa',
  },
  containerItems: {
    justifyContent: 'flex-start',
    padding: 3,
  },
  title: {
    fontSize: windowWidth * 0.06,
    marginHorizontal: 3,
    padding: 1,
    marginBottom: 10,
  },
  titleComponent: {
    color: '#CD340F',
    fontSize: windowWidth * 0.04,
  },
  divisor: {
    borderWidth: 1,
    marginBottom: 5,
    borderColor: '#A8AABA',
    opacity: 0.3,
  },
});
