import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebarcomponent/sidebar.component';

@Component({
  selector: 'app-rolcomponent',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './rolcomponent.component.html',
})
export class RolcomponentComponent {}
