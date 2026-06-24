import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Recipe } from '../../../models/receta.model';
import { RecipeService } from '../../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receta-insertar',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule],
  templateUrl: './receta-insertar.component.html',
  styleUrl: './receta-insertar.component.css'
})
export class RecetaInsertarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  receta: Recipe = { id: 0, title: '', description: '', 
    idAutor: {id:0,username:'',email:'',contrasenaHash:'',nombre:'',apellido:'',idRol:{id:0,nombre:''},fechaRegistro:new Date(),ultimaActividad:new Date()}, 
    prepTimeMinutes: 0, difficulty: '', published: false, ultimaActualizacion: new Date(), 
    detalles: [{id:0,idReceta:0,idIngrediente:0,cantidad:0,esPaso:false,orden:0,contenido:''}] };

  constructor(
    private recetaService: RecipeService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      idAutor: ['', [Validators.required, Validators.min(1)]],
      prepTimeMinutes: ['', [Validators.required, Validators.min(0)]],
      difficulty: ['', Validators.required],
      published: [false, Validators.required],
      ultimaActualizacion: [new Date(), Validators.required],
      detalles: [[], Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.receta.title = this.form.value.title;
      this.receta.description = this.form.value.description;
      this.receta.idAutor = this.form.value.idAutor;
      this.receta.prepTimeMinutes = this.form.value.prepTimeMinutes;
      this.receta.difficulty = this.form.value.difficulty;
      this.receta.published = this.form.value.published;
      this.receta.ultimaActualizacion = this.form.value.ultimaActualizacion;
      this.receta.detalles = this.form.value.detalles;

      this.recetaService.insert(this.receta).subscribe({
        next: () => this.router.navigate(['/recetas/listas']),
      });
    }
  }
}

