import * as React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Formulario, Modulo } from '../interfaces';
import { Pagina } from './Pagina';
import Swiper from 'react-native-swiper';
import StepIndicator from 'react-native-step-indicator';

interface Props {
  Formulario: Formulario;
}

export const BodyOT = ({ Formulario }: Props) => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [pagesCount, setPagesCount] = React.useState<number>(0)
  const [loading, setLoading] = React.useState(true)
  const [paginator, setPaginator] = React.useState({ pagina: 0, modulos: [] })

  console.log('formulario:',Formulario)

  React.useEffect(() => {
    const lastItemIndex = Formulario.propiedadModulos.length - 1
    const lastPage = Formulario.propiedadModulos[lastItemIndex]
    setPagesCount(lastPage.pagina)
    setCurrentPage(Formulario.propiedadModulos[0].pagina)
    setPaginator(crearPaginador(Formulario.propiedadModulos))
    setLoading(false)
  }, [])

  return (
    <View style={{flex:1}}>      
      <View style={{ marginVertical: 10,}}>
        <StepIndicator
          stepCount={!loading ? pagesCount : 0}
          currentPosition={currentPage}
        />
      </View>      
      <View style={{flex:9}}>
        {!loading ? (showPages(paginator)) : (<Text>No hay formulario</Text>)}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10,flex:1 }}>
        <Button mode="text" onPress={() => { }}>
          Atras
        </Button>
        <Button mode="text" onPress={() => { }}>
          Siguiente
        </Button>
      </View>
    </View>
  );
}


const crearPaginador = (Modulos: Modulo[]) => {
  let paginaActual: number = Modulos[0].pagina
  let arrayModulos: Modulo[] = []
  let paginador: {
    pagina: number,
    modulos: Modulo[]
  }[] = []

  Modulos.forEach((modulo: Modulo) => {
    if (modulo.pagina == paginaActual) {
      arrayModulos.push(modulo)
    } else {
      paginador.push({
        pagina: paginaActual,
        modulos: arrayModulos
      })
      arrayModulos = []
      arrayModulos.push(modulo)
      paginaActual = modulo.pagina
    }
  })
  //ultima pagina
  paginador.push({
    pagina: paginaActual,
    modulos: arrayModulos
  })
  return paginador
}

const showPages = (Paginas: { pagina: number, modulos: Modulo[] }[]) => {
  return (
    <View style={{ flex: 1 }}>
      <Swiper showsPagination={false} loop={false}>
        {
          Paginas.map((modulosDePagina) => {
            return (
              <ScrollView>
                <Pagina Modulos={modulosDePagina.modulos} />
              </ScrollView>
            )
          })
        }
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  stepIndicator: {
    marginVertical: 10,
  },
});

