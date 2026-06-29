import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Rol } from '../../../models/rol.model';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-rol-listar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './rol-listar.component.html',
  styleUrl: './rol-listar.component.css',
})
export class RolListarComponent implements OnInit {
  roles: Rol[] = [];
  filtro = '';

  constructor(private rolService: RolService) {}

  ngOnInit(): void { this.cargarRoles(); }

  cargarRoles(): void {
    this.rolService.list().subscribe({
      next: (data) => {
        this.roles = data.sort((a, b) => a.id - b.id);
      },
    });
  }

  rolesFiltrados(): Rol[] {
    if (!this.filtro.trim()) return this.roles;
    const term = this.filtro.toLowerCase();
    return this.roles.filter((r) => r.nombre.toLowerCase().includes(term));
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este rol?')) return;
    this.rolService.delete(id).subscribe({ next: () => this.cargarRoles() });
  }
}
