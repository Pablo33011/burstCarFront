import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';
import { Calificacion } from './calificacion';

const urlApiRegistarCalificacion = endpointEnviroment.peticionRegistrarCalificacion;

@Injectable({
  providedIn: 'root'
})
export class CalificacionRegistroServicio {

  constructor(private http: HttpClient) { }


  registrarCalificacion(datosCalificacion: Calificacion, id: string): Observable<string>{
    const url = `${urlApiRegistarCalificacion}/${id}/calificacion`;
    return this.http.post<any>(url, datosCalificacion);
  }
}