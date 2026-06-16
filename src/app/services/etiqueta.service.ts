import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Etiqueta } from '../models/etiqueta.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class EtiquetaService {
  private url = `${base_url}/api-etiquetas`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Etiqueta[]>(`${this.url}/lista`);
  }

  insert(etiqueta: Etiqueta) {
    return this.http.post(`${this.url}/nuevo`, etiqueta);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Etiqueta>(`${this.url}/${id}`);
  }

  update(etiqueta: Etiqueta) {
    return this.http.put(`${this.url}/actualiza`, etiqueta, { responseType: 'text' });
  }
}
