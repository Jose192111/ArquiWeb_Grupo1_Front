import { Usuario } from './usuario.model';

export interface SuscripcionPlan {
  id: number;
  idUsuario: Usuario;
  idPlan: any;
  fechaInicio: Date;
  activo: boolean;
}
