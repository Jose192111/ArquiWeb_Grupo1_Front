import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${base_url}/api-usuarios`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Usuario[]>(`${this.url}/lista`);
  }

  insert(usuario: Usuario) {
    return this.http.post(`${this.url}/nuevo`, usuario);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  update(usuario: Usuario) {
    return this.http.put(`${this.url}/actualiza`, usuario, { responseType: 'text' });
  }
}
