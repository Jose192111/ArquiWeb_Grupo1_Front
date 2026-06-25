# Guía para compañeros — Cómo agregar tu módulo al frontend

Este documento explica el patrón que usamos para que puedas implementar tus módulos siguiendo la misma estructura.

---

## Estructura de carpetas que debes crear

```
src/app/components/
└── tunombrecomponent/                  ← carpeta raíz del módulo
    ├── tunombrecomponent.component.ts
    ├── tunombrecomponent.component.html
    ├── tunombrecomponent.component.css
    ├── tu-nombre-listar/
    │   ├── tu-nombre-listar.component.ts
    │   ├── tu-nombre-listar.component.html
    │   └── tu-nombre-listar.component.css
    ├── tu-nombre-insertar/
    │   └── ...
    └── tu-nombre-actualizar/
        └── ...
```

---

## 1. Componente raíz (el "shell")

**`tunombrecomponent.component.ts`** — Importa sidebar y router-outlet:

```typescript
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebarcomponent/sidebar.component';

@Component({
  selector: 'app-tunombrecomponent',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './tunombrecomponent.component.html',
  styleUrl: './tunombrecomponent.component.css',
})
export class TunombrecomponentComponent {}
```

**`tunombrecomponent.component.html`** — Solo esto:

```html
<div class="app-shell">
  <app-sidebar></app-sidebar>
  <div class="shell-main">
    <router-outlet></router-outlet>
  </div>
</div>
```

**`tunombrecomponent.component.css`** — Vacío o comentario:

```css
/* Estilos vienen de styles.css global */
```

---

## 2. Componente listar

**`tu-nombre-listar.component.ts`:**

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TuModelo } from '../../../models/tu-modelo.model';
import { TuService } from '../../../services/tu.service';

@Component({
  selector: 'app-tu-nombre-listar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './tu-nombre-listar.component.html',
  styleUrl: './tu-nombre-listar.component.css',
})
export class TuNombreListarComponent implements OnInit {
  items: TuModelo[] = [];
  filtro = '';

  constructor(private tuService: TuService) {}

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.tuService.list().subscribe({ next: (data) => { this.items = data; } });
  }

  itemsFiltrados(): TuModelo[] {
    if (!this.filtro.trim()) return this.items;
    const term = this.filtro.toLowerCase();
    return this.items.filter(i => i.nombre.toLowerCase().includes(term));
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este registro?')) return;
    this.tuService.delete(id).subscribe({ next: () => this.cargar() });
  }
}
```

**`tu-nombre-listar.component.html`** — Copia este patrón y adapta columnas:

```html
<div class="kh-breadcrumb">App / <span>Tu Módulo</span></div>

<div class="kh-page-head">
  <div>
    <h2>Tu Módulo</h2>
    <p>Descripción del módulo</p>
  </div>
  <button class="kh-btn-new" routerLink="/tu-ruta/nuevo">+ Nuevo</button>
</div>

<div class="kh-stats">
  <div class="kh-stat">
    <p class="label">Total</p>
    <p class="value">{{ items.length }}</p>
    <p class="tag">registros</p>
  </div>
</div>

<div class="kh-search">
  <input class="kh-search-input" type="text"
         placeholder="🔍  Buscar..." [(ngModel)]="filtro" />
</div>

<div class="kh-table-card">
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Campo 1</th>
        <th>Campo 2</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      @if (itemsFiltrados().length === 0) {
        <tr><td colspan="4">
          <div class="kh-empty"><p class="ico">📦</p><p>Sin registros aún.</p></div>
        </td></tr>
      }
      @for (item of itemsFiltrados(); track item.id) {
        <tr>
          <td>{{ item.id }}</td>
          <td><strong>{{ item.campo1 }}</strong></td>
          <td>{{ item.campo2 }}</td>
          <td>
            <div class="kh-actions">
              <button class="kh-btn-edit" [routerLink]="['/tu-ruta/edits', item.id]">✏️ Editar</button>
              <button class="kh-btn-del" (click)="eliminar(item.id)">🗑 Eliminar</button>
            </div>
          </td>
        </tr>
      }
    </tbody>
  </table>
  <div class="kh-pagination">
    <span>{{ itemsFiltrados().length }} resultado(s)</span>
  </div>
</div>
```

---

## 3. Componente insertar

**`tu-nombre-insertar.component.ts`:**

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TuModelo } from '../../../models/tu-modelo.model';
import { TuService } from '../../../services/tu.service';

@Component({
  selector: 'app-tu-nombre-insertar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './tu-nombre-insertar.component.html',
  styleUrl: './tu-nombre-insertar.component.css',
})
export class TuNombreInsertarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  error = '';

  constructor(
    private fb: FormBuilder,
    private tuService: TuService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      campo1: ['', Validators.required],
      campo2: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.invalid) return;
    const item: TuModelo = { id: 0, ...this.form.value };
    this.tuService.insert(item).subscribe({
      next: () => this.router.navigate(['/tu-ruta/listas']),
      error: () => { this.error = 'Error al registrar.'; },
    });
  }
}
```

