export interface FormularioResultadoExpress {
  "@id"?: string;
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
