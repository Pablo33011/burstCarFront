import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalificacionRegistroServicio } from './calificacion-registro.servicio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calificacion-registro',
  templateUrl: './calificacion-registro.page.html',
  styleUrls: ['./calificacion-registro.page.scss']
})
export class CalificacionRegistroPage implements OnInit{

  calificacionForm: FormGroup;
  idPrestador: string = '';
  estrellas = [1, 2, 3, 4, 5]; 
  
  constructor(
    private fb: FormBuilder,
    private calificacionServicio: CalificacionRegistroServicio,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.calificacionForm = this.fb.group({
      valor: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comentario: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.idPrestador = this.route.snapshot.paramMap.get('id')!;
  }

  async registrarCalificacion() {
    if (this.calificacionForm.invalid) {
      this.calificacionForm.markAllAsTouched();
      return;
    }

    const datosCalificacion = this.calificacionForm.value;

    this.calificacionServicio.registrarCalificacion(datosCalificacion, this.idPrestador)
      .subscribe({
        next: (res) => {
          console.log('Calificación registrada:', res);
          this.router.navigateByUrl(`/prestador/${this.idPrestador}`)
          .then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          console.error('Error al registrar calificación:', err);
        }
      });
  }
  
  seleccionarEstrella(valor: number) {
    this.calificacionForm.patchValue({ valor });
  }

}
