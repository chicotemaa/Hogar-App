export type SucursalDeClienteApiPath = `/api/sucursal_de_clientes/${number}`;

// eslint-disable-next-line no-shadow
export enum SolicitudEstado {
  PENDIENTE = 0,
  GENERADA_OT = 1,
  DERIVADA = 2,
}

export type userRol = 'administrador' | 'tecnico' | 'cliente' | 'hogar';

export const adminROLES = [
  'ROLE_ENCARGADO',
  'ROLE_SUCURSAL',
  'ROLE_ADMIN',
  'ROLE_LIDER',
  ,
];

export const solicitudEstadoLabel = {
  [SolicitudEstado.PENDIENTE]: 'Pendiente',
  [SolicitudEstado.GENERADA_OT]: 'Generada OT',
  [SolicitudEstado.DERIVADA]: 'Derivada',
} as const;

export interface Hydra<T> {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': T[];
  'hydra:totalItems': string;
}

export interface HydraWithSearch<T> extends Hydra<T> {
  'hydra:search': HydraSearch;
}

export interface HydraWithView<T> extends Hydra<T> {
  'hydra:view': HydraView;
}

export interface HydraSearch {
  '@type': string;
  'hydra:template': string;
  'hydra:variableRepresentation': string;
  'hydra:mapping': HydraMapping[];
}

export interface HydraMapping {
  '@type': string;
  variable: string;
  property: string;
  required: boolean;
}

export interface HydraView {
  '@id': string;
  '@type': string;
  'hydra:first': string;
  'hydra:last': string;
  'hydra:next': string;
}

export interface Cliente {
  '@id'?: string;
  id: number;
  condicionIVA?: string;
  readonly apellido?: string;
  readonly nombre?: string;
  readonly razonSocial?: string;
  readonly street?: string;
  readonly city?: string;
  readonly province?: string;
  readonly country?: string;
}

