import { Recipe } from './recipe.model';
import { Ingrediente } from './ingrediente.model';

export interface RecetaDetalle {
  id: number;
  idReceta: Recipe;
  idIngrediente: Ingrediente;
  cantidad: number;
  esPaso: boolean;
  orden: number;
  contenido: string;
}
