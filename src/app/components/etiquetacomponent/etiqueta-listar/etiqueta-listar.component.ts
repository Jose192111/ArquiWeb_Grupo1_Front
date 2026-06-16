import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Etiqueta } from '../../../models/etiqueta.model';
import { EtiquetaService } from '../../../services/etiqueta.service';

@Component({
  selector: 'app-etiqueta-listar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './etiqueta-listar.component.html',
  styleUrl: './etiqueta-listar.component.css',
})
export class EtiquetaListarComponent implements OnInit {
  etiquetas: Etiqueta[] = [];

  constructor(private etiquetaService: EtiquetaService) { }

  ngOnInit(): void {
    this.cargarEtiquetas();
  }

  cargarEtiquetas(): void {
    this.etiquetaService.list().subscribe({
      next: (data) => {
        this.etiquetas = data;
      },
    });
  }

  eliminar(id: number): void {
    this.etiquetaService.delete(id).subscribe({
      next: () => this.cargarEtiquetas(),
    });
  }
}
