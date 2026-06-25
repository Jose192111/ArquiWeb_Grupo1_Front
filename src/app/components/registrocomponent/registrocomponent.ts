import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registrocomponent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registrocomponent.html',
  styleUrl: './registrocomponent.css',
})
export class Registrocomponent implements OnInit {
  form: FormGroup = new FormGroup({});
  ocultarPassword = true;
  errorMensaje = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre:        ['', Validators.required],
      apellido:      ['', Validators.required],
      username:      ['', Validators.required],
      email:         ['', [Validators.required, Validators.email]],
      contrasenaHash:['', [Validators.required, Validators.minLength(6)]],
    });
  }

  aceptar(): void {
    if (this.form.invalid) return;
    const datos = { ...this.form.value, idRol: 1 };
    this.authService.register(datos).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMensaje = 'El usuario o email ya existe.';
      },
    });
  }
}
