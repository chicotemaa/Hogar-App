export interface OrdenTrabajo {
    SucursalDeCliente: string;
    cliente: Cliente;
    comentario:string;
    estado:number;
    fecha:string;
    horaDesde:string;
    horaHasta:string;
    id:number;
    latitud:string;
    latitudCierre:string;
    longitud:string;
    longitudCierre:string;
    formulario: Formulario;
}

export interface Formulario{
    descripcion:string;
    id:number;
    titulo:string;
}

export interface Cliente {
    id:string;
    nombre:string;
    apellido:string;
    razonSocial:string;
    street:string
}

export interface Formulario {
    compraMateriales:boolean;
    descripcion:string;
    express:boolean;
    id:number;
    propiedadModulos: Modulo[];
}

interface Modulo {
    equipo: string;
    id:number;
    isCollection:boolean;
    propiedadItem: Item[]
    orden:number;
    pagina:number;
    paginaNombre:string;
}

interface Item {
    ancho:string;
    cantidadMinima:number;
    id:number;
    item: PropiedadItem
    opcion: any;
    opcionDepende:any;
    orden:number;
    propiedadItems: any;
}

interface PropiedadItem {
    id:number;
    descripcion:string;
    nombre:string;
    tipo: 'foto' | 'seleccion_multiple' | 'desplegable' | 'texto' | string;
    titulo:string;
    opcion: [] | OpcionesItem[]
}

interface OpcionesItem {
    id:number;
    imageSize:string | null ;
    image:string | null;
    nombre:string;
}