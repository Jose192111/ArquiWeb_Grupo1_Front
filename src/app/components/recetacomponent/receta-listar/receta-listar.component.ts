import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../models/receta.model';

@Component({
  selector: 'app-receta-listar',
  imports: [CommonModule, RouterLink],
  templateUrl: './receta-listar.component.html',
  styleUrl: './receta-listar.component.css'
})
export class RecetaListarComponent implements OnInit {
  recetas: Recipe[] = [];

  constructor(private RecetaService: RecipeService) { }

  ngOnInit(): void {
    this.cargarRecetas();
  }

  cargarRecetas(): void {
    this.RecetaService.list().subscribe({
      next: (data) => {
        this.recetas = data;
      },
    });
  }

  eliminar(id: number): void {
    this.RecetaService.delete(id).subscribe({
      next: () => this.cargarRecetas(),
    });
  }
}
