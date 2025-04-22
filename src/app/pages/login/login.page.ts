import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServicio } from '../login/login.servicio';
import { Storage } from '@ionic/storage-angular';
import { Login } from './login';
import { StorageService } from 'src/app/shared/storage.service';


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

  //Vañidar token
  async checkToken() {
    const token = await this.storageService.obtener('token');
    console.log('Token guardado:', token);
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { usuario, contrasena, tipoUsuario } = this.loginForm.value;
      const credenciales : Login= { usuario, contrasena };

    let loginObservable;

    if (tipoUsuario === 'prestador') {
      loginObservable = this.loginServicio.loginPrestador(credenciales);
    } else {
      loginObservable = this.loginServicio.loginSolicitante(credenciales);
    }
    
    loginObservable.subscribe({
      next: async (res: any) => {
        const token = res.valor;
        await this.storageService.cargar('token', token);

        const payload = JSON.parse(atob(token.split('.')[1]));

        if (payload.rol === 'prestador') {
          this.router.navigateByUrl('/servicio/todos');
        } else if (payload.rol === 'solicitante') {
          //this.router.navigateByUrl('/solicitante-dashboard');
        } else {
          this.errorMessage = 'Rol desconocido.';
        }
      },
      error: () => {
        this.errorMessage = 'Credenciales inválidas.';
      }
    });
    } else {
      this.errorMessage = 'Por favor complete todos los campos.';
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register')
  }

  async logout() {
    await this.storageService.eliminar('token');
    this.router.navigateByUrl('/login');
  }
}  