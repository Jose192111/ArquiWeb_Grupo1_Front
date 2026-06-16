import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { PerfilProfesional } from '../models/perfil-profesional.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PerfilProfesionalService {
  private url = `${base_url}/api-perfiles-profesionales`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<PerfilProfesional[]>(`${this.url}/lista`);
  }

  insert(perfil: PerfilProfesional) {
    return this.http.post(`${this.url}/nuevo`, perfil);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<PerfilProfesional>(`${this.url}/${id}`);
  }

  update(perfil: PerfilProfesional) {
    return this.http.put(`${this.url}/actualiza`, perfil, { responseType: 'text' });
  }
}
