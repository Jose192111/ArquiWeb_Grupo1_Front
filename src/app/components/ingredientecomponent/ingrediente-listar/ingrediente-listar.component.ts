import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ingrediente } from '../../../models/ingrediente.model';
import { IngredienteService } from '../../../services/ingrediente.service';

// 🔥 Importaciones para el gráfico
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-ingrediente-listar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, BaseChartDirective],
  templateUrl: './ingrediente-listar.component.html',
  styleUrl: './ingrediente-listar.component.css'
})
export class IngredienteListarComponent implements OnInit {
  ingredientes: Ingrediente[] = [];
  filtro = '';

  hasChartData = false;
  
  // 🔥 1. Altura libre y leyenda a la derecha para llenar el espacio horizontal
  chartOptions: ChartOptions = { 
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right' // Coloca los nombres a la derecha del círculo
      }
    }
  };
  
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];
  
  // 🔥 2. Cambiamos el tipo de gráfico a Doughnut (Dona)
  chartType: ChartType = 'doughnut'; 

  constructor(private ingredienteService: IngredienteService) { }

  ngOnInit(): void {
    this.cargarIngredientes();
    this.cargarGrafico(); 
  }

  cargarIngredientes(): void {
    this.ingredienteService.list().subscribe({
      next: (data) => {
        this.ingredientes = data.sort((a, b) => a.id - b.id);
      },
    });
  }

  cargarGrafico(): void {
    this.ingredienteService.getReporteUso().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.hasChartData = true;
          this.chartLabels = data.map((d: any) => d.nombreIngrediente);
          this.chartData = [
            {
              data: data.map((d: any) => d.vecesUsado), 
              label: 'Veces utilizado en recetas',
              // 🔥 3. Paleta de colores para que cada ingrediente resalte
              backgroundColor: [
                '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
                '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#64748b'
              ] 
            }
          ];
        }
      }
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
      next: () => {
        this.cargarIngredientes();
        this.cargarGrafico(); 
      }
    });
  }
}