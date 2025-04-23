import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';
import { Peso } from './peso';


@Injectable({
  providedIn: 'root'
})
export class PesoServicio {

  private urlApiBase = endpointEnviroment.peticionConsultaPesoContenido;


  constructor(private http: HttpClient) { }


  pesoPorIdContenido(idContenido: string): Observable<Peso> {
    const urlApiConsultaPesoPorContendio = `${this.urlApiBase}/${idContenido}/informacion`;
    return this.http.get<Peso>(urlApiConsultaPesoPorContendio);
  }

}