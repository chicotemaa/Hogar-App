import * as React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Formulario } from '../interfaces';
import { Modulo } from './Modulo';

interface Props {
  Formulario: Formulario;
}

const PAGES = ['hola', 'hola', 'hola', 'holas']
export const BodyOT = ({ Formulario }: Props) => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [pagesCount, setPagesCount] = React.useState<number>(0)



  React.useEffect(() => {
    const lastItemIndex = Formulario.propiedadModulos.length - 1
    const lastPage = Formulario.propiedadModulos[lastItemIndex]
    setPagesCount(lastPage.pagina || 0)
    console.log('formulario', Formulario)
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        {Formulario.propiedadModulos.map(modulo => {
          console.log(modulo.id)
          return (<Modulo Modulo={modulo} />)
        })}
      </ScrollView>

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

