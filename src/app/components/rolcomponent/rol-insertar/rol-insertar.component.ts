import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from '../../../models/rol.model';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-rol-insertar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rol-insertar.component.html',
  styleUrl: './rol-insertar.component.css',
})
export class RolInsertarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Rol = { id: 0, nombre: '' };

  constructor(
    private rolService: RolService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.rol.nombre = this.form.value.nombre;
      this.rolService.insert(this.rol).subscribe({
        next: () => this.router.navigate(['/roles/listas']),
      });
    }
  }
}
