import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';
import { UbicacionRegistro } from './ubicacion';
import { DestinoRegistro } from './destino';
import { ServicioRegistroData } from './servicio';

const urlApiRegistrarUbicacion = endpointEnviroment.peticionRegistrarUbicacion;
const urlApiRegistrarDestino = endpointEnviroment.peticionRegistrarDestino;
const urlApiRegistrarServicio = endpointEnviroment.peticionRegistrarServicio;

@Injectable({
  providedIn: 'root'
})
export class ServicioRegistro {

  constructor(private http: HttpClient) { }

    registrarUbicacion(datosUbicacion: UbicacionRegistro): Observable<string>{
      console.log("ubicacion: " + datosUbicacion)
      return this.http.post<string>(urlApiRegistrarUbicacion, datosUbicacion);
    }
  
    registrarDestino(datosDestino: DestinoRegistro): Observable<string>{
      console.log("destino: " + datosDestino)
      return this.http.post<string>(urlApiRegistrarDestino, datosDestino);
    }
  
    registrarServicio(datosServicio : ServicioRegistroData): Observable<string>{
      console.log("servicio: " + datosServicio)
      return this.http.post<string>(urlApiRegistrarServicio, datosServicio);
    }

}