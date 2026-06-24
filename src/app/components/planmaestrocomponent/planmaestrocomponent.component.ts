import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebarcomponent/sidebar.component';

@Component({
  selector: 'app-planmaestrocomponent',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './planmaestrocomponent.component.html',
  styleUrl: './planmaestrocomponent.component.css',
})
export class PlanmaestrocomponentComponent {}
