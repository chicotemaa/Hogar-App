import {
  getFormulariosListadoAPI,
  getSectoresHogarAPI,
  getSucursalesDeClienteAPI,
  getTecnicosAPI,
} from '~/api/api';
import { Sucursal } from '~/api/types';

export const getAllInfoOT = async () => {
  let info = await Promise.all([
    getSectores(),
    getSucursalesCliente(),
    getTecnicos(),
    getFormularios(),
  ]);
  info[0] = filtrarSectores(info[0]);
  return info;
};

const getTecnicos = async () => {
  return await getTecnicosAPI();
};

const getSectores = async () => {
  const sectores = await getSectoresHogarAPI();
  return sectores;
};

const filtrarSectores = (sectores: Sucursal[]) => {
  let sectoresBuscados: Sucursal[] = [];
  //Comprobar en caso de que no encuente los sectores
  sectoresBuscados.push(findSector(sectores, 'SECTOR NEA')!);
  sectoresBuscados.push(findSector(sectores, 'SECTOR NOA')!);
  return sectoresBuscados;
};

const findSector = (sectores: Sucursal[], nombreBuscado: string) => {
  const found = sectores.find(sector => sector.nombre === nombreBuscado);
  return found;
};

const getSucursalesCliente = async () => {
  const sucursales = await getSucursalesDeClienteAPI();
  console.log(sucursales);
  return sucursales;
};

export const filtrarSucClienteBySector = async (sectores: string[]) => {
  const sucursalesCliente = await getSucursalesCliente();
  let sucursalesFiltradas = [];

  sucursalesCliente.forEach(sucursalAPI => {
    console.log(sucursalAPI.direccion);
  });

  console.log(sucursalesCliente);
  console.log(sectores);
};

const getFormularios = async () => {
  const formulariosListado = await getFormulariosListadoAPI();
  return formulariosListado;
};

const createNewOrdenTrabajo = async (data): Promise<boolean> => {
  console.log(data);
  return true;
};
