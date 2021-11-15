import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Avion,
  Persona,
} from '../models';
import {AvionRepository} from '../repositories';

export class AvionPersonaController {
  constructor(
    @repository(AvionRepository)
    public avionRepository: AvionRepository,
  ) { }

  @get('/avions/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Avion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Avion.prototype.id,
  ): Promise<Persona> {
    return this.avionRepository.persona(id);
  }
}
