import AsyncStorage from '@react-native-async-storage/async-storage';
import { Resultado } from './api/types';

//const formularioResultadoKey = 'formularioResultado';

//TODO: agregar id formulario resultado para la creacion de un item en localstorage

export async function getStorageResultados(otID: number): Promise<Resultado[]> {
  const jsonValue = await AsyncStorage.getItem(`formularioResultado-${otID}`);
  return jsonValue && JSON.parse(jsonValue);
}

export async function setStorageResultados(
  value: Resultado[],
  otID: number,
): Promise<void> {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(`formularioResultado-${otID}`, jsonValue);
}
