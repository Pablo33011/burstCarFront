import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioRegistro } from './servicio-registro.servicio';
import { ViewChild } from '@angular/core';
import { MapaSelectorComponent } from '../../shared/mapa-selector/mapa-selector.component';


@Component({
  selector: 'app-servicio-regsistro',
  templateUrl: './servicio-registro.page.html',
  styleUrls: ['./servicio-registro.page.scss']
})
export class RegistroServicioPage implements OnInit {

  @ViewChild('mapaOrigen') mapaOrigen!: MapaSelectorComponent;
  @ViewChild('mapaDestino') mapaDestino!: MapaSelectorComponent;

  servicioForm: FormGroup;
  pasoActual: number = 1;

  constructor(
    private fb: FormBuilder,
    private servicioServicio: ServicioRegistro,
    private router: Router,
    private storageServicio: StorageService
  ) {
    this.servicioForm = this.fb.group({
      descripcion: ['', Validators.required],
      identificaionSolicitante: ['', Validators.required],
      tipoServicio: ['', Validators.required],
      costoInicial: ['', Validators.required],
      moneda: ['', Validators.required],

    
      UbicacionOrigenServicio: this.fb.group({
        numeroVia: ['', Validators.required],
        direccion: ['', Validators.required],
        latitud: ['', Validators.required],
        longitud: ['', Validators.required],
        detalleAdicional: [''],
        nombrePais: ['', Validators.required],
        nombreDepartamento: ['', Validators.required],
        nombreCiudad: ['', Validators.required],
        nombreCorregimiento: [''],
        nombreVia: ['', Validators.required],
      }),


      destinatario: this.fb.group({
        nombreDestinatario: ['', Validators.required],
        numeroIdentificacion: ['', Validators.required]
      }),
      destinoUbicacion: this.fb.group({
        numeroVia: ['', Validators.required],
        direccion: ['', Validators.required],
        latitud: ['', Validators.required],
        longitud: ['', Validators.required],
        detalleAdicional: [''],
        nombrePais: ['', Validators.required],
        nombreDepartamento: ['', Validators.required],
        nombreCiudad: ['', Validators.required],
        nombreCorregimiento: [''],
        nombreVia: ['', Validators.required],
      })
    });
  }

  ngOnInit() {
    this.obtenerIdentificacion();
  }

  async obtenerIdentificacion() {
    const token = await this.storageServicio.obtener('token');
    console.log('Token obtenido:', token);
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.servicioForm.patchValue({
        identificaionSolicitante: payload.numeroIdentificacion
      });
    }
  }

  siguientePaso() {
    if (this.pasoActual < 4) {
      this.pasoActual++;
  
      if (this.pasoActual === 2 && this.mapaOrigen) {
        this.mapaOrigen.redibujarMapa();
      }
  
      if (this.pasoActual === 4 && this.mapaDestino) {
        this.mapaDestino.redibujarMapa();
      }
    }
  }
  
  anteriorPaso() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }

  async registrar() {
    const datos = this.servicioForm.value;
  
    try {
      const ubicacionOrigenRes = await this.servicioServicio.registrarUbicacion(datos.UbicacionOrigenServicio).toPromise();
      const idUbicacionOrigen = ubicacionOrigenRes;
  
      const ubicacionDestinoRes = await this.servicioServicio.registrarUbicacion(datos.destinoUbicacion).toPromise();
      const idUbicacionDestino = ubicacionDestinoRes;
  
      const destinoRes = await this.servicioServicio.registrarDestino({
        nombreDestinatario: datos.destinatario.nombreDestinatario,
        numeroIdentificacion: datos.destinatario.numeroIdentificacion,
        ubicacionId: idUbicacionDestino
      }).toPromise();
  
      const idDestino = destinoRes;
  
      const servicioRes = await this.servicioServicio.registrarServicio({
        descripcion: datos.descripcion,
        identificaionSolicitante: datos.identificaionSolicitante,
        tipoServicio: datos.tipoServicio,
        estadoServicio: 'Borrador',
        ubicacion: idUbicacionOrigen,
        destino: idDestino,
        costoInicial: datos.costoInicial,
        moneda: datos.moneda
      }).toPromise();
  
      console.log('Servicio registrado con ID:', servicioRes);
      this.router.navigateByUrl('/servicio/todos');
  
    } catch (error) {
      console.error('Error al registrar servicio:', error);
    }
  }  
}