import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { PlanMaestro } from '../models/plan-maestro.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PlanMaestroService {
  private url = `${base_url}/api-planes-maestros`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<PlanMaestro[]>(`${this.url}/lista`);
  }

  insert(plan: PlanMaestro) {
    return this.http.post(`${this.url}/nuevo`, plan);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<PlanMaestro>(`${this.url}/${id}`);
  }

  update(plan: PlanMaestro) {
    return this.http.put(`${this.url}/actualiza`, plan, { responseType: 'text' });
  }
}
