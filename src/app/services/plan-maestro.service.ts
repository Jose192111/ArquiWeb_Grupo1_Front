import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { PlanMaestro } from '../models/plan-maestro.model';

const base_url = environment.base;

@Injectable({ providedIn: 'root' })
export class PlanMaestroService {
  private url = `${base_url}/planes`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<PlanMaestro[]>(`${this.url}`);
  }

  listByTipo(tipo: string) {
    return this.http.get<PlanMaestro[]>(`${this.url}?tipo=${tipo}`);
  }

  insert(plan: PlanMaestro) {
    return this.http.post<PlanMaestro>(`${this.url}/nuevo`, plan);
  }

  listId(id: number) {
    return this.http.get<PlanMaestro>(`${this.url}/detalle/${id}`);
  }

  update(plan: PlanMaestro) {
    return this.http.put(`${this.url}/actualizar/${plan.id}`, plan, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`, { responseType: 'text' });
  }
}
