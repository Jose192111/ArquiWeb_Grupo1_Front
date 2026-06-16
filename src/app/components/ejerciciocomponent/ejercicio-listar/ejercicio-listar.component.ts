import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Ejercicio } from '../../../models/ejercicio.model';
import { EjercicioService } from '../../../services/ejercicio.service';

@Component({
  selector: 'app-ejercicio-listar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ejercicio-listar.component.html',
  styleUrl: './ejercicio-listar.component.css',
})
export class EjercicioListarComponent implements OnInit {
  ejercicios: Ejercicio[] = [];

  constructor(private ejercicioService: EjercicioService) { }

  ngOnInit(): void {
    this.cargarEjercicios();
  }

  cargarEjercicios(): void {
    this.ejercicioService.list().subscribe({
      next: (data) => {
        this.ejercicios = data;
      },
    });
  }

  eliminar(id: number): void {
    this.ejercicioService.delete(id).subscribe({
      next: () => this.cargarEjercicios(),
    });
  }
}
