import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Solicitud, Avion} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {AvionRepository} from './avion.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Persona.prototype.id>;

  public readonly aviones: HasManyRepositoryFactory<Avion, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('AvionRepository') protected avionRepositoryGetter: Getter<AvionRepository>,
  ) {
    super(Persona, dataSource);
    this.aviones = this.createHasManyRepositoryFactoryFor('aviones', avionRepositoryGetter,);
    this.registerInclusionResolver('aviones', this.aviones.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
