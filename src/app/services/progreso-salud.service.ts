import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ProgresoSalud } from '../models/progreso-salud.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ProgresoSaludService {
  private url = `${base_url}/api-progresos-salud`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<ProgresoSalud[]>(`${this.url}/lista`);
  }

  insert(progreso: ProgresoSalud) {
    return this.http.post(`${this.url}/nuevo`, progreso);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<ProgresoSalud>(`${this.url}/${id}`);
  }

  update(progreso: ProgresoSalud) {
    return this.http.put(`${this.url}/actualiza`, progreso, { responseType: 'text' });
  }
}
