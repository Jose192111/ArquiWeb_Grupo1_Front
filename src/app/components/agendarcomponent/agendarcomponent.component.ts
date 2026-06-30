import { ChangeDetectorRef, Component } from '@angular/core';
import { calendarioService } from '../../services/calendario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebarcomponent/sidebar.component';

@Component({
  selector: 'app-agendar', // Verifica que este selector coincida con el que generó Angular
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './agendarcomponent.component.html', // Verifica que el nombre del archivo coincida
  styleUrl: './agendarcomponent.component.css' // Verifica que el nombre del archivo coincida
})
export class AgendarcomponentComponent {
  fechaInicio: string = '';
  rolSeleccionado: string = 'Entrenador'; // Valor por defecto
  citaAgendada: any;

  constructor(private calendarioService: calendarioService, private cdr: ChangeDetectorRef) { }

  agendarCita(): void {
    if (!this.fechaInicio) return;

    const inicio = new Date(this.fechaInicio);
    const fin = new Date(inicio.getTime() + 30 * 60000); 

    // Ahora enviamos también el rol seleccionado
    this.calendarioService.crearCita(inicio.toISOString(), fin.toISOString(), this.rolSeleccionado).subscribe({
      next: (data) => {
        this.citaAgendada = {
          linkMeet: data.hangoutLink,
          id: data.id,
          estado: data.status
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Detalle del error:', err);
        alert('Hubo un error al agendar.');
      }
    });
  }
}