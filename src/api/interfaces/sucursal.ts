export interface Sucursal {
  "@id"?: string;
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
