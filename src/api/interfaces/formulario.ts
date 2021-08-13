export interface Formulario {
  "@id"?: string;
  readonly titulo?: string;
  readonly descripcion?: string;
  readonly propiedadModulos?: any;
  readonly updatedAt?: Date;
  readonly version?: string;
  readonly express?: boolean;
  readonly compraMateriales?: boolean;
}
