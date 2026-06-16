import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Rol } from '../../../models/rol.model';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-rol-listar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rol-listar.component.html',
  styleUrl: './rol-listar.component.css',
})
export class RolListarComponent implements OnInit {
  roles: Rol[] = [];

  constructor(private rolService: RolService) { }

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.rolService.list().subscribe({
      next: (data) => {
        this.roles = data;
      },
    });
  }

  eliminar(id: number): void {
    this.rolService.delete(id).subscribe({
      next: () => this.cargarRoles(),
    });
  }
}
