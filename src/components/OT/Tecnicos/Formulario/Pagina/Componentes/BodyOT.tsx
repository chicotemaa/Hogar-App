import * as React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Formulario, Modulo } from '../interfaces';
import { Pagina } from './Pagina';

interface Props {
  Formulario: Formulario;
}

const PAGES = ['hola', 'hola', 'hola', 'holas']
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
    setTimeout(() => {
      setLoading(false)
    }, 3000)
    console.log('formulario', Formulario)
    console.log('paginador', paginator)
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        {!loading ? (showPages(paginator)) : (<Text>'No hay formulario'</Text>)}
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
    <View>
      {
        Paginas.map((modulosDePagina) => {
          return (<Pagina Modulos={modulosDePagina.modulos} />)
        })
      }
    </View>
  )
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

