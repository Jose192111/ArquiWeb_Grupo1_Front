import { Usuario } from './usuario.model';

export interface PerfilProfesional {
  id: number;
  idUsuario: Usuario;
  especialidad: string;
  numeroColegiatura: string;
  verificado: boolean;
}
