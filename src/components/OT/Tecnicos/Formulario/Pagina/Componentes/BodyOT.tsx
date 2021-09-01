import * as React from 'react';
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Pagina } from './Pagina';
import Swiper from 'react-native-swiper';
import { FormContext } from '~/context/formulario/FormularioContext';
import { useContext } from 'react';

export const BodyOT = () => {
  const {
    currentPage,
    moduloPages,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
  } = useContext(FormContext);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
          flex: 1,
        }}>
        <Button mode="text" onPress={goToPreviousPage}>
          Atras
        </Button>
        <Button mode="text" onPress={goToNextPage}>
          Siguiente
        </Button>
      </View>
      <View style={{ flex: 9 }}>
        <View style={{ flex: 1 }}>
          <Swiper
            index={currentPage}
            showsPagination={false}
            loop={false}
            onIndexChanged={setCurrentPage}>
            {moduloPages.map((modulosDePagina, index) => {
              return (
                <ScrollView key={index}>
                  <Pagina modulos={modulosDePagina} />
                </ScrollView>
              );
            })}
          </Swiper>
        </View>
      </View>
    </View>
  );
};
