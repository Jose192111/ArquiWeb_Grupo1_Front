import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/receta.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private url = `${base_url}/api/recipes`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Recipe[]>(this.url); // Sin "/lista"
  }

  insert(recipe: Recipe) {
    return this.http.post(this.url, recipe); // Sin "/nuevo"
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Recipe>(`${this.url}/${id}`);
  }

  update(recipe: Recipe) {
    // Apunta al ID exacto para el PUT, sin "/actualiza"
    return this.http.put(`${this.url}/${recipe.id}`, recipe, { responseType: 'text' });
  }

  // Agrégalo debajo de tus otros métodos
  getEstadisticasDificultad() {
    return this.http.get<any[]>(`${this.url}/estadisticas-dificultad`);
  }
}