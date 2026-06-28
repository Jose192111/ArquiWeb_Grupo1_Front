import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RecetaDetalle } from '../models/receta-detalle.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RecetaDetalleService {
  private url = `${base_url}/api/recipes`;

  constructor(private http: HttpClient) { }

  insert(detalle: any) {
    const recetaId = detalle.idReceta;
    return this.http.post(`${this.url}/${recetaId}/detalle`, detalle);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/detalle/${id}`, { responseType: 'text' });
  }

  actualizarOrden(id: number, nuevoOrden: number) {
    return this.http.put(`${this.url}/detalle/${id}/orden/${nuevoOrden}`, {}, { responseType: 'text' });
  }

}