import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Etiqueta } from '../../../models/etiqueta.model';
import { EtiquetaService } from '../../../services/etiqueta.service';

@Component({
  selector: 'app-etiqueta-actualizar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './etiqueta-actualizar.component.html',
  styleUrl: './etiqueta-actualizar.component.css',
})
export class EtiquetaActualizarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  etiqueta: Etiqueta = { id: 0, nombre: '', grupo: '' };
  id = 0;

  constructor(
    private etiquetaService: EtiquetaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      grupo: ['', Validators.required],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.etiqueta.id = this.form.value.codigo;
      this.etiqueta.nombre = this.form.value.nombre;
      this.etiqueta.grupo = this.form.value.grupo;

      this.etiquetaService.update(this.etiqueta).subscribe({
        next: () => this.router.navigate(['/etiquetas/listas']),
      });
    }
  }

  init(): void {
    this.etiquetaService.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        nombre: data.nombre,
        grupo: data.grupo,
      });
    });
  }
}
