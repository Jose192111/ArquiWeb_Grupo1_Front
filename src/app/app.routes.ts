import { Routes } from "@angular/router";
import { Homecomponent } from "./components/homecomponent/homecomponent";
import { Logincomponent } from "./components/logincomponent/logincomponent";
import { Registrocomponent } from "./components/registrocomponent/registrocomponent";
import { EjerciciocomponentComponent } from "./components/ejerciciocomponent/ejerciciocomponent.component";
import { authGuard } from "./guards/auth.guard";
import { EjercicioListarComponent } from "./components/ejerciciocomponent/ejercicio-listar/ejercicio-listar.component";
import { EjercicioInsertarComponent } from "./components/ejerciciocomponent/ejercicio-insertar/ejercicio-insertar.component";
import { EjercicioActualizarComponent } from "./components/ejerciciocomponent/ejercicio-actualizar/ejercicio-actualizar.component";
import { PlanmaestrocomponentComponent } from "./components/planmaestrocomponent/planmaestrocomponent.component";
import { PlanMaestroListarComponent } from "./components/planmaestrocomponent/plan-maestro-listar/plan-maestro-listar.component";
import { PlanMaestroInsertarComponent } from "./components/planmaestrocomponent/plan-maestro-insertar/plan-maestro-insertar.component";
import { PlanMaestroActualizarComponent } from "./components/planmaestrocomponent/plan-maestro-actualizar/plan-maestro-actualizar.component";
import { RolActualizarComponent, RolcomponentComponent, RolInsertarComponent, RolListarComponent } from "./components/rolcomponent";
import { IngredientecomponentComponent } from "./components/ingredientecomponent/ingredientecomponent.component";
import { IngredienteListarComponent } from "./components/ingredientecomponent/ingrediente-listar/ingrediente-listar.component";
import { RecetacomponentComponent } from "./components/recetacomponent/recetacomponent.component";
import { RecetaListarComponent } from "./components/recetacomponent/receta-listar/receta-listar.component";
import { EtiquetaActualizarComponent, EtiquetacomponentComponent, EtiquetaInsertarComponent, EtiquetaListarComponent } from "./components/etiquetacomponent";
import { IngredienteInsertarComponent } from "./components/ingredientecomponent/ingrediente-insertar/ingrediente-insertar.component";
import { IngredienteActualizarComponent } from "./components/ingredientecomponent/ingrediente-actualizar/ingrediente-actualizar.component";
import { RecetaInsertarComponent } from "./components/recetacomponent/receta-insertar/receta-insertar.component";
import { RecetaActualizarComponent } from "./components/recetacomponent/receta-actualizar/receta-actualizar.component";

export const routes: Routes = [
  // Públicas
  { path: '', component: Homecomponent },
  { path: 'login', component: Logincomponent },
  { path: 'registro', component: Registrocomponent },

  // P4 — Ejercicios
  {
    path: 'ejercicios',
    component: EjerciciocomponentComponent,
    canActivate: [authGuard],
    children: [
      { path: 'listas',       component: EjercicioListarComponent },
      { path: 'nuevo',        component: EjercicioInsertarComponent },
      { path: 'edits/:id',    component: EjercicioActualizarComponent },
      { path: '', redirectTo: 'listas', pathMatch: 'full' },
    ],
  },

  // P4 — Planes Maestros
  {
    path: 'planes',
    component: PlanmaestrocomponentComponent,
    canActivate: [authGuard],
    children: [
      { path: 'listas',       component: PlanMaestroListarComponent },
      { path: 'nuevo',        component: PlanMaestroInsertarComponent },
      { path: 'edits/:id',    component: PlanMaestroActualizarComponent },
      { path: '', redirectTo: 'listas', pathMatch: 'full' },
    ],
  },

  // P1 — Roles
  {
    path: 'roles',
    component: RolcomponentComponent,
    canActivate: [authGuard],
    children: [
      { path: 'listas',       component: RolListarComponent },
      { path: 'nuevo',        component: RolInsertarComponent },
      { path: 'edits/:id',    component: RolActualizarComponent },
      { path: '', redirectTo: 'listas', pathMatch: 'full' },
    ],
  },

  // P2 — Ingredientes
  {
    path: 'ingredientes',
    component: IngredientecomponentComponent,
    children: [
      { path: 'listas', component: IngredienteListarComponent },
      { path: 'nuevo', component: IngredienteInsertarComponent },
      { path: 'edits/:id', component: IngredienteActualizarComponent },
      { path: '', redirectTo: 'listas', pathMatch: 'full' },
    ],
  },

  // P2 — Recetas
  {
    path: 'recetas',
    component: RecetacomponentComponent,
    children: [
      { path: 'listas', component: RecetaListarComponent },
      { path: 'nuevo', component: RecetaInsertarComponent },
      { path: 'edits/:id', component: RecetaActualizarComponent },
      { path: '', redirectTo: 'listas', pathMatch: 'full' },
    ],
  },

  // P1 — Etiquetas
  {
    path: 'etiquetas',
    component: EtiquetacomponentComponent,
    canActivate: [authGuard],
    children: [
      { path: 'listas',       component: EtiquetaListarComponent },
      { path: 'nuevo',        component: EtiquetaInsertarComponent },
      { path: 'edits/:id',    component: EtiquetaActualizarComponent },
      { path: '', redirectTo: 'listas', pathMatch: 'full' },
    ],
  },
];
