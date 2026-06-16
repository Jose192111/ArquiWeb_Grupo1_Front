import { Routes } from '@angular/router';
import { EjerciciocomponentComponent } from './components/ejerciciocomponent/ejerciciocomponent.component';
import { EjercicioInsertarComponent } from './components/ejerciciocomponent/ejercicio-insertar/ejercicio-insertar.component';
import { EjercicioActualizarComponent } from './components/ejerciciocomponent/ejercicio-actualizar/ejercicio-actualizar.component';
import { EjercicioListarComponent } from './components/ejerciciocomponent/ejercicio-listar/ejercicio-listar.component';
import { RolcomponentComponent } from './components/rolcomponent/rolcomponent.component';
import { RolListarComponent } from './components/rolcomponent/rol-listar/rol-listar.component';
import { RolInsertarComponent } from './components/rolcomponent/rol-insertar/rol-insertar.component';
import { RolActualizarComponent } from './components/rolcomponent/rol-actualizar/rol-actualizar.component';
import { EtiquetacomponentComponent } from './components/etiquetacomponent/etiquetacomponent.component';
import { EtiquetaListarComponent } from './components/etiquetacomponent/etiqueta-listar/etiqueta-listar.component';
import { EtiquetaInsertarComponent } from './components/etiquetacomponent/etiqueta-insertar/etiqueta-insertar.component';
import { EtiquetaActualizarComponent } from './components/etiquetacomponent/etiqueta-actualizar/etiqueta-actualizar.component';
import { Homecomponent } from './components/homecomponent/homecomponent';

export const routes: Routes = [
  {
    path: '',
    component: Homecomponent,
  },
  {
    path: 'ejercicios',
    component: EjerciciocomponentComponent,
    children: [
      { path: 'listas', component: EjercicioListarComponent },
      { path: 'nuevo', component: EjercicioInsertarComponent },
      { path: 'edits/:id', component: EjercicioActualizarComponent },
      { path: '', redirectTo: 'listas', pathMatch: 'full' },
    ],
  },
  {
    path: 'roles',
    component: RolcomponentComponent,
    children: [
      { path: 'listas', component: RolListarComponent },
      { path: 'nuevo', component: RolInsertarComponent },
      { path: 'edits/:id', component: RolActualizarComponent },
      { path: '', redirectTo: 'listas', pathMatch: 'full' },
    ],
  },
  {
    path: 'etiquetas',
    component: EtiquetacomponentComponent,
    children: [
      { path: 'listas', component: EtiquetaListarComponent },
      { path: 'nuevo', component: EtiquetaInsertarComponent },
      { path: 'edits/:id', component: EtiquetaActualizarComponent },
      { path: '', redirectTo: 'listas', pathMatch: 'full' },
    ],
  },
];