**`tu-nombre-insertar.component.html`:**

```html
<div class="kh-breadcrumb">App / <a routerLink="/tu-ruta/listas">Tu Módulo</a> / <span>Nuevo</span></div>

<div class="kh-page-head">
  <div><h2>Nuevo Registro</h2><p>Completa los datos del formulario</p></div>
</div>

@if (error) { <div class="kh-alert-err">⚠️ {{ error }}</div> }

<form [formGroup]="form" (ngSubmit)="aceptar()">
  <div class="kh-form-card">
    <div class="kh-form-grid">

      <div class="kh-form-field">
        <label>Campo 1 <span class="req">*</span></label>
        <input class="kh-input" formControlName="campo1" placeholder="..." />
      </div>

      <div class="kh-form-field">
        <label>Campo 2 <span class="req">*</span></label>
        <input class="kh-input" formControlName="campo2" placeholder="..." />
      </div>

    </div>
    <div class="kh-form-actions">
      <button type="button" class="kh-btn-cancel" routerLink="/tu-ruta/listas">Cancelar</button>
      <button type="submit" class="kh-btn-save" [disabled]="form.invalid">Guardar</button>
    </div>
  </div>
</form>
```

---

## 4. Componente actualizar

Igual al insertar pero con estas diferencias:

```typescript
// Añadir en el constructor:
private route: ActivatedRoute

// En ngOnInit agregar:
this.route.params.subscribe((params: Params) => {
  this.id = params['id'];
  this.init(); // carga datos del ID
});

// Agregar método init():
init(): void {
  this.tuService.listId(this.id).subscribe((data) => {
    this.form.patchValue({ campo1: data.campo1, campo2: data.campo2 });
  });
}
```

En el HTML añadir campo ID readonly:

```html
<div class="kh-form-field">
  <label>ID</label>
  <input class="kh-input readonly" formControlName="codigo" readonly />
</div>
```

---

## 5. Service — URLs correctas

```typescript
private url = `${base_url}/tu-endpoint`;  // ej: /roles, /etiquetas, /ingredientes

list()            → GET    /tu-endpoint
insert(item)      → POST   /tu-endpoint/nuevo
listId(id)        → GET    /tu-endpoint/detalle/{id}
update(item)      → PUT    /tu-endpoint/actualizar/{item.id}
delete(id)        → DELETE /tu-endpoint/eliminar/{id}
```

---

## 6. Agregar tus rutas en `app.routes.ts`

```typescript
// Importar tus componentes arriba...

// En el array routes agregar:
{
  path: 'tu-ruta',
  component: TunombrecomponentComponent,
  canActivate: [authGuard],
  children: [
    { path: 'listas',    component: TuNombreListarComponent },
    { path: 'nuevo',     component: TuNombreInsertarComponent },
    { path: 'edits/:id', component: TuNombreActualizarComponent },
    { path: '', redirectTo: 'listas', pathMatch: 'full' },
  ],
},
```

---

## 7. Clases CSS disponibles (vienen de `styles.css`)

No necesitas escribir CSS propio. Usa estas clases globales:

| Clase | Uso |
|---|---|
| `kh-breadcrumb` | Ruta de navegación arriba |
| `kh-page-head` | Cabecera con título y botón |
| `kh-btn-new` | Botón verde "Nuevo..." |
| `kh-stats` + `kh-stat` | Tarjetas de estadísticas |
| `kh-search` + `kh-search-input` | Barra de búsqueda |
| `kh-table-card` | Contenedor de tabla |
| `kh-badge kh-badge-green` | Badge verde |
| `kh-badge kh-badge-purple` | Badge morado |
| `kh-badge kh-badge-yellow` | Badge amarillo |
| `kh-badge kh-badge-blue` | Badge azul |
| `kh-actions` + `kh-btn-edit` + `kh-btn-del` | Botones de acción en tabla |
| `kh-pagination` | Pie de tabla con conteo |
| `kh-form-card` | Contenedor del formulario |
| `kh-form-grid` | Grid 2 columnas para campos |
| `kh-form-grid one-col` | Grid 1 columna |
| `kh-form-field` | Wrapper de cada campo |
| `kh-form-field full` | Campo que ocupa todo el ancho |
| `kh-input` | Input/select/textarea estilizado |
| `kh-input readonly` | Input solo lectura (gris) |
| `kh-hint` | Texto de ayuda debajo del input |
| `kh-form-actions` | Fila de botones al final del form |
| `kh-btn-save` | Botón guardar (verde oscuro) |
| `kh-btn-cancel` | Botón cancelar (borde gris) |
| `kh-alert-ok` | Alerta verde de éxito |
| `kh-alert-err` | Alerta roja de error |
| `kh-empty` | Estado vacío centrado |

---

## 8. Ver módulos de referencia

Para ver cómo se implementó un módulo completo, revisa:

- **Ejercicios** → `src/app/components/ejerciciocomponent/`
- **Planes Maestros** → `src/app/components/planmaestrocomponent/`

Son los más limpios y actualizados.
