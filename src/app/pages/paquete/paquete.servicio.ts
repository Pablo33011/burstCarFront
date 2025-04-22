import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';
import { Paquete } from './paquete';


@Injectable({
  providedIn: 'root'
})
export class PaqueteServicio {

  private urlApiBase = endpointEnviroment.peticionConsultarPaquete;


  constructor(private http: HttpClient) { }


  paquetePorIdServicio(idServicio: string): Observable<Paquete[]> {
    const urlApiConsultaPaquetePorServicio = `${this.urlApiBase}/${idServicio}/informacion`;
    return this.http.get<Paquete[]>(urlApiConsultaPaquetePorServicio );
  }

}