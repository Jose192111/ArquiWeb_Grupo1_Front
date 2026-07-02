import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Ingrediente } from '../models/ingrediente.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  
  private url = `${base_url}/ingredientes`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Ingrediente[]>(this.url);
  }

  insert(ingrediente: Ingrediente) {
    return this.http.post(this.url, ingrediente);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Ingrediente>(`${this.url}/${id}`);
  }

  update(ingrediente: Ingrediente) {
    return this.http.put(`${this.url}/${ingrediente.id}`, ingrediente, { responseType: 'text' });
  }

  getReporteUso() {
    return this.http.get<any[]>(`${this.url}/reporte-ingredientes-top`); 
  }
}