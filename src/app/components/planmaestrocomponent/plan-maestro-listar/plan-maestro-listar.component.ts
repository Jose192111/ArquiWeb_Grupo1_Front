import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlanMaestro } from '../../../models/plan-maestro.model';
import { PlanMaestroService } from '../../../services/plan-maestro.service';

@Component({
  selector: 'app-plan-maestro-listar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './plan-maestro-listar.component.html',
  styleUrl: './plan-maestro-listar.component.css',
})
export class PlanMaestroListarComponent implements OnInit {
  planes: PlanMaestro[] = [];
  filtro = '';

  constructor(private planService: PlanMaestroService) {}

  ngOnInit(): void {
    this.cargarPlanes();
  }

  cargarPlanes(): void {
    this.planService.list().subscribe({
      next: (data) => { this.planes = data; },
    });
  }

  planesFiltrados(): PlanMaestro[] {
    if (!this.filtro.trim()) return this.planes;
    const term = this.filtro.toLowerCase();
    return this.planes.filter(p =>
      p.titulo.toLowerCase().includes(term) ||
      p.tipoPlan.toLowerCase().includes(term)
    );
  }

  badgeClass(tipo: string): string {
    const map: Record<string, string> = {
      alimenticio: 'kh-badge-green',
      ejercicio:   'kh-badge-purple',
      hibrido:     'kh-badge-yellow',
    };
    return map[tipo] ?? 'kh-badge-green';
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este plan maestro?')) return;
    this.planService.delete(id).subscribe({
      next: () => this.cargarPlanes(),
    });
  }
}
