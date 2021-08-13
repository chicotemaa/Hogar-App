export interface PropiedadItem {
  "@id"?: string;
  readonly orden?: number;
  readonly ancho?: string;
  readonly requerido?: boolean;
  readonly opcion?: any;
  readonly item?: any;
  readonly isCollection?: boolean;
  readonly propiedadItems?: any;
  readonly opcionDepende?: any;
  readonly cantidadMinima?: number;
}
