import { PlanMaestro } from './plan-maestro.model';
import { Recipe } from './recipe.model';
import { Ejercicio } from './ejercicio.model';

export interface DiaPlanItem {
    id: number;
    idPlan: PlanMaestro;
    numDia: number;
    idReceta: Recipe;
    idEjercicio: Ejercicio;
    momento: string;
    orden: number;
}
