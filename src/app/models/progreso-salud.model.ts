import { Usuario } from './usuario.model';

export interface ProgresoSalud {
  id: number;
  idUsuario: Usuario;
  fecha: Date;
  pesoKg: number;
  tallaCm: number;
  imc: number;
  alergias: string;
}
