import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';
import { Prestador } from './prestador';

@Injectable({
  providedIn: 'root'
})
export class PrestadorConsultaServicio {

  private urlApiBase = endpointEnviroment.peticionConsultaPrestador;


  constructor(private http: HttpClient) { }


  obtenerPrestador(id: string): Observable<Prestador> {
    const url = `${this.urlApiBase}/${id}`;
    return this.http.get<Prestador>(url);
  }

}