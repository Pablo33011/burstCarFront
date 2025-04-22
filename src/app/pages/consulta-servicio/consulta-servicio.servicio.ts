import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';
import { Servicio } from './servicio';

const urlApiConsultaServicioTodos= endpointEnviroment.peticionConsultaServicioTodos;

@Injectable({
  providedIn: 'root'
})
export class ServicioConsulta {

  constructor(private http: HttpClient) { }


  servicioTodo(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(urlApiConsultaServicioTodos);
  }

}