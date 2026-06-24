import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ejercicio } from '../../../models/ejercicio.model';
import { EjercicioService } from '../../../services/ejercicio.service';

@Component({
  selector: 'app-ejercicio-listar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './ejercicio-listar.component.html',
  styleUrl: './ejercicio-listar.component.css',
})
export class EjercicioListarComponent implements OnInit {
  ejercicios: Ejercicio[] = [];
  filtro = '';

  constructor(private ejercicioService: EjercicioService) {}

  ngOnInit(): void {
    this.cargarEjercicios();
  }

  cargarEjercicios(): void {
    this.ejercicioService.list().subscribe({
      next: (data) => { this.ejercicios = data; },
    });
  }

  ejerciciosFiltrados(): Ejercicio[] {
    if (!this.filtro.trim()) return this.ejercicios;
    const term = this.filtro.toLowerCase();
    return this.ejercicios.filter(e =>
      e.nombre.toLowerCase().includes(term) ||
      e.grupoMuscular?.toLowerCase().includes(term)
    );
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este ejercicio?')) return;
    this.ejercicioService.delete(id).subscribe({
      next: () => this.cargarEjercicios(),
    });
  }
}
