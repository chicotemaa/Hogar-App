export interface FormularioResultado {
  "@id"?: string;
  resultados?: any;
  latitud?: string;
  longitud?: string;
  ordenTrabajo?: string;
  minutosTrabajado?: number;
  minutosReales?: number;
  readonly numero?: number;
  readonly updatedAt?: Date;
  readonly indetificacion?: string;
}
