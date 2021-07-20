import * as React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper';
import { secondIndicatorStyles } from '../../../../../theme/appTheme';
import { Seleccion } from '../../Campos/Seleccion';
import { Formulario } from '../interfaces';

interface Props {
  Formulario: Formulario;
}

const PAGES = ['hola', 'hola',]
export const BodyOT = ({ Formulario }: Props) => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [pagesCount, setPagesCount] = React.useState<number>(0)

  const onStepPress = (position: number) => {
    setCurrentPage(position);
  };

  const renderViewPagerPage = (key: number, data: any) => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Seleccion />
        </ScrollView>
      </View>
    );
  };

  React.useEffect(() => {
    const lastItem = Formulario.propiedadModulos.pop()
    setPagesCount(lastItem?.pagina || 0)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          stepCount={pagesCount + 1}
          customStyles={secondIndicatorStyles}
          currentPosition={currentPage}
          onPress={onStepPress}
        />
      </View>
      <Swiper
        showsPagination={false}
        style={{ flexGrow: 1 }}
        loop={false}
        index={currentPage}
        autoplay={false}
        onIndexChanged={(page) => {
          setCurrentPage(page);
        }}
      >
        {PAGES.map((page) => renderViewPagerPage(currentPage, page))}
      </Swiper>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
        <Button mode="text" onPress={() => currentPage > 0 ? setCurrentPage(currentPage - 1) : null}>
          Atras
        </Button>
        <Button mode="text" onPress={() => currentPage < PAGES.length ? setCurrentPage(currentPage + 1) : null}>
          Siguiente
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepIndicator: {
    marginVertical: 10,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

