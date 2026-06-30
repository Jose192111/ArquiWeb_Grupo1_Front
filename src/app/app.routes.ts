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
import { IngredientecomponentComponent } from "./components/ingredientecomponent/ingredientecomponent.component";
import { IngredienteListarComponent } from "./components/ingredientecomponent/ingrediente-listar/ingrediente-listar.component";
import { RecetacomponentComponent } from "./components/recetacomponent/recetacomponent.component";
import { RecetaListarComponent } from "./components/recetacomponent/receta-listar/receta-listar.component";
import { IngredienteInsertarComponent } from "./components/ingredientecomponent/ingrediente-insertar/ingrediente-insertar.component";
import { IngredienteActualizarComponent } from "./components/ingredientecomponent/ingrediente-actualizar/ingrediente-actualizar.component";
import { RecetaInsertarComponent } from "./components/recetacomponent/receta-insertar/receta-insertar.component";
import { RecetaActualizarComponent } from "./components/recetacomponent/receta-actualizar/receta-actualizar.component";
import { RecetaDetallesComponent } from "./components/recetadetallecomponent/recetadetallecomponent.component";
import { EtiquetacomponentComponent } from "./components/etiquetacomponent/etiquetacomponent.component";
import { EtiquetaListarComponent } from "./components/etiquetacomponent/etiqueta-listar/etiqueta-listar.component";
import { EtiquetaInsertarComponent } from "./components/etiquetacomponent/etiqueta-insertar/etiqueta-insertar.component";
import { EtiquetaActualizarComponent } from "./components/etiquetacomponent/etiqueta-actualizar/etiqueta-actualizar.component";
import { AgendarcomponentComponent } from "./components/agendarcomponent/agendarcomponent.component";
import { RolcomponentComponent } from "./components/rolcomponent/rolcomponent.component";
import { RolListarComponent } from "./components/rolcomponent/rol-listar/rol-listar.component";
import { RolInsertarComponent } from "./components/rolcomponent/rol-insertar/rol-insertar.component";
import { RolActualizarComponent } from "./components/rolcomponent/rol-actualizar/rol-actualizar.component";

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
        canActivate: [authGuard],
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
        canActivate: [authGuard],
    component: RecetacomponentComponent,
    children: [
      { path: 'listas', component: RecetaListarComponent },
      { path: 'nuevo', component: RecetaInsertarComponent },
      { path: 'edits/:id', component: RecetaActualizarComponent },
      { path: 'gestionar/:id', component: RecetaDetallesComponent },
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
  // P3 - Agendar
  { 
    path: 'agendar',
    component: AgendarcomponentComponent,
    canActivate: [authGuard],
    
  },

];
