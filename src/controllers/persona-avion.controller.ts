import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  Avion,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaAvionController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/avions', {
    responses: {
      '200': {
        description: 'Array of Persona has many Avion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Avion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Avion>,
  ): Promise<Avion[]> {
    return this.personaRepository.aviones(id).find(filter);
  }

  @post('/personas/{id}/avions', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Avion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avion, {
            title: 'NewAvionInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) avion: Omit<Avion, 'id'>,
  ): Promise<Avion> {
    return this.personaRepository.aviones(id).create(avion);
  }

  @patch('/personas/{id}/avions', {
    responses: {
      '200': {
        description: 'Persona.Avion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avion, {partial: true}),
        },
      },
    })
    avion: Partial<Avion>,
    @param.query.object('where', getWhereSchemaFor(Avion)) where?: Where<Avion>,
  ): Promise<Count> {
    return this.personaRepository.aviones(id).patch(avion, where);
  }

  @del('/personas/{id}/avions', {
    responses: {
      '200': {
        description: 'Persona.Avion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Avion)) where?: Where<Avion>,
  ): Promise<Count> {
    return this.personaRepository.aviones(id).delete(where);
  }
}
