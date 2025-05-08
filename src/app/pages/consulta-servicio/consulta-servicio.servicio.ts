import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';

const urlApiConsultaServicioTodos= endpointEnviroment.peticionConsultaServicioTodos;
const urlApiConsultaServicioTodosPorSolictante= endpointEnviroment.peticionConsultaServicioTodosPorSolicitante;
const urlApiEliminarLogicamenteServicio= endpointEnviroment.peticionEliminarServicioLogico;

@Injectable({
  providedIn: 'root'
})
export class ServicioAccion {

  constructor(private http: HttpClient) { }


  servicioTodoPaginado(pagina: number, cantidad: number): Observable<any> {
    const url = `${urlApiConsultaServicioTodos}?pagina=${pagina}&cantidad=${cantidad}`;
    return this.http.get<any>(url);
  }

  servicioTodoPaginadoPorSolicitante(pagina: number, cantidad: number, id: string): Observable<any> {
    const url = `${urlApiConsultaServicioTodosPorSolictante}/${id}?pagina=${pagina}&cantidad=${cantidad}`;
    return this.http.get<any>(url);
  }

  eliminarServicioLogico(id: string, data: any): Observable<any> {
    const url = `${urlApiEliminarLogicamenteServicio}/${id}/elimincacion`;
    return this.http.delete<any>(url, {body: data});
  }
}