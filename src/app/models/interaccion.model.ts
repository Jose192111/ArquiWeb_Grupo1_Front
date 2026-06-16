import { Usuario } from './usuario.model';
import { Recipe } from './recipe.model';

export interface Interaccion {
  id: number;
  idUsuario: Usuario;
  idReceta: Recipe;
  tipo: string;
  calificacion: number;
  comentario: string;
  fecha: Date;
}
