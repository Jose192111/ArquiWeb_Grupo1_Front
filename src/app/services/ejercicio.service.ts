import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Ejercicio } from '../models/ejercicio.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class EjercicioService {
  private url = `${base_url}/ejercicios`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Ejercicio[]>(`${this.url}`);
  }

  insert(ejercicio: Ejercicio) {
    return this.http.post(`${this.url}/nuevo`, ejercicio);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Ejercicio>(`${this.url}/detalle/${id}`);
  }

  update(ejercicio: Ejercicio) {
    return this.http.put(`${this.url}/actualizar/${ejercicio.id}`, ejercicio, { responseType: 'text' });
  }
}
