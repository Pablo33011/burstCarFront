import { Component, OnInit } from '@angular/core';
import { ServicioConsulta } from '../consulta-servicio/consulta-servicio.servicio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-servicio',
  templateUrl: './consulta-servicio.page.html',
  styleUrls: ['./consulta-servicio.page.scss']
})
export class ConsultaServicioPage{
  servicios: any[] = [];

  constructor(private servicioConsulta: ServicioConsulta, 
    private router: Router
  ) {}
  

  ionViewWillEnter() {
     this.cargarServicios();
  }

  async cargarServicios() {
    this.servicioConsulta.servicioTodo().subscribe({
      next: (res) => {
        this.servicios = res;
      },
      error: (i) => {
        console.error("Error al cargar los servicios:", i);
        i.error && console.error("Detalles del error:", i.error);
        i.status && console.error("Estado del error:", i.status);
      },    
    });
  }

  verPaquetes(servicio: any) {
    const idPaquete = servicio.idServicio;
    console.log("Navegando a:", `/paquete/${idPaquete}/informacion`);
    this.router.navigateByUrl(`/paquete/servicio/${idPaquete}/informacion`);
    }

}
