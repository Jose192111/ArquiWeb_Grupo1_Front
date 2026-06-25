import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logincomponent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css',
})
export class Logincomponent implements OnInit {
  form: FormGroup = new FormGroup({});
  errorMensaje = '';
  ocultarPassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.invalid) return;
    const { username, password } = this.form.value;
    this.authService.login(username, password).subscribe({
      next: (resp) => {
        this.authService.guardarToken(resp.jwttoken);
        this.authService.guardarUsername(username);
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMensaje = 'Usuario o contraseña incorrectos.';
      },
    });
  }
}
