import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBarearToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

export class EstrategiaCoDeudor implements AuthenticationStrategy {
  name: string = 'codeudor';

  constructor (
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBarearToken(request);
    if (token) {
      let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
      if (datos) {
        if (datos.data.tipoPersona == 3) {
          let perfil: UserProfile = Object.assign({
            nombre: datos.data.nombre
          });
          return perfil;
        }
        else {
          throw new HttpErrors[401]("No coinciden los roles del usuario.");
        }
      }
      else {
        throw new HttpErrors[401]("El token incluido no es válido.");
      }
    }
    else {
      throw new HttpErrors[401]("No se ha incluido un token en la solicitud.");
    }
  }
}
