import { Usuario } from './usuario.model';

export interface PlanMaestro {
  id: number;
  titulo: string;
  idAutor: Usuario;
  tipoPlan: string;
  duracionDias: number;
  objetivo: string;
}
