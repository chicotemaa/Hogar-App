export interface Solicitud {
  "@id"?: string;
  estados?: any;
  imageFile?: any;
  cliente?: string;
  servicio?: string;
  estado?: number;
  imageSize?: number;
  updatedImageAt?: Date;
  imagen?: string;
  ordenTrabajo?: string;
  numeroSucursal?: string;
  direccionSucursal?: string;
  pisoSector?: string;
  fechaCompromiso?: Date;
  nroIncidencia?: string;
  consulta?: string;
  sucursal?: string;
  necesitasAyuda?: string;
  leido?: boolean;
  Facility?: string;
  SucursalDeCliente?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  readonly deleted?: boolean;
}
