import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Ingrediente } from '../models/ingrediente.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  private url = `${base_url}/api-ingredientes`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Ingrediente[]>(`${this.url}/lista`);
  }

  insert(ingrediente: Ingrediente) {
    return this.http.post(`${this.url}/nuevo`, ingrediente);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Ingrediente>(`${this.url}/${id}`);
  }

  update(ingrediente: Ingrediente) {
    return this.http.put(`${this.url}/actualiza`, ingrediente, { responseType: 'text' });
  }
}
