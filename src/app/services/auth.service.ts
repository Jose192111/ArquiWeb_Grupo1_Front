import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${base_url}/login`;
  private registerUrl = `${base_url}/usuarios/nuevo`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{ jwttoken: string }>(this.loginUrl, { username, password });
  }

  register(datos: {
    username: string;
    email: string;
    contrasenaHash: string;
    nombre: string;
    apellido: string;
    idRol: number;
  }) {
    return this.http.post(this.registerUrl, datos, { responseType: 'text' });
  }

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  guardarUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
