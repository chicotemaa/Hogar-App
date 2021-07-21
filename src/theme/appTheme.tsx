import { StyleSheet } from 'react-native';
import { windowWidth } from '../../App';

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
    fontWeight: '900',
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
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 2,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',  
  currentStepLabelColor: '#fe7013',
};