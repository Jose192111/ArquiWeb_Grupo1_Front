import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ejercicio } from '../../../models/ejercicio.model';
import { EjercicioService } from '../../../services/ejercicio.service';

@Component({
  selector: 'app-ejercicio-actualizar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ejercicio-actualizar.component.html',
  styleUrl: './ejercicio-actualizar.component.css',
})
export class EjercicioActualizarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  ejercicio: Ejercicio = { id: 0, nombre: '', grupoMuscular: '', duracionMin: 0, metValor: 0 };
  id = 0;

  constructor(
    private ejercicioService: EjercicioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      grupoMuscular: ['', Validators.required],
      duracionMin: ['', [Validators.required, Validators.min(1)]],
      metValor: ['', Validators.required],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.ejercicio.id = this.form.value.codigo;
      this.ejercicio.nombre = this.form.value.nombre;
      this.ejercicio.grupoMuscular = this.form.value.grupoMuscular;
      this.ejercicio.duracionMin = this.form.value.duracionMin;
      this.ejercicio.metValor = this.form.value.metValor;

      this.ejercicioService.update(this.ejercicio).subscribe({
        next: () => this.router.navigate(['/ejercicios/listas']),
      });
    }
  }

  init(): void {
    this.ejercicioService.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        nombre: data.nombre,
        grupoMuscular: data.grupoMuscular,
        duracionMin: data.duracionMin,
        metValor: data.metValor,
      });
    });
  }
}
