import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs'; // 🔥 Herramienta clave para el reordenamiento
import { Ingrediente } from '../../models/ingrediente.model';
import { RecipeService } from '../../services/recipe.service';
import { IngredienteService } from '../../services/ingrediente.service';
import { RecetaDetalleService } from '../../services/receta-detalle.service';



@Component({
  selector: 'app-receta-detalles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recetadetallecomponent.component.html',
  styleUrl: './recetadetallecomponent.component.css'
})
export class RecetaDetallesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  idReceta: number = 0;
  recetaTitulo: string = 'Cargando...';
  detalles: any[] = [];
  ingredientesDisponibles: Ingrediente[] = [];

  constructor(
    private recipeService: RecipeService,
    private ingredienteService: IngredienteService,
    private recetaDetalleService: RecetaDetalleService, 
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      esPaso: [false],
      idIngrediente: [''],
      cantidad: [''],
      contenido: ['']
    });

    // Validaciones Dinámicas: Evita enviar formularios vacíos.
    // Aunque la UI muestra todo junto, Angular te obliga a llenar lo que marques.
    this.form.get('esPaso')?.valueChanges.subscribe(esPaso => {
      if (esPaso) {
        this.form.get('contenido')?.setValidators([Validators.required]);
        this.form.get('idIngrediente')?.clearValidators();
        this.form.get('cantidad')?.clearValidators();
      } else {
        this.form.get('contenido')?.clearValidators();
        this.form.get('idIngrediente')?.setValidators([Validators.required]);
        this.form.get('cantidad')?.setValidators([Validators.required, Validators.min(0.1)]);
      }
      this.form.get('contenido')?.updateValueAndValidity();
      this.form.get('idIngrediente')?.updateValueAndValidity();
      this.form.get('cantidad')?.updateValueAndValidity();
    });

    this.cargarIngredientes();
    
    this.route.params.subscribe((params: Params) => {
      this.idReceta = params['id'];
      this.cargarDetallesReceta();
    });
  }

  cargarIngredientes() {
    this.ingredienteService.list().subscribe(data => this.ingredientesDisponibles = data);
  }

  cargarDetallesReceta() {
    this.recipeService.listId(this.idReceta).subscribe((data: any) => {
      this.recetaTitulo = data.title;
      this.detalles = data.items || [];
    });
  }

  agregarDetalle() {
    if (this.form.invalid) return;

    const siguienteOrden = this.detalles.length > 0 
      ? Math.max(...this.detalles.map(d => d.orden)) + 1 : 1;


    const payload = {
      idReceta: Number(this.idReceta),
      esPaso: this.form.value.esPaso,
      idIngrediente: this.form.value.esPaso ? null : Number(this.form.value.idIngrediente),
      cantidad: this.form.value.esPaso ? null : Number(this.form.value.cantidad),
      orden: siguienteOrden,
      contenido: this.form.value.esPaso ? this.form.value.contenido : null
    };

    this.recetaDetalleService.insert(payload as any).subscribe({
      next: () => {
        this.cargarDetallesReceta(); 
        this.form.patchValue({ idIngrediente: '', cantidad: '', contenido: '' }); 
      },
      error: (err) => alert("Error al guardar. Verifica la consola.")
    });
  }


  mover(index: number, direccion: number) {
    const targetIndex = index + direccion;
    if (targetIndex < 0 || targetIndex >= this.detalles.length) return;

    const actual = this.detalles[index];
    const vecino = this.detalles[targetIndex];


    const tempOrden = actual.orden;
    actual.orden = vecino.orden;
    vecino.orden = tempOrden;


    forkJoin([
      this.recetaDetalleService.actualizarOrden(actual.id, actual.orden),
      this.recetaDetalleService.actualizarOrden(vecino.id, vecino.orden)
    ]).subscribe(() => this.cargarDetallesReceta());
  }

  eliminar(detalleId: number) {
    if(!confirm('¿Eliminar este ítem de la receta?')) return;
    
    this.recetaDetalleService.delete(detalleId).subscribe({
      next: () => {
        // 1. Simulamos cómo queda la lista sin el ítem borrado
        let restantes = this.detalles.filter(d => d.id !== detalleId);
        
        // 2. Les asignamos un nuevo orden perfectamente secuencial (1, 2, 3...)
        restantes = restantes.map((d, index) => {
           d.orden = index + 1; 
           return d;
        });

        // 3. Preparamos todas las peticiones de actualización
        const peticiones = restantes.map(d => this.recetaDetalleService.actualizarOrden(d.id, d.orden));

        // 4. Si hay ítems que actualizar, las mandamos todas a la vez
        if(peticiones.length > 0) {
           forkJoin(peticiones).subscribe(() => this.cargarDetallesReceta());
        } else {
           this.cargarDetallesReceta(); // Si borramos el último ítem, solo recargamos
        }
      }
    });
  }
}