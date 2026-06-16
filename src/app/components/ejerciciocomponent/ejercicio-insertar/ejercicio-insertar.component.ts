import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ejercicio } from '../../../models/ejercicio.model';
import { EjercicioService } from '../../../services/ejercicio.service';

@Component({
  selector: 'app-ejercicio-insertar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ejercicio-insertar.component.html',
  styleUrl: './ejercicio-insertar.component.css',
})
export class EjercicioInsertarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  ejercicio: Ejercicio = { id: 0, nombre: '', grupoMuscular: '', duracionMin: 0, metValor: 0 };

  constructor(
    private ejercicioService: EjercicioService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      grupoMuscular: ['', Validators.required],
      duracionMin: ['', [Validators.required, Validators.min(1)]],
      metValor: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.ejercicio.nombre = this.form.value.nombre;
      this.ejercicio.grupoMuscular = this.form.value.grupoMuscular;
      this.ejercicio.duracionMin = this.form.value.duracionMin;
      this.ejercicio.metValor = this.form.value.metValor;

      this.ejercicioService.insert(this.ejercicio).subscribe({
        next: () => this.router.navigate(['/ejercicios/listas']),
      });
    }
  }
}
