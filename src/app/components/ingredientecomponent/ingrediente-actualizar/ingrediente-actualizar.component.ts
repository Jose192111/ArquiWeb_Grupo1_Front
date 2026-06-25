import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ingrediente } from '../../../models/ingrediente.model';
import { IngredienteService } from '../../../services/ingrediente.service';

@Component({
  selector: 'app-ingrediente-actualizar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ingrediente-actualizar.component.html',
  styleUrl: './ingrediente-actualizar.component.css'
})
export class IngredienteActualizarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  id: number = 0;

  constructor(
    private ingredienteService: IngredienteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      unidadMedida: ['', Validators.required],
      idEtiqueta: ['', [Validators.required, Validators.min(1)]],
      calorias100: ['', [Validators.required, Validators.min(0)]],
      proteinas100: ['', [Validators.required, Validators.min(0)]],
      carbos100: ['', [Validators.required, Validators.min(0)]],
      grasas100: ['', [Validators.required, Validators.min(0)]],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  init(): void {
    this.ingredienteService.listId(this.id).subscribe((data) => {
      // Extraemos el id de forma segura por si viene nulo
      const etiquetaId = data.idEtiqueta ? data.idEtiqueta.id : '';

      this.form.patchValue({
        codigo: data.id,
        nombre: data.nombre,
        unidadMedida: data.unidadMedida,
        idEtiqueta: etiquetaId, 
        calorias100: data.calorias100,
        proteinas100: data.proteinas100,
        carbos100: data.carbos100,
        grasas100: data.grasas100,
      });
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const ingredienteActualizado: Ingrediente = {
        id: this.form.value.codigo,
        nombre: this.form.value.nombre,
        unidadMedida: this.form.value.unidadMedida,
        idEtiqueta: { id: this.form.value.idEtiqueta, nombre: '', grupo: '' },
        calorias100: this.form.value.calorias100,
        proteinas100: this.form.value.proteinas100,
        carbos100: this.form.value.carbos100,
        grasas100: this.form.value.grasas100
      };

      this.ingredienteService.update(ingredienteActualizado).subscribe({
        next: () => this.router.navigate(['/ingredientes/listas']),
      });
    }
  }
}