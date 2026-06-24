import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { SuscripcionPlan } from '../models/suscripcion-plan.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class SuscripcionPlanService {
  private url = `${base_url}/api-suscripciones-planes`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<SuscripcionPlan[]>(`${this.url}/lista`);
  }

  insert(suscripcion: SuscripcionPlan) {
    return this.http.post(`${this.url}/nuevo`, suscripcion);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<SuscripcionPlan>(`${this.url}/${id}`);
  }

  update(suscripcion: SuscripcionPlan) {
    return this.http.put(`${this.url}/actualiza`, suscripcion, { responseType: 'text' });
  }
}
