import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../models/receta.model';

// 🔥 Importaciones para el gráfico
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-receta-listar',
  standalone: true,
  // 🔥 No olvides agregar BaseChartDirective a los imports
  imports: [CommonModule, RouterLink, FormsModule, BaseChartDirective],
  templateUrl: './receta-listar.component.html',
  styleUrl: './receta-listar.component.css'
})
export class RecetaListarComponent implements OnInit {
  recetas: Recipe[] = [];
  filtro = '';

  // 🔥 Variables del gráfico
  hasChartData = false;
  chartOptions: ChartOptions = { 
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Oculta el cuadro "Total de Recetas"
      }
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1, // Obliga a que los saltos sean de 1 en 1
          precision: 0 // Evita decimales como 1.5 o 2.5
        }
      }
    }
  };
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];
  chartType: ChartType = 'bar'; // Usaremos gráfico de barras

  constructor(private recetaService: RecipeService) { }

  ngOnInit(): void {
    this.cargarRecetas();
    this.cargarGrafico(); // Llamamos a cargar el gráfico al iniciar
  }

  cargarRecetas(): void {
    this.recetaService.list().subscribe({
      next: (data) => {
        this.recetas = data.sort((a, b) => a.id - b.id);
      },
    });
  }

  // ... (tu código intermedio se queda igual)

  // 🔥 2. Actualizamos la función para ordenar los datos lógicamente
  cargarGrafico(): void {
    this.recetaService.getEstadisticasDificultad().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          
          // A. Creamos un mapa de peso para ordenar (1 es primero, 3 es último)
          const ordenDificultad: { [key: string]: number } = {
            'Fácil': 1,
            'Media': 2,
            'Difícil': 3
          };

          // B. Ordenamos la data que vino de Java basándonos en nuestro mapa
          data.sort((a: any, b: any) => {
            const pesoA = ordenDificultad[a.dificultad] || 4;
            const pesoB = ordenDificultad[b.dificultad] || 4;
            return pesoA - pesoB;
          });

          // C. Continuamos normalmente, pero ahora la data ya está ordenada
          this.hasChartData = true;
          this.chartLabels = data.map((d: any) => d.dificultad);
          
          const coloresPorDificultad: { [key: string]: string } = {
            'Fácil': '#10b981',
            'Media': '#f59e0b',
            'Difícil': '#ef4444'
          };

          const coloresDinamicos = this.chartLabels.map(label => coloresPorDificultad[label] || '#6b7280');

          this.chartData = [
            {
              data: data.map((d: any) => d.totalRecetas),
              label: 'Total de Recetas', 
              backgroundColor: coloresDinamicos 
            }
          ];
        }
      }
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
      next: () => {
        this.cargarRecetas();
        this.cargarGrafico(); // Actualizamos el gráfico si borramos una receta
      }
    });
  }
}