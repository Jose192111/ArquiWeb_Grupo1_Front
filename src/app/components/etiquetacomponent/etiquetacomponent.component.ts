import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebarcomponent/sidebar.component';

@Component({
  selector: 'app-etiquetacomponent',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './etiquetacomponent.component.html',
})
export class EtiquetacomponentComponent {}
