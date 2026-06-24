import { Usuario } from './usuario.model';

export interface SistemaEvento {
  id: number;
  usuario: Usuario;
  tipo: string;
  titulo: string;
  contenido: string;
  leidoGuardado: boolean;
  fecha: Date;
}
