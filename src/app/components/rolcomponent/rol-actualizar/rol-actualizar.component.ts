import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Rol } from '../../../models/rol.model';
import { RolService } from '../../../services/rol.service';

@Component({
    selector: 'app-rol-actualizar',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './rol-actualizar.component.html',
    styleUrl: './rol-actualizar.component.css',
})
export class RolActualizarComponent implements OnInit {
    form: FormGroup = new FormGroup({});
    rol: Rol = { id: 0, nombre: '' };
    id = 0;

    constructor(
        private rolService: RolService,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            codigo: [''],
            nombre: ['', Validators.required],
        });

        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.init();
        });
    }

    aceptar(): void {
        if (this.form.valid) {
            this.rol.id = this.form.value.codigo;
            this.rol.nombre = this.form.value.nombre;

            this.rolService.update(this.rol).subscribe({
                next: () => this.router.navigate(['/roles/listas']),
            });
        }
    }

    init(): void {
        this.rolService.listId(this.id).subscribe((data) => {
            this.form.patchValue({
                codigo: data.id,
                nombre: data.nombre,
            });
        });
    }
}
