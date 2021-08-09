import * as React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Formulario, Modulo } from '../../../../../../services/interfaces';
import { Pagina } from './Pagina';
import Swiper from 'react-native-swiper';
import { FormContext } from '../../../../../../context/fomulario/FormularioContext';
import { useContext } from 'react';

interface Props {
  Formulario: Formulario;
}

export const BodyOT = ({ Formulario }: Props) => {
  const [pagesCount, setPagesCount] = React.useState<number>(0)
  const [loading, setLoading] = React.useState(true)
  const [paginator, setPaginator] = React.useState(undefined)

  const { formState: { page }, changePage } = useContext(FormContext)

  React.useEffect(() => {
    const lastItemIndex = Formulario.propiedadModulos.length - 1
    const lastPage = Formulario.propiedadModulos[lastItemIndex]
    setPagesCount(lastPage.pagina)
    changePage(page)
    setPaginator(crearPaginador(Formulario.propiedadModulos))
    setLoading(false)
  }, [])

  const cambiarPagina = (page: number) => {
    if (page >= 0 && page < pagesCount) {
      changePage(page)
    }    
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginVertical: 5, marginHorizontal: 5, flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button mode="text" onPress={() => { cambiarPagina(page - 1) }}>
            Atras
          </Button>
          <Button mode="contained" color={'green'} onPress={() => { cambiarPagina(page + 1) }}>
            Siguiente
          </Button>
        </View>
      </View>
      <View style={{ flex: 9 }}>
        {
          !loading && showPages(paginator)
        }
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
  console.log('paginador', paginador)
  return paginador
}

const showPages = (Paginas: { pagina: number, modulos: Modulo[] }[]) => {

  const { changePage, formState: { page } } = useContext(FormContext)
  return (
    <View style={{ flex: 1 }}>
      <Swiper
        index={page}
        showsPagination={false}
        loop={false}
        onIndexChanged={(index) => {
          changePage(index)
        }}>
        {
          Paginas.map((modulosDePagina) => {
            return (
              <ScrollView key={page}>
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

