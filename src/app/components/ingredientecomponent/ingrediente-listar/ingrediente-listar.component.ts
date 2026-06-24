import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ingrediente } from '../../../models/ingrediente.model';
import { IngredienteService } from '../../../services/ingrediente.service';

@Component({
  selector: 'app-ingrediente-listar',
  imports: [CommonModule, RouterLink],
  templateUrl: './ingrediente-listar.component.html',
  styleUrl: './ingrediente-listar.component.css'
})
export class IngredienteListarComponent implements OnInit {
  ingredientes: Ingrediente[] = [];

  constructor(private IngredienteService: IngredienteService) { }

  ngOnInit(): void {
    this.cargarIngredientes();
  }

  cargarIngredientes(): void {
    this.IngredienteService.list().subscribe({
      next: (data) => {
        this.ingredientes = data;
      },
    });
  }

  eliminar(id: number): void {
    this.IngredienteService.delete(id).subscribe({
      next: () => this.cargarIngredientes(),
    });
  }
}

