import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E1E1',
    paddingHorizontal: 15,
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
});
