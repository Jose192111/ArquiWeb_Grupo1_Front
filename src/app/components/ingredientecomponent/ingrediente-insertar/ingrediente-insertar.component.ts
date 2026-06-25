import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ingrediente } from '../../../models/ingrediente.model';
import { IngredienteService } from '../../../services/ingrediente.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ingrediente-insertar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ingrediente-insertar.component.html',
  styleUrl: './ingrediente-insertar.component.css'
})
export class IngredienteInsertarComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private ingredienteService: IngredienteService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      unidadMedida: ['', Validators.required],
      idEtiqueta: ['', [Validators.required, Validators.min(1)]],
      calorias100: ['', [Validators.required, Validators.min(0)]],
      proteinas100: ['', [Validators.required, Validators.min(0)]],
      carbos100: ['', [Validators.required, Validators.min(0)]],
      grasas100: ['', [Validators.required, Validators.min(0)]],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      // Formamos el objeto completo, transformando el id de la etiqueta al objeto que espera tu BD
      const ingrediente: Ingrediente = {
        id: 0,
        nombre: this.form.value.nombre,
        unidadMedida: this.form.value.unidadMedida,
        idEtiqueta: { id: this.form.value.idEtiqueta, nombre: '', grupo: '' },
        calorias100: this.form.value.calorias100,
        proteinas100: this.form.value.proteinas100,
        carbos100: this.form.value.carbos100,
        grasas100: this.form.value.grasas100
      };

      this.ingredienteService.insert(ingrediente).subscribe({
        next: () => this.router.navigate(['/ingredientes/listas']),
      });
    }
  }
}