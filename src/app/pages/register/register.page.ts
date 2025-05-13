import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroServicio } from './register.servicio';
import { MapaSelectorComponent } from 'src/app/shared/mapa-selector/mapa-selector.component';
import { AlertaServicio } from 'src/app/services/alertas-errores.servicio';

@Component({ 
    selector:'app-register', 
    templateUrl:'./register.page.html', 
    styleUrls:['./register.page.scss']
})

export class RegisterPage implements OnInit, AfterViewInit {
  registroForm!: FormGroup;
  @ViewChild('mapaRegistro') mapaRegistro!: MapaSelectorComponent;

  constructor(
    private fb: FormBuilder,
    private registroServicio: RegistroServicio,
    private router: Router,
    private alerta: AlertaServicio
  ) {}

  ngOnInit() {
    this.inicializarFormulario();

    this.registroForm.get('tipoUsuario')?.valueChanges.subscribe(valor => {
      if (valor === 'prestador') {
        setTimeout(() => {
          if (this.mapaRegistro) {
            this.mapaRegistro.redibujarMapa();
          }
        }, 300);
      }
    });
  }

  ngAfterViewInit() {
    if (this.esPrestador() && this.mapaRegistro) {
      this.mapaRegistro.redibujarMapa();
    }
  }

  inicializarFormulario() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      numeroTelefonico: ['', Validators.required],
      categoriaIdentificador: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      ubicacion: this.fb.group({
        latitud: [''],
        longitud: [''],
        nombrePais: [''],
        nombreDepartamento: [''],
        nombreCiudad: [''],
        nombreCorregimiento: [''],
        detalleAdicional: [''],
        nombreVia: [''],
        numeroVia: [''],
        direccion: ['']
      })
    });
  }

  esPrestador(): boolean {
    return this.registroForm.get('tipoUsuario')?.value === 'prestador';
  }

  async registrar() {
    if (this.registroForm.invalid) {
      this.alerta.mostrarError({ message: 'Por favor completa todos los campos obligatorios.' });
      return;
    }

    const datos = this.registroForm.value;

    try {
      if (this.esPrestador()) {
        const ubicacionRes = await this.registroServicio.registrarUbicacion(datos.ubicacion).toPromise();
        const ubicacionId = ubicacionRes;
        const datosPrestador = {
          nombre: datos.nombre,
          usuario: datos.usuario,
          contrasena: datos.contrasena,
          numeroTelefonico: datos.numeroTelefonico,
          categoriaIdentificador: datos.categoriaIdentificador,
          numeroIdentificacion: datos.numeroIdentificacion,
          idUbicacion: ubicacionId
        };
        await this.registroServicio.registrarPrestador(datosPrestador).toPromise();
      } else {
        const datosSolicitante = {
          nombre: datos.nombre,
          usuario: datos.usuario,
          contrasena: datos.contrasena,
          numeroTelefonico: datos.numeroTelefonico,
          categoriaIdentificador: datos.categoriaIdentificador,
          numeroIdentificacion: datos.numeroIdentificacion
        };
        await this.registroServicio.registrarSolicitante(datosSolicitante).toPromise();
      }

      this.alerta.mostrarExito('Registro exitoso. Ahora puedes iniciar sesión.');
      this.router.navigateByUrl('/login')
      .then(() => {
      window.location.reload();
      });

    } catch (error) {
      this.alerta.mostrarError(error, 'Error al registrar');
    }
  }

  regresar() {
    this.router.navigateByUrl(`/login`)
    .then(() => {
    window.location.reload();
  });
  }
}