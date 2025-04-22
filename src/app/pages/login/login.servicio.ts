import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';
import { Login, Respuesta } from './login';

const urlApiLoginPrestador = endpointEnviroment.loginPrestador;
const urlApiLoginSolicitante = endpointEnviroment.loginSolicitante;

@Injectable({
  providedIn: 'root'
})
export class LoginServicio {

  constructor(private http: HttpClient) { }


  loginPrestador(datosLogin: Login): Observable<Respuesta> {
    return this.http.post<any>(urlApiLoginPrestador, datosLogin);
  }

  loginSolicitante(datosLogin: Login): Observable<Respuesta> {
    return this.http.post<Respuesta>(urlApiLoginSolicitante, datosLogin);
  }
}