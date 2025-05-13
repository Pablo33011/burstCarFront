import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class EstadoServicio {

  private urlApiBase = endpointEnviroment.peticionActualizarEstadoServicioEnRecorrido;


  constructor(private http: HttpClient) { }

  actualizarEstadoServicio(idServicio: string, body: any): Observable<any> {
    const url = `${this.urlApiBase}/${idServicio}/cambio`;
    return this.http.put(url, body);
  }

}