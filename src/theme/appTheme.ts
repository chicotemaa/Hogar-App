import { StyleSheet } from 'react-native';
import { windowWidth } from '~/dimensions';

export const theme = {
  transitionDuration: 1800,
  delayTransition: 500,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E1E1',
    paddingHorizontal: 15,
    width: '100%',
  },
  menuContainer: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  menuItem: {
    marginVertical: 9,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#253D5B26',
  },
  menuTexto: {
    textAlign: 'center',
    color: '#34303099',
    fontSize: 19,
    fontWeight: 'bold',
  },
  MenuBtnOpciones: {
    flexDirection: 'column',
  },
  MenuBtnLogOut: {
    flexDirection: 'column-reverse',
    marginTop: 10,
    flex: 1,
  },
  title: {
    fontSize: 0.1 * windowWidth,
    fontWeight: '600',
    alignSelf: 'center',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowRadius: 0,
  },
  subtitulo: {
    fontSize: 0.05 * windowWidth,
    width: '60%',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#534B4B',
  },
});

export const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#00BA0C',
  stepStrokeWidth: 2,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: '#00BA0C',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#00BA0C',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#00BA0C',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#00BA0C',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  currentStepLabelColor: '#00BA0C',
};
export const otStyle = {
  TextCargando: {
    marginTop: '20%',
    textAlign: 'center',
    color: 'orange',
    fontSize: 25,
    textAlignVertical: 'center',
    fontFamily: 'Sans',
    alignItems: 'center',
  },
  rightText: {
    marginVertical: 5,
    paddingLeft: 20,
    fontWeight: 'bold',
    fontSize: 15,
  },
  leftText: {
    marginVertical: 5,
    fontSize: 15,
    textAlign: 'center',
  },
} as const;

export const formulariosStyle = StyleSheet.create({
  Header: { flex: 10, backgroundColor: '#FFFFFF' },
  tituloText: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: '#DFDFDF',
  },
  subtitulo: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: '#DFDFDF',
  },
  contenido: {
    paddingHorizontal: 20,
    fontSize: 15,
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderColor: '#DFDFDF',
  },
  estado: {
    fontSize: 20,
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderColor: '#DFDFDF',
    flex: 1,
  },
  TituloFormulario: { paddingHorizontal: 20 },
  viewTitulo: { marginVertical: 25 },
  TextTitulo: { fontSize: 20, fontWeight: 'bold' },
});
