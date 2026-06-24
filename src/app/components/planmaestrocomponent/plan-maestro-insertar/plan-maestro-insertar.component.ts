import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PlanMaestro } from '../../../models/plan-maestro.model';
import { PlanMaestroService } from '../../../services/plan-maestro.service';

@Component({
  selector: 'app-plan-maestro-insertar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './plan-maestro-insertar.component.html',
  styleUrl: './plan-maestro-insertar.component.css',
})
export class PlanMaestroInsertarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  error = '';

  constructor(
    private fb: FormBuilder,
    private planService: PlanMaestroService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo:       ['', Validators.required],
      idAutor:      ['', [Validators.required, Validators.min(1)]],
      tipoPlan:     ['', Validators.required],
      duracionDias: ['', [Validators.required, Validators.min(1)]],
      objetivo:     [''],
    });
  }

  aceptar(): void {
    if (this.form.invalid) return;
    const plan: PlanMaestro = {
      id: 0,
      titulo:       this.form.value.titulo,
      idAutor:      Number(this.form.value.idAutor),
      tipoPlan:     this.form.value.tipoPlan,
      duracionDias: Number(this.form.value.duracionDias),
      objetivo:     this.form.value.objetivo ?? '',
    };
    this.planService.insert(plan).subscribe({
      next: () => this.router.navigate(['/planes/listas']),
      error: () => { this.error = 'Error al registrar. Verifica los datos.'; },
    });
  }
}
