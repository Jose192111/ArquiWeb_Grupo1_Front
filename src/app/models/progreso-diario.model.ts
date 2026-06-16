import { SuscripcionPlan } from './suscripcion-plan.model';
import { DiaPlanItem } from './dia-plan-item.model';

export interface ProgresoDiario {
  id: number;
  idSuscripcion: SuscripcionPlan;
  idDiaPlanItem: DiaPlanItem;
  completado: boolean;
  fechaRegistro: Date;
}
