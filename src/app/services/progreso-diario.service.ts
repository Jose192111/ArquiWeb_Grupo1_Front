import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ProgresoDiario } from '../models/progreso-diario.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ProgresoDiarioService {
  private url = `${base_url}/api-progresos-diarios`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<ProgresoDiario[]>(`${this.url}/lista`);
  }

  insert(progreso: ProgresoDiario) {
    return this.http.post(`${this.url}/nuevo`, progreso);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<ProgresoDiario>(`${this.url}/${id}`);
  }

  update(progreso: ProgresoDiario) {
    return this.http.put(`${this.url}/actualiza`, progreso, { responseType: 'text' });
  }
}
