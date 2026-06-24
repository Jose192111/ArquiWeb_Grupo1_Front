import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ContactoProfesional } from '../models/contacto-profesional.model';

const base_url = environment.base;

@Injectable({
    providedIn: 'root',
})
export class ContactoProfesionalService {
    private url = `${base_url}/api-contactos-profesionales`;

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<ContactoProfesional[]>(`${this.url}/lista`);
    }

    insert(contacto: ContactoProfesional) {
        return this.http.post(`${this.url}/nuevo`, contacto);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
    }

    listId(id: number) {
        return this.http.get<ContactoProfesional>(`${this.url}/${id}`);
    }

    update(contacto: ContactoProfesional) {
        return this.http.put(`${this.url}/actualiza`, contacto, { responseType: 'text' });
    }
}
