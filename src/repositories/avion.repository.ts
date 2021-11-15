import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Avion, AvionRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class AvionRepository extends DefaultCrudRepository<
  Avion,
  typeof Avion.prototype.id,
  AvionRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Avion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Avion, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
