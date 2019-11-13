import { IParametro } from 'app/shared/model/parametro.model';

export interface IPersona {
  id?: number;
  nombres?: string;
  apellidos?: string;
  numeroId?: number;
  usuario?: string;
  contrasena?: string;
  tipoIdentificacion?: string;
  edad?: number;
  direccion?: string;
  telefono?: string;
  parametro?: IParametro;
}

export class Persona implements IPersona {
  constructor(
    public id?: number,
    public nombres?: string,
    public apellidos?: string,
    public numeroId?: number,
    public usuario?: string,
    public contrasena?: string,
    public tipoIdentificacion?: string,
    public edad?: number,
    public direccion?: string,
    public telefono?: string,
    public parametro?: IParametro
  ) {}
}
