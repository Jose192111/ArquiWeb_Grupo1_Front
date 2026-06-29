# Guía para agregar una API de servicio en este proyecto

Este proyecto ya tiene el patrón base para consumir APIs desde Angular usando `HttpClient`.

## Archivos clave del patrón

- [src/app/app.config.ts](src/app/app.config.ts): configura `provideHttpClient(withFetch())` para habilitar peticiones HTTP.
- [src/app/services/servicio.ts](src/app/services/servicio.ts): ejemplo de un servicio inyectable que consume una API.
- [src/app/components/componente/componente.ts](src/app/components/componente/componente.ts): ejemplo de cómo inyectar el servicio en un componente y usarlo.

## Paso a paso para crear una nueva API de servicio

1. Asegurarte de que el proyecto tenga `HttpClient` habilitado.
   - En este proyecto ya está configurado en [src/app/app.config.ts](src/app/app.config.ts).

2. Crear un servicio dentro de [src/app/services](src/app/services).
   - El servicio debe usar `@Injectable({ providedIn: 'root' })`.
   - Inyectar `HttpClient` en el constructor.
   - Definir la URL base de la API.

3. Crear métodos para cada petición.
   - Ejemplo: `getDatos()`, `getDatoPorId(id)`, `crearDato(payload)`.
   - Retornar `Observable`.

4. Inyectar el servicio en un componente.
   - Importarlo en el componente.
   - Agregarlo al constructor.
   - Llamarlo desde un método del componente.

5. Manejar la respuesta y los errores.
   - Usar `subscribe({ next, error })`.
   - Guardar los datos en propiedades del componente.

## Plantilla recomendada

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MiServicio {
  private readonly baseUrl = 'https://api.ejemplo.com';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/items`);
  }

  getItemById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/items/${id}`);
  }

  createItem(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/items`, payload);
  }
}
```

```ts
import { Component } from '@angular/core';
import { MiServicio } from '../../services/mi-servicio';

@Component({
  selector: 'app-ejemplo',
  standalone: true,
  template: '<button (click)="cargar()">Cargar</button>',
})
export class EjemploComponent {
  datos: any[] = [];

  constructor(private servicio: MiServicio) {}

  cargar(): void {
    this.servicio.getItems().subscribe({
      next: (data) => {
        this.datos = data;
      },
      error: (err) => {
        console.error('Error al cargar datos', err);
      },
    });
  }
}
```

## Buenas prácticas

- Preferir interfaces en lugar de `any` cuando sea posible.
- Separar la lógica de acceso a datos en servicios.
- Mantener la URL base en una constante.
- Manejar errores en el componente o usar un servicio de manejo de errores.
- Si la API devuelve muchos datos, considerar usar `map` o `pipe` con RxJS.

## Checklist rápido

- [ ] Crear el servicio en [src/app/services](src/app/services)
- [ ] Inyectar `HttpClient`
- [ ] Definir la URL base
- [ ] Crear métodos con `Observable`
- [ ] Inyectar el servicio en un componente
- [ ] Llamar al método y manejar la respuesta
- [ ] Validar errores
