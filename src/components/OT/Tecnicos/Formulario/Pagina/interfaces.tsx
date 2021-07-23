export interface OrdenTrabajo {
    SucursalDeCliente: string;
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
}

export interface Formulario {
    descripcion: string;
    id: number;
    titulo: string;
}

export interface Cliente {
    id: string;
    nombre: string;
    apellido: string;
    razonSocial: string;
    street: string
}

export interface Formulario {
    compraMateriales: boolean;
    descripcion: string;
    express: boolean;
    id: number;
    propiedadModulos: Modulo[];
}

export interface Modulo {
    equipo: string;
    id: number;
    isCollection: boolean;
    modulo: ModuloProps;
    orden: number;
    pagina: number;
    paginaNombre: string;
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
    isCollection:boolean;
    item: PropiedadItem
    opcion: any;
    opcionDepende: any;
    orden: number;
    propiedadItems: any;
    requerido: boolean;
}

interface PropiedadItem {
    id: number;
    descripcion: string;
    nombre: string;
    tipo: 'foto' | 'seleccion_multiple' | 'desplegable' | 'texto' | 'casilla_de_verificacion' | 'titulo' | 'date_time' | 'time' ;
    titulo: string;
    opciones: [] | OpcionesItem[]
}

interface OpcionesItem {
    id: number;
    imageSize: string | null;
    image: string | null;
    nombre: string;
}