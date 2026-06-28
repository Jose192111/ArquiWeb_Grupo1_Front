import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../models/receta.model';

@Component({
  selector: 'app-receta-listar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './receta-listar.component.html',
  styleUrl: './receta-listar.component.css'
})
export class RecetaListarComponent implements OnInit {
  recetas: Recipe[] = [];
  filtro = '';

  constructor(private recetaService: RecipeService) { }

  ngOnInit(): void {
    this.cargarRecetas();
  }

  cargarRecetas(): void {
    this.recetaService.list().subscribe({
      next: (data) => {
        this.recetas = data.sort((a, b) => a.id - b.id);
      },
    });
  }

  recetasFiltradas(): Recipe[] {
    if (!this.filtro.trim()) return this.recetas;
    const term = this.filtro.toLowerCase();
    return this.recetas.filter(r =>
      r.title.toLowerCase().includes(term) ||
      r.difficulty.toLowerCase().includes(term)
    );
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar esta receta?')) return;
    this.recetaService.delete(id).subscribe({
      next: () => this.cargarRecetas(),
    });
  }
}