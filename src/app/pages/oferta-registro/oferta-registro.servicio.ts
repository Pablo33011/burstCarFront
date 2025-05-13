import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointEnviroment} from 'src/environment/environment';
import { OfertaRegistro } from './oferta';

const urlApiRegistarOferta = endpointEnviroment.peticionRegistrarOferta;

@Injectable({
  providedIn: 'root'
})
export class OfertaServicio {

  constructor(private http: HttpClient) { }

  registrarOferta(datosOferta: OfertaRegistro): Observable<any>{
    return this.http.post<any>(urlApiRegistarOferta, datosOferta);
  }
}