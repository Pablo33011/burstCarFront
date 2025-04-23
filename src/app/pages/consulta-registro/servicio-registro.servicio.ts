import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';

const urlApiRegistrarUbicacion = endpointEnviroment.peticionRegistrarUbicacion;
const urlApiRegistrarDestino = endpointEnviroment.peticionRegistrarDestino;
const urlApiRegistrarServicio = endpointEnviroment.peticionRegistrarServicio;

@Injectable({
  providedIn: 'root'
})
export class ServicioRegistro {

  constructor(private http: HttpClient) { }

    registrarUbicacion(datosUbicacion: any): Observable<string>{
      return this.http.post<any>(urlApiRegistrarUbicacion, datosUbicacion);
    }
  
    registrarDestino(datosDestino: any): Observable<string>{
      return this.http.post<any>(urlApiRegistrarDestino, datosDestino);
    }
  
    registrarServicio(datosServicio : ServicioRegistro): Observable<any>{
      return this.http.post<any>(urlApiRegistrarServicio, datosServicio);
    }

}