export interface Equipo {
  codigo: string;
  descripcion: string;
  propiedadModulos: PropiedadModulo[];
  cliente: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Facility {
  '@id'?: string;
  readonly apellido?: string;
  readonly nombre?: string;
  readonly correo?: string;
  readonly telefono?: string;
  readonly codigo?: number;
  readonly Cliente?: any;
  readonly sucursalDeClientes?: any;
}

export interface Formulario {
  id: number;
  '@id': string;
  '@type': string;
  titulo: string;
  descripcion: string;
  propiedadModulos: PropiedadModulo[];
  updatedAt: Date;
  version: string;
  express: boolean;
  compraMateriales: boolean;
}

export interface PropiedadModulo {
  id: number;
  orden: number;
  modulo: Modulo;
  pagina: number;
  isCollection: boolean;
  paginaNombre: string;
  equipo: Equipo | null;
}

export interface FormularioResultado {
  id?: number;
  resultados: Resultado[];
  latitud: string;
  longitud: string;
  ordenTrabajo?: string;
  minutosTrabajado: number;
  minutosReales: number;
  numero?: number;
  updatedAt?: Date;
  indetificacion?: string;
}

export interface FormularioResultadoExpress {
  '@id'?: string;
  id: number;
  resultados?: any;
  latitud?: string;
  longitud?: string;
  minutosTrabajado?: number;
  estado?: number;
  horaInicio: string;
  cliente?: string;
  fecha: string;
  motivo?: string;
  formulario?: any;
  imageName?: string;
  imageSize?: number;
  responsableFirma?: string;
  compraMateriales?: boolean;
  readonly numero?: number;
  readonly updatedAt?: Date;
  readonly indetificacion?: string;
}

export type FormularioResultadoExpressPostBody = Omit<
  FormularioResultadoExpress,
  'id'
>;

export interface Modulo {
  id: number;
  propiedadItems: PropiedadItem[];
  titulo: string;
}

export interface Item {
  '@id': string;
  id: number;
  nombre: string;
  titulo: string;
  descripcion: string;
  tipo: string;
  opciones: ItemOpcion[];
}

export interface ItemOpcion {
  id: number;
  nombre: string;
  imagen: string | null;
  imageSize: string | null;
}

export interface MediaObject {
  '@id': string;
  contentUrl: string;
  filePath: string;
}

export interface OrdenTrabajo {
  SucursalDeCliente: SucursalDeClienteApiPath;
  direccionSucursalCliente: string;
  cliente: Cliente;
  comentario: string;
  estado: number;
  fecha: string;
  horaDesde: string;
  horaHasta: string;
  id: number;
  latitud: string;
  latitudCierre: string;
  longitud: string;
  longitudCierre: string;
  formulario: Formulario;
  formularioResultado?: FormularioResultado;
  estados?: any;
  estadosGestion?: any;
  servicio?: string;
  horaInicio: string;
  orden?: number;
  horaFin: string;
  user?: string;
  motivo?: string;
  sucursal?: string;
  imageName?: string;
  imageSize?: number;
  solicitud?: string;
  responsableFirma?: string;
  estadoGestion?: number;
  Facility?: string;
  firma?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  readonly imageFile?: any;
  readonly deleted?: boolean;
}

export interface PropiedadItem {
  '@id': string;
  id: number;
  orden: number;
  ancho: string;
  requerido: boolean;
  opcion: any;
  item: Item;
  isCollection: boolean;
  propiedadItems: PropiedadItem[];
  opcionDepende?: any;
  cantidadMinima?: number;
}

export interface Resultado {
  valor: string[];
  imageName?: string;
  imageSize?: number;
  latitud: string;
  longitud: string;
  indiceItem: number;
  indiceModulo: number;
  idModulo: number;
  isColeccionable: boolean;
  idPropiedadItem: number;
  propiedadItem: string;
}

export interface Servicio {
  '@id': string;
  id: number;
  titulo: string;
  descripcion: string;
  image: string;
}

export interface SolicitudesPostBody {
  cliente?: string;
  servicio: string;
  estado: SolicitudEstado;
  necesitasAyuda: string;
  imageSize: number;
  updatedImageAt: string;
  imagen: string;
  createdAt: string;
  numeroSucursal: null;
  pisoSector: string;
  consulta: string;
  sucursal: string;
  Facility?: string;
  SucursalDeCliente?: SucursalDeClienteApiPath;
}

export interface Solicitudes {
  '@id'?: string;
  id: number;
  estados?: any;
  imageFile?: any;
  cliente?: Cliente;
  servicio?: Servicio;
  estado: SolicitudEstado;
  imageSize?: number;
  updatedImageAt?: string;
  imagen?: string | null;
  ordenTrabajo?: string;
  numeroSucursal?: string;
  direccionSucursal?: string;
  pisoSector: string;
  fechaCompromiso?: string;
  nroIncidencia?: string;
  consulta?: string | undefined;
  sucursal?: string;
  necesitasAyuda: string;
  leido?: boolean;
  Facility?: string;
  SucursalDeCliente: SucursalDeClienteApiPath;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  readonly deleted?: boolean;
}
export interface Sucursal {
  '@id'?: string;
  id: number;
  imageCabeceraFile?: any;
  imageCabecera?: string;
  imagePieFile?: any;
  imagePie?: string;
  nombre?: string;
  name?: string;
  pais?: any;
  textoCabecera?: string;
  textoPie?: string;
  updatedAt?: Date;
  sucursalDeClientes?: SucursalDeClienteApiPath[];
  deletedAt?: Date;
  readonly deleted?: boolean;
}

export interface SucursalDeCliente {
  '@id': string;
  id: number;
  readonly codigo: string;
  readonly Cliente: any;
  readonly direccion: string;
}

//TODO: `/api/sucursals/${number}` fixear number toma como valor

export interface User {
  '@id': string;
  sucursal: string;
  cliente?: Cliente;
  email: string;
  username: string;
  SucursalDeCliente?: SucursalDeClienteApiPath;
  Facility?: string;
  roles: string[];
}
