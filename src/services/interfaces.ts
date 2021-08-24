export interface OrdenTrabajo {
  SucursalDeCliente: string;
  direccionSucursalCliente: string;
  cliente: Cliente;
  comentario: string;
  estado: number;
  fecha: string;
  horaDesde: string;
  HoraInicio:string;
  HoraFin:string;
  horaHasta: string;
  id: number;
  latitud: string;
  latitudCierre: string;
  longitud: string;
  longitudCierre: string;
  formulario: Formulario;
  formularioResultado?: any;
}

export interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  razonSocial: string;
  street: string;
}

export interface Formulario {
  compraMateriales: boolean;
  titulo: string;
  descripcion: string;
  express: boolean;
  id: number;
  propiedadModulos: Modulo[];
}

export interface Modulo {
  equipo: IEquipo;
  id: number;
  isCollection: boolean;
  modulo: ModuloProps;
  orden: number;
  pagina: number;
  paginaNombre: string;
}

interface IEquipo {
  id: string;
  codigo: string;
  descripcion: string;
}

export interface ModuloProps {
  id: number;
  propiedadItems: Item[];
  titulo: string;
}

export interface Item {
  ancho: string;
  cantidadMinima: number;
  id: number;
  isCollection: boolean;
  item: PropiedadItem;
  opcion: any;
  opcionDepende: any;
  orden: number;
  propiedadItems: Item[];
  requerido: boolean;
}

interface PropiedadItem {
  id: number;
  descripcion: string;
  nombre: string;
  tipo:
    | 'foto'
    | 'seleccion_multiple'
    | 'desplegable'
    | 'texto'
    | 'casilla_de_verificacion'
    | 'titulo'
    | 'date_time'
    | 'time'
    | 'date'
    | 'numero';
  titulo: string;
  opciones: [] | OpcionesItem[];
}

interface OpcionesItem {
  id: number;
  imageSize: string | null;
  image: string | null;
  nombre: string;
}

export enum EstadosOT {
  Pendiente = 0,
  EstoyEnCamino = 1,
  MeRecibio = 2,
  NoMeAtendio = 3,
  Finalizado = 4,
  Postergado = 5,
}
