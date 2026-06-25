import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../../../models/receta.model';
import { RecipeService } from '../../../services/recipe.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-receta-insertar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './receta-insertar.component.html',
  styleUrl: './receta-insertar.component.css'
})
export class RecetaInsertarComponent implements OnInit {
  form: FormGroup = new FormGroup({});

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
      published: [false], 
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      // Armamos el objeto para enviar al backend
      const receta: Recipe = {
        id: 0,
        title: this.form.value.title,
        description: this.form.value.description,
        idAutor: this.form.value.idAutor,
        prepTimeMinutes: this.form.value.prepTimeMinutes,
        difficulty: this.form.value.difficulty,
        published: this.form.value.published,
        ultimaActualizacion: new Date(), // Se envía la fecha actual automáticamente
        detalles: [] // Nace sin detalles en este formulario inicial
      };

      this.recetaService.insert(receta).subscribe({
        next: () => this.router.navigate(['/recetas/listas']),
      });
    }
  }
}