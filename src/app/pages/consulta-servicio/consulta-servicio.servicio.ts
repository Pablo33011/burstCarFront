import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';

const urlApiConsultaServicioTodos= endpointEnviroment.peticionConsultaServicioTodos;

@Injectable({
  providedIn: 'root'
})
export class ServicioConsulta {

  constructor(private http: HttpClient) { }


  servicioTodoPaginado(pagina: number, cantidad: number): Observable<any> {
    const url = `${urlApiConsultaServicioTodos}?pagina=${pagina}&cantidad=${cantidad}`;
    return this.http.get<any>(url);
  }

}