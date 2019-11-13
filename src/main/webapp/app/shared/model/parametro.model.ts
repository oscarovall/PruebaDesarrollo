import { IPersona } from 'app/shared/model/persona.model';

export interface IParametro {
  id?: number;
  code?: number;
  value?: string;
  personas?: IPersona[];
}

export class Parametro implements IParametro {
  constructor(public id?: number, public code?: number, public value?: string, public personas?: IPersona[]) {}
}
