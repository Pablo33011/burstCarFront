import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServicio } from '../login/login.servicio';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(private fb: FormBuilder, private router: Router, private loginServicio: LoginServicio,
    private storage: Storage){
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  //Vañidar token
  async checkToken() {
    const token = await this.storage.get('token');
    console.log('Token guardado:', token);
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.loginServicio.login(credentials).subscribe({
        next: async (res: any) => {
          const token = res.valor;
          await this.storage.set('token', 'Bearer '+token);
          this.checkToken()
          //this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        },
      });
    } else {
      this.errorMessage = 'Por favor complete todos los campos.';
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register')
  }
}  