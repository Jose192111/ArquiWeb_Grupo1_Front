import { Rol } from './rol.model';

export interface Usuario {
  id: number;
  username: string;
  email: string;
  contrasenaHash: string;
  nombre: string;
  apellido: string;
  idRol: Rol;
  fechaRegistro: Date;
  ultimaActividad: Date;
}
