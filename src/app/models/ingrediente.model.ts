import { Etiqueta } from './etiqueta.model';

export interface Ingrediente {
  id: number;
  nombre: string;
  unidadMedida: string;
  idEtiqueta: Etiqueta;
  calorias100: number;
  proteinas100: number;
  carbos100: number;
  grasas100: number;
}
