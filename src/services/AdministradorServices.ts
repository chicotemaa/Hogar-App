import { getSectoresHogar, getSucursalesDeClienteAPI } from '~/api/api';
import { Sucursal } from '~/api/types';

export const getAllInfoOT = async () => {
  let info = await Promise.all([
    getTecnicos(),
    getSectores(),
    getSucursalesCliente(),
  ]);
  info[1] = filtrarSectores(info[1]);
  return info;
};

const getTecnicos = async () => {
  return 'Tecnico';
};

const getSectores = async () => {
  const sectores = await getSectoresHogar();
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
  const sucursales = getSucursalesDeClienteAPI();
  return sucursales;
};

const getFormularios = async => {};
