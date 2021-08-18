import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormularioResultado } from './api/types';

const formularioResultadoKey = 'formularioResultado';

export async function getStorageFormularioResultado(): Promise<FormularioResultado | null> {
  const jsonValue = await AsyncStorage.getItem(formularioResultadoKey);
  return jsonValue && JSON.parse(jsonValue);
}

export async function setStorageFormularioResultado(
  value: FormularioResultado,
): Promise<void> {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(formularioResultadoKey, jsonValue);
}
