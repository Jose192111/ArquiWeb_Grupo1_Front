import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ingrediente } from '../../../models/ingrediente.model';
import { IngredienteService } from '../../../services/ingrediente.service';

@Component({
  selector: 'app-ingrediente-listar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './ingrediente-listar.component.html',
  styleUrl: './ingrediente-listar.component.css'
})
export class IngredienteListarComponent implements OnInit {
  ingredientes: Ingrediente[] = [];
  filtro = '';

  constructor(private ingredienteService: IngredienteService) { }

  ngOnInit(): void {
    this.cargarIngredientes();
  }

  cargarIngredientes(): void {
    this.ingredienteService.list().subscribe({
      next: (data) => {
        this.ingredientes = data.sort((a, b) => a.id - b.id);
      },
    });
  }

  ingredientesFiltrados(): Ingrediente[] {
    if (!this.filtro.trim()) return this.ingredientes;
    const term = this.filtro.toLowerCase();
    return this.ingredientes.filter(i =>
      i.nombre.toLowerCase().includes(term) ||
      i.unidadMedida.toLowerCase().includes(term)
    );
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este ingrediente?')) return;
    this.ingredienteService.delete(id).subscribe({
      next: () => this.cargarIngredientes(),
    });
  }
}