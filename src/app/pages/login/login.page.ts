import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServicio } from '../login/login.servicio';
import { Login } from './login';
import { StorageService } from 'src/app/shared/storage.service';
import { Geolocation } from '@capacitor/geolocation';
import { point, booleanPointInPolygon } from '@turf/turf';
import { RIONEGRO_POLIGONO } from '../../data/rionegro.poligono';
import { AlertaServicio } from 'src/app/services/alertas-errores.servicio';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginServicio: LoginServicio,
    private storageService: StorageService,
    private alerta: AlertaServicio
  ){
      this.loginForm = this.fb.group({
        usuario: ['', Validators.required],
        contrasena: ['', Validators.required],
        tipoUsuario: ['', Validators.required]
      });
      
  }

  private async validarLocalizacion(): Promise<boolean> {
    try {
      const { lat, lng } = await this.obtenerLocalizacionActual();
      //Se le debe poner la negación a esta validación para que el 
      // aplicativo no funcione si está fuera de Rioengro.
      //if (!this.dentroDeRionegro(lat, lng)) {
      //  this.alerta.mostrarError({ message: 'Debes estar dentro de Rionegro para iniciar sesión.' });
      //  return false;
      //}
      return true;
    } catch {
      this.alerta.mostrarError({ message: 'No se pudo obtener tu ubicación. Activa el GPS.' });
      return false;
    }
  }

  private async obtenerLocalizacionActual(): Promise<{ lat: number; lng: number }> {
    const pos = await Geolocation.getCurrentPosition();
    return { lat: pos.coords.latitude, lng: pos.coords.longitude };
  }

  private dentroDeRionegro(lat: number, lng: number): boolean {
    const pt = point([lng, lat]);
    return booleanPointInPolygon(pt, RIONEGRO_POLIGONO);
  }

  async checkToken() {
    const token = await this.storageService.obtener('token');
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.alerta.mostrarError({ message: 'Por favor completa todos los campos.' });
      return;
    }

    const ubicacionValida = await this.validarLocalizacion();
    if (!ubicacionValida) return;

    this.ejecutarLogin();
  }

  private ejecutarLogin() {
    const { usuario, contrasena, tipoUsuario } = this.loginForm.value;
    const cred: Login = { usuario, contrasena };

    const login$ =
      tipoUsuario === 'prestador'
        ? this.loginServicio.loginPrestador(cred)
        : this.loginServicio.loginSolicitante(cred);
        
        login$.subscribe({
          next: res => this.respuestaLoginExitoso(res),
          error: err => this.respuestaLoginFallido(err)
        });
  }

  private async respuestaLoginExitoso(res: any) {
    const token = res.valor;
    await this.storageService.cargar('token', token);

    const payload = JSON.parse(atob(token.split('.')[1]));
    if (['prestador', 'solicitante'].includes(payload.rol)) {

      this.router.navigateByUrl('/servicio/todos').then(() => {
        window.location.reload();
      });
    } else {
      this.alerta.mostrarError({ message: 'Rol desconocido.' });
    }
  }

  private respuestaLoginFallido(error: any) {
    const mensaje = error?.error?.message || 'Credenciales inválidas.';
    this.alerta.mostrarError({ message: mensaje });
  }

  async registrarse() {  
      if (!(await this.validarLocalizacion())) {
        return;
      }
  
      this.router.navigateByUrl('/registro').then(() => {
        window.location.reload();
      });
    }

  async logout() {
    await this.storageService.eliminar('token');
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }
}  