import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';
import { Login } from './login';
//import { JwtInterceptor } from '../jwt.interceptor';
const urlApi = endpointEnviroment.loginPrestador;

@Injectable({
  providedIn: 'root'
})
export class LoginServicio {

  constructor(private http: HttpClient) { }


  login(datosLogin: Login): Observable<any> {
    return this.http.post<any>(urlApi, datosLogin);
  }
}