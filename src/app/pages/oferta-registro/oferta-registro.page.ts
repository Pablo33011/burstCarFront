import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaServicio } from './oferta-registro.servicio';
import { StorageService } from 'src/app/shared/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-oferta',
  templateUrl: './oferta-registro.page.html',
  styleUrls: ['./oferta-registro.page.scss']
})
export class OfertaRegistroPage implements OnInit{
  ofertaForm: FormGroup;
  idServicio!: string;
  fechaActual: string = new Date().toISOString();
  fechaMinima: string = new Date().toISOString();


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private storageServicio: StorageService,
    private ofertaServicio: OfertaServicio
  ) {
    this.ofertaForm = this.fb.group({
      descripcion: ['', Validators.required],
      costo: ['', Validators.required],
      monedaServicio: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estadoOferta: ['Oferta nueva'],
      servicio: [''],
      prestadorServicioIdentificacion: [{ value: '', disabled: true }]
    });
  }

  ngOnInit() {
    this.idServicio = this.route.snapshot.paramMap.get('id')!;
    this.ofertaForm.patchValue({ servicio: this.idServicio });
    this.obtenerIdentificacion();
  }

  async obtenerIdentificacion() {
    const token = await this.storageServicio.obtener('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.ofertaForm.patchValue({
        prestadorServicioIdentificacion: payload.numeroIdentificacion
      });
    }
  }

  registrarOferta() {
    if (this.ofertaForm.valid) {
      const datos = this.ofertaForm.getRawValue();
  
      this.ofertaServicio.registrarOferta(datos).subscribe({
        next: (res) => {
          console.log('Oferta registrada con éxito:', res);
          this.router.navigateByUrl('/oferta/todas/' + this.idServicio)
          .then(() => {
          window.location.reload();
  });

        },
        error: (err) => {
          console.error('Error al registrar la oferta:', err);
        }
      });
    }
  }  

  regresar() {
    this.router.navigateByUrl(`/servicio/todos`)
    .then(() => {
    window.location.reload();
  });
  }

}
