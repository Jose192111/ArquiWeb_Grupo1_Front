import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Interaccion } from '../models/interaccion.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class InteraccionService {
  private url = `${base_url}/api-interacciones`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Interaccion[]>(`${this.url}/lista`);
  }

  insert(interaccion: Interaccion) {
    return this.http.post(`${this.url}/nuevo`, interaccion);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Interaccion>(`${this.url}/${id}`);
  }

  update(interaccion: Interaccion) {
    return this.http.put(`${this.url}/actualiza`, interaccion, { responseType: 'text' });
  }
}
