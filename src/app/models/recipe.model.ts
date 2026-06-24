import { Usuario } from './usuario.model';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  idAutor: Usuario;
  prepTimeMinutes: number;
  difficulty: string;
  published: boolean;
  ultimaActualizacion: Date;
  detalles?: any[];
}
