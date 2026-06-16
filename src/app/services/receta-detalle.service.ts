import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RecetaDetalle } from '../models/receta-detalle.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RecetaDetalleService {
  private url = `${base_url}/api-receta-detalles`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<RecetaDetalle[]>(`${this.url}/lista`);
  }

  insert(detalle: RecetaDetalle) {
    return this.http.post(`${this.url}/nuevo`, detalle);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<RecetaDetalle>(`${this.url}/${id}`);
  }

  update(detalle: RecetaDetalle) {
    return this.http.put(`${this.url}/actualiza`, detalle, { responseType: 'text' });
  }
}
