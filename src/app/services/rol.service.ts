import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/rol.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url = `${base_url}/api-roles`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Rol[]>(`${this.url}/lista`);
  }

  insert(rol: Rol) {
    return this.http.post(`${this.url}/nuevo`, rol);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

  update(rol: Rol) {
    return this.http.put(`${this.url}/actualiza`, rol, { responseType: 'text' });
  }
}
