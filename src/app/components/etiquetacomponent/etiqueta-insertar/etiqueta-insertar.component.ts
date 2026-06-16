import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Etiqueta } from '../../../models/etiqueta.model';
import { EtiquetaService } from '../../../services/etiqueta.service';

@Component({
  selector: 'app-etiqueta-insertar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './etiqueta-insertar.component.html',
  styleUrl: './etiqueta-insertar.component.css',
})
export class EtiquetaInsertarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  etiqueta: Etiqueta = { id: 0, nombre: '', grupo: '' };

  constructor(
    private etiquetaService: EtiquetaService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      grupo: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.etiqueta.nombre = this.form.value.nombre;
      this.etiqueta.grupo = this.form.value.grupo;
      this.etiquetaService.insert(this.etiqueta).subscribe({
        next: () => this.router.navigate(['/etiquetas/listas']),
      });
    }
  }
}
