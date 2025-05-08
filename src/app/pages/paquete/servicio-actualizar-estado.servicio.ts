import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';

const urlApiRegistrarServicio = endpointEnviroment.peticionCambiarServicioANuevo;

@Injectable({
  providedIn: 'root'
})
export class ServicioActualizarEstado {

  constructor(private http: HttpClient) { }
  
    actualizarEstadoServicio(id : string, datosEstado : any): Observable<any>{
      const url = `${urlApiRegistrarServicio}/${id}/cambio`;
      return this.http.put<any>(url, datosEstado);
    }

}