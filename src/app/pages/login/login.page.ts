import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServicio } from '../login/login.servicio';
import { Login } from './login';
import { StorageService } from 'src/app/shared/storage.service';
import { Geolocation } from '@capacitor/geolocation';
import { point, booleanPointInPolygon } from '@turf/turf';
import { RIONEGRO_POLIGONO } from '../../data/rionegro.poligono';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private loginServicio: LoginServicio,
    private storageService: StorageService){
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
      /*if (this.dentroDeRionegro(lat, lng)) {
        this.agregarError('Debes estar dentro de Rionegro para iniciar sesión.');
        return false;
      }*/
      return true;
    } catch {
      this.agregarError('No se pudo obtener tu ubicación. Activa el GPS.');
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

  //Vañidar token
  async checkToken() {
    const token = await this.storageService.obtener('token');
    console.log('Token guardado:', token);
  }

  async onSubmit() {
    this.LimpiarErrores();
    if (!this.loginForm.valid) {
      return this.agregarError('Por favor completa todos los campos.');
    }
    if (!(await this.validarLocalizacion())) {
      return;
    }

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
      next: res   => this.respuestaLoginExitoso(res),
      error: ()   => this.respuestaLoginFallido()
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
      this.agregarError('Rol desconocido.');
    }
  }

  private respuestaLoginFallido() {
    this.agregarError('Credenciales inválidas.');
  }

  private LimpiarErrores() {
    this.errorMessage = '';
  }
  private agregarError(msg: string) {
    this.errorMessage = msg;
  }

  async registrarse() {
      this.LimpiarErrores();
  
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