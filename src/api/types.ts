export interface Cliente {
  '@id'?: string;
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
  propiedadModulos: any;
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
  '@id'?: string;
  readonly titulo?: string;
  readonly descripcion?: string;
  readonly propiedadModulos?: any;
  readonly updatedAt?: Date;
  readonly version?: string;
  readonly express?: boolean;
  readonly compraMateriales?: boolean;
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
  resultados?: any;
  latitud?: string;
  longitud?: string;
  minutosTrabajado?: number;
  estado?: number;
  horaInicio?: Date;
  cliente?: string;
  fecha?: Date;
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

export interface PaginaModulo {
  equipo: Equipo;
  id: number;
  isCollection: boolean;
  modulo: Modulo;
  orden: number;
  pagina: number;
  paginaNombre: string;
}

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
  '@id'?: string;
  contentUrl?: string;
  filePath?: string;
}

export interface OrdenTrabajo {
  '@id'?: string;
  estados?: any;
  estadosGestion?: any;
  estado?: number;
  servicio?: string;
  horaInicio?: Date;
  orden?: number;
  horaFin?: Date;
  formulario?: string;
  user?: string;
  formularioResultado?: string;
  latitud?: string;
  longitud?: string;
  cliente?: string;
  horaDesde?: Date;
  horaHasta?: Date;
  fecha?: Date;
  motivo?: string;
  sucursal?: string;
  imageName?: string;
  imageSize?: number;
  solicitud?: string;
  responsableFirma?: string;
  estadoGestion?: number;
  comentario?: string;
  latitudCierre?: string;
  longitudCierre?: string;
  Facility?: string;
  SucursalDeCliente?: string;
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
  valor: string;
  imageName?: string;
  imageSize?: number;
  latitud: string;
  longitud: string;
  indiceItem: number;
  indiceModulo: number;
  idModulo: number;
  isColeccionable: boolean;
  idPropiedadItem: number;
}

export interface Servicio {
  '@id'?: string;
  titulo?: string;
  descripcion?: string;
  image?: string;
}

export interface Solicitud {
  '@id'?: string;
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
export interface Sucursal {
  '@id'?: string;
  imageCabeceraFile?: any;
  imageCabecera?: string;
  imagePieFile?: any;
  imagePie?: string;
  nombre?: string;
  pais?: any;
  textoCabecera?: string;
  textoPie?: string;
  updatedAt?: Date;
  sucursalDeClientes?: string[];
  deletedAt?: Date;
  readonly deleted?: boolean;
}

export interface SucursalDeCliente {
  '@id'?: string;
  readonly codigo?: string;
  readonly Cliente?: any;
  readonly direccion?: string;
}

export interface User {
  '@id'?: string;
  sucursal?: string;
  cliente?: any;
  email?: string;
  username?: string;
  plainPassword?: any;
  SucursalDeCliente?: any;
  Facility?: string;
  readonly roles?: any;
}