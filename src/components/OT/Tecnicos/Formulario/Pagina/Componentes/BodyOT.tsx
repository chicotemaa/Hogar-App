import * as React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Formulario, Modulo } from '../interfaces';
import { Pagina } from './Pagina';
import Swiper from 'react-native-swiper';

interface Props {
  Formulario: Formulario;
}

export const BodyOT = ({ Formulario }: Props) => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [pagesCount, setPagesCount] = React.useState<number>(0)
  const [loading, setLoading] = React.useState(true)
  const [paginator, setPaginator] = React.useState(null)

  React.useEffect(() => {
    const lastItemIndex = Formulario.propiedadModulos.length - 1
    const lastPage = Formulario.propiedadModulos[lastItemIndex]
    setPagesCount(lastPage.pagina)
    setCurrentPage(Formulario.propiedadModulos[0].pagina)
    setPaginator(crearPaginador(Formulario.propiedadModulos))
    setLoading(false)
  }, [])

  return (
    <View>
      <View style={{ height: '89%', borderWidth: 1 }}>
        {!loading ? (showPages(paginator)) : (<Text>'No hay formulario'</Text>)}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
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

    <View style={{ flex: 1, borderColor: 'orange', borderWidth: 2 }}>
      <Swiper loop={false}>
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

