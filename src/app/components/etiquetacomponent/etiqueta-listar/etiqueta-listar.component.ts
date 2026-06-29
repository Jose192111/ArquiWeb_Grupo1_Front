import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Etiqueta } from '../../../models/etiqueta.model';
import { EtiquetaService } from '../../../services/etiqueta.service';

@Component({
  selector: 'app-etiqueta-listar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './etiqueta-listar.component.html',
  styleUrl: './etiqueta-listar.component.css',
})
export class EtiquetaListarComponent implements OnInit {
  etiquetas: Etiqueta[] = [];
  filtro = '';

  constructor(private etiquetaService: EtiquetaService) {}

  ngOnInit(): void { this.cargarEtiquetas(); }

  cargarEtiquetas(): void {
    this.etiquetaService.list().subscribe({
      next: (data) => {
        this.etiquetas = data.sort((a, b) => a.id - b.id);
      },
    });
  }

  etiquetasFiltradas(): Etiqueta[] {
    if (!this.filtro.trim()) return this.etiquetas;
    const term = this.filtro.toLowerCase();
    return this.etiquetas.filter((e) =>
      e.nombre.toLowerCase().includes(term) || e.grupo.toLowerCase().includes(term)
    );
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar esta etiqueta?')) return;
    this.etiquetaService.delete(id).subscribe({ next: () => this.cargarEtiquetas() });
  }
}
