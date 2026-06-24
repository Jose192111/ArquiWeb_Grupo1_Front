import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlanMaestro } from '../../../models/plan-maestro.model';
import { PlanMaestroService } from '../../../services/plan-maestro.service';

@Component({
  selector: 'app-plan-maestro-actualizar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './plan-maestro-actualizar.component.html',
  styleUrl: './plan-maestro-actualizar.component.css',
})
export class PlanMaestroActualizarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  id = 0;
  error = '';

  constructor(
    private fb: FormBuilder,
    private planService: PlanMaestroService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      codigo:       [''],
      titulo:       ['', Validators.required],
      idAutor:      ['', [Validators.required, Validators.min(1)]],
      tipoPlan:     ['', Validators.required],
      duracionDias: ['', [Validators.required, Validators.min(1)]],
      objetivo:     [''],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  init(): void {
    this.planService.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo:       data.id,
        titulo:       data.titulo,
        idAutor:      data.idAutor,
        tipoPlan:     data.tipoPlan,
        duracionDias: data.duracionDias,
        objetivo:     data.objetivo,
      });
    });
  }

  aceptar(): void {
    if (this.form.invalid) return;
    const plan: PlanMaestro = {
      id:           this.form.value.codigo,
      titulo:       this.form.value.titulo,
      idAutor:      Number(this.form.value.idAutor),
      tipoPlan:     this.form.value.tipoPlan,
      duracionDias: Number(this.form.value.duracionDias),
      objetivo:     this.form.value.objetivo ?? '',
    };
    this.planService.update(plan).subscribe({
      next: () => this.router.navigate(['/planes/listas']),
      error: () => { this.error = 'Error al actualizar. Verifica los datos.'; },
    });
  }
}
