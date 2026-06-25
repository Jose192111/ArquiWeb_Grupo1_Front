export interface Recipe {
  id: number;
  title: string;
  description: string;
  idAutor: number; 
  prepTimeMinutes: number;
  difficulty: string;
  published: boolean;
  ultimaActualizacion: Date;
  detalles?: any[];
}