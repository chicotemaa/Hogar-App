import * as React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Formulario, Modulo } from '~/api/types';
import { Pagina } from './Pagina';
import Swiper from 'react-native-swiper';
import { FormContext } from '~/context/fomulario/FormularioContext';
import { useContext } from 'react';
import { FormProvider } from '~/context/formulario/FormularioContext';

interface Props {
  formulario: Formulario;
  otID: number;
}

export const BodyOT = ({ formulario, otID }: Props) => {
  const [pagesCount, setPagesCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [paginator, setPaginator] = React.useState(undefined);

  const {
    formState: { page },
    changePage,
  } = useContext(FormContext);

  React.useEffect(() => {
    const lastItemIndex = formulario.propiedadModulos.length - 1;
    const lastPage = formulario.propiedadModulos[lastItemIndex];
    setPagesCount(lastPage.pagina);
    changePage(page);
    setPaginator(crearPaginador(formulario.propiedadModulos));
    setLoading(false);
  }, []);

  const cambiarPagina = (page: number) => {
    console.log(pagesCount);
    if (page >= 0 && page <= pagesCount) {
      changePage(page);
    }
  };

  return (
    <FormProvider otID={otID} formulario={formulario}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
            flex: 1,
          }}>
          <Button
            mode="text"
            onPress={() => {
              cambiarPagina(page - 1);
            }}>
            Atras
          </Button>
          <Button
            mode="text"
            onPress={() => {
              cambiarPagina(page + 1);
            }}>
            Siguiente
          </Button>
        </View>
        <View style={{ flex: 9 }}>{!loading && ShowPages(paginator)}</View>
      </View>
    </FormProvider>
  );
};

const crearPaginador = (Modulos: Modulo[]) => {
  let paginaActual: number = Modulos[0].pagina;
  let arrayModulos: Modulo[] = [];
  let paginador: {
    pagina: number;
    modulos: Modulo[];
  }[] = [];

  Modulos.forEach((modulo: Modulo) => {
    if (modulo.pagina == paginaActual) {
      arrayModulos.push(modulo);
    } else {
      paginador.push({
        pagina: paginaActual,
        modulos: arrayModulos,
      });
      arrayModulos = [];
      arrayModulos.push(modulo);
      paginaActual = modulo.pagina;
    }
  });
  //ultima pagina
  paginador.push({
    pagina: paginaActual,
    modulos: arrayModulos,
  });
  console.log('paginador', paginador);
  return paginador;
};

const ShowPages = (Paginas: { pagina: number; modulos: Modulo[] }[]) => {
  const {
    changePage,
    formState: { page },
  } = useContext(FormContext);
  return (
    <View style={{ flex: 1 }}>
      <Swiper
        index={page}
        showsPagination={false}
        loop={false}
        onIndexChanged={index => {
          changePage(index);
        }}>
        {Paginas.map(modulosDePagina => {
          return (
            <ScrollView key={page}>
              <Pagina modulos={modulosDePagina.modulos} />
            </ScrollView>
          );
        })}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  stepIndicator: {
    marginVertical: 10,
  },
});
