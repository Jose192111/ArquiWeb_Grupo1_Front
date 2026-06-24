import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { DiaPlanItem } from '../models/dia-plan-item.model';

const base_url = environment.base;

@Injectable({
    providedIn: 'root',
})
export class DiaPlanItemService {
    private url = `${base_url}/api-dia-plan-items`;

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<DiaPlanItem[]>(`${this.url}/lista`);
    }

    insert(item: DiaPlanItem) {
        return this.http.post(`${this.url}/nuevo`, item);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
    }

    listId(id: number) {
        return this.http.get<DiaPlanItem>(`${this.url}/${id}`);
    }

    update(item: DiaPlanItem) {
        return this.http.put(`${this.url}/actualiza`, item, { responseType: 'text' });
    }
}
