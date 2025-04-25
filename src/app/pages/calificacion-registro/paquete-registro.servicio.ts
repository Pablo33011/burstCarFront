import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';
import { ContenidoRegistro } from './contenido';
import { PesoRegistro } from './peso';
import { PaqueteRegistro } from './paquete';

const urlApiRegistarPeso = endpointEnviroment.peticionRegistrarPeso;
const urlApiRegistarContenido = endpointEnviroment.peticionRegistrarContenido;
const urlApiRegistarPaquete = endpointEnviroment.peticionRegistrarPaquete;

@Injectable({
  providedIn: 'root'
})
export class PaqueteServicio {

  constructor(private http: HttpClient) { }


  registrarContenido(datosContenido: ContenidoRegistro): Observable<string>{
    return this.http.post<any>(urlApiRegistarContenido, datosContenido);
  }

  registrarPeso(datosPeso: PesoRegistro): Observable<any>{
    return this.http.post<any>(urlApiRegistarPeso, datosPeso);
  }

  registrarPaquete(datosPaquete : PaqueteRegistro): Observable<string>{
    return this.http.post<any>(urlApiRegistarPaquete, datosPaquete);
  }
}