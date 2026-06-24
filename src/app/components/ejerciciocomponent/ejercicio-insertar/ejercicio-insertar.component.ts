import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Ejercicio } from '../../../models/ejercicio.model';
import { EjercicioService } from '../../../services/ejercicio.service';

@Component({
  selector: 'app-ejercicio-insertar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ejercicio-insertar.component.html',
  styleUrl: './ejercicio-insertar.component.css',
})
export class EjercicioInsertarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private ejercicioService: EjercicioService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre:        ['', Validators.required],
      grupoMuscular: ['', Validators.required],
      duracionMin:   ['', [Validators.required, Validators.min(1)]],
      metValor:      ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.invalid) return;
    const ejercicio: Ejercicio = {
      id: 0,
      nombre:        this.form.value.nombre,
      grupoMuscular: this.form.value.grupoMuscular,
      duracionMin:   this.form.value.duracionMin,
      metValor:      this.form.value.metValor,
    };
    this.ejercicioService.insert(ejercicio).subscribe({
      next: () => this.router.navigate(['/ejercicios/listas']),
      error: () => { this.error = 'Error al registrar. Intenta nuevamente.'; },
    });
  }
}
