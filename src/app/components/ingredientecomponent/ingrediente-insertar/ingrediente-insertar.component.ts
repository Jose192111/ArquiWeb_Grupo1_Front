import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Ingrediente } from '../../../models/ingrediente.model';
import { IngredienteService } from '../../../services/ingrediente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingrediente-insertar',
  imports: [   
    CommonModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule],
  templateUrl: './ingrediente-insertar.component.html',
  styleUrl: './ingrediente-insertar.component.css'
})
export class IngredienteInsertarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  ingrediente: Ingrediente = { id: 0, nombre: '', unidadMedida: '', idEtiqueta: {id:0,nombre:'',grupo:''}, calorias100: 0, proteinas100: 0, carbos100: 0, grasas100: 0 };

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
      this.ingrediente.nombre = this.form.value.nombre;
      this.ingrediente.unidadMedida = this.form.value.unidadMedida;
      this.ingrediente.idEtiqueta = this.form.value.idEtiqueta;
      this.ingrediente.calorias100 = this.form.value.calorias100;
      this.ingrediente.proteinas100 = this.form.value.proteinas100;
      this.ingrediente.carbos100 = this.form.value.carbos100;
      this.ingrediente.grasas100 = this.form.value.grasas100;

      this.ingredienteService.insert(this.ingrediente).subscribe({
        next: () => this.router.navigate(['/ingredientes/listas']),
      });
    }
  }
}
