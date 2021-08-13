export interface Cliente {
  "@id"?: string;
  condicionIVA?: string;
  readonly apellido?: string;
  readonly nombre?: string;
  readonly razonSocial?: string;
  readonly street?: string;
  readonly city?: string;
  readonly province?: string;
  readonly country?: string;
}
