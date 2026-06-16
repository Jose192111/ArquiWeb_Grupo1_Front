import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private url = `${base_url}/api-recetas`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Recipe[]>(`${this.url}/lista`);
  }

  insert(recipe: Recipe) {
    return this.http.post(`${this.url}/nuevo`, recipe);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Recipe>(`${this.url}/${id}`);
  }

  update(recipe: Recipe) {
    return this.http.put(`${this.url}/actualiza`, recipe, { responseType: 'text' });
  }
}
