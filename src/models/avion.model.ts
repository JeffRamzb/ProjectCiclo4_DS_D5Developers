import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Persona} from './persona.model';

@model()
export class Avion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: false, //true
  })
  descripcion: string;

  @property({
    type: 'number',
    required: false, //true
  })
  porcentaje_participacion: number;

  @property({
    type: 'number',
    required: false, //true
  })
  tipo_avion: number;

  @property({
    type: 'number',
    required: false, //true
  })
  tipo_oferta: number;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
    required: false, //true
  })
  departamento: string;

  @property({
    type: 'string',
    required: false, //true
  })
  ciudad: string;

  @property({
    type: 'string',
    required: false, //true
  })
  direccion: string;

  @property({
    type: 'string',
  })
  solicitudId?: string;

  @belongsTo(() => Persona)
  personaId: string;

  constructor(data?: Partial<Avion>) {
    super(data);
  }
}

export interface AvionRelations {
  // describe navigational properties here
}

export type AvionWithRelations = Avion & AvionRelations;
