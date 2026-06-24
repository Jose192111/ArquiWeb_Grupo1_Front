import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebarcomponent/sidebar.component';

@Component({
  selector: 'app-ejerciciocomponent',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './ejerciciocomponent.component.html',
  styleUrl: './ejerciciocomponent.component.css'
})
export class EjerciciocomponentComponent {}
