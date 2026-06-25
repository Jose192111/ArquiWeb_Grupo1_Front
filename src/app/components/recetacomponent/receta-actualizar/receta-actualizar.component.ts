import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../../../models/receta.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-receta-actualizar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './receta-actualizar.component.html',
  styleUrl: './receta-actualizar.component.css'
})
export class RecetaActualizarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  id: number = 0;
  // Guardamos los detalles originales para no perderlos al actualizar
  detallesOriginales: any[] = []; 

  constructor(
    private recetaService: RecipeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      idAutor: ['', [Validators.required, Validators.min(1)]],
      prepTimeMinutes: ['', [Validators.required, Validators.min(0)]],
      difficulty: ['', Validators.required],
      published: [false],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  init(): void {
    this.recetaService.listId(this.id).subscribe((data) => {
      // Extraemos el id del autor de forma segura
      const autorId = data.idAutor ? data.idAutor.id : '';
      this.detallesOriginales = data.detalles || [];

      this.form.patchValue({
        codigo: data.id,
        title: data.title,
        description: data.description,
        idAutor: data.idAutor,
        prepTimeMinutes: data.prepTimeMinutes,
        difficulty: data.difficulty,
        published: data.published,
      });
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const recetaActualizada: Recipe = {
        id: this.form.value.codigo,
        title: this.form.value.title,
        description: this.form.value.description,
        idAutor: this.form.value.idAutor,
        prepTimeMinutes: this.form.value.prepTimeMinutes,
        difficulty: this.form.value.difficulty,
        published: this.form.value.published,
        ultimaActualizacion: new Date(), // Se actualiza la fecha a hoy
        detalles: this.detallesOriginales // Mantenemos los detalles que ya tenía
      };

      this.recetaService.update(recetaActualizada).subscribe({
        next: () => this.router.navigate(['/recetas/listas']),
      });
    }
  }
}