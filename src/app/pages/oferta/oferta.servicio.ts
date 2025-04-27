import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OfertaConsultaServicio {

  private urlApiBase = endpointEnviroment.peticionConsultaOfertaTodos;
  private urlApiBaseConsultaServicio = endpointEnviroment.peticionConsultarServicioPoId;
  private urlApiBaseActualizarEstadoOferta = endpointEnviroment.peticionActualizarEstadoOferta;


  constructor(private http: HttpClient) { }


  obtenerOfertasPorServicio(idServicio: string, pagina: number, cantidad: number): Observable<any> {
    const url = `${this.urlApiBase}/${idServicio}?pagina=${pagina}&cantidad=${cantidad}`;
    return this.http.get<any>(url);
  }

  consultarServicioPorId(idServicio: string): Observable<any> {
    const url = `${this.urlApiBaseConsultaServicio}/${idServicio}`;
    return this.http.get<any>(url);
  }

  actualizarEstadoSolicitante(idServicio: string, body: any): Observable<any> {
    const url = `${this.urlApiBaseActualizarEstadoOferta}/${idServicio}/cambio/estado`;
    return this.http.put(url, body);
  }

}