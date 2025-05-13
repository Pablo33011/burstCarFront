import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment } from 'src/environment/environment';
import { SolicitateRegistro } from './solicitante';
import { PrestadorRegistro, UbicacionPrestadorRegistro } from './prestador';

const urlApiRegistroSolicitante = endpointEnviroment.peticionRegistrarSolicitante;
const urlApiRegistroPrestador = endpointEnviroment.peticionRegistrarPrestador;
const urlApiRegistroUbicacionPrestador = endpointEnviroment.peticionRegistrarUbicacionPrestador;

@Injectable({
  providedIn: 'root'
})
export class RegistroServicio {
  constructor(private http: HttpClient) {}

  registrarSolicitante(datosSolicitante: SolicitateRegistro): Observable<any> {
    return this.http.post(urlApiRegistroSolicitante, datosSolicitante);
  }

  registrarPrestador(datosPrestador: PrestadorRegistro): Observable<any> {
    return this.http.post(urlApiRegistroPrestador, datosPrestador);
  }

  registrarUbicacion(datosUbicacionPrestador: UbicacionPrestadorRegistro): Observable<any> {
    return this.http.post(urlApiRegistroUbicacionPrestador, datosUbicacionPrestador);
  }
}
