import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menucomponent',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {
  menuAppOpen   = false;
  menuCuentaOpen = false;

  constructor(public authService: AuthService) {}

  toggleApp():   void { this.menuAppOpen    = !this.menuAppOpen;   this.menuCuentaOpen = false; }
  toggleCuenta():void { this.menuCuentaOpen = !this.menuCuentaOpen; this.menuAppOpen    = false; }
  cerrar():      void { this.menuAppOpen = false; this.menuCuentaOpen = false; }
  cerrarSesion():void { this.cerrar(); this.authService.logout(); }
}
