import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { SistemaEvento } from '../models/sistema-evento.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class SistemaEventoService {
  private url = `${base_url}/api-sistema-eventos`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<SistemaEvento[]>(`${this.url}/lista`);
  }

  insert(evento: SistemaEvento) {
    return this.http.post(`${this.url}/nuevo`, evento);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<SistemaEvento>(`${this.url}/${id}`);
  }

  update(evento: SistemaEvento) {
    return this.http.put(`${this.url}/actualiza`, evento, { responseType: 'text' });
  }
}
