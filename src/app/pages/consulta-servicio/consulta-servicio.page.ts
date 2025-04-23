import { Component, OnInit } from '@angular/core';
import { ServicioConsulta } from '../consulta-servicio/consulta-servicio.servicio';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-consulta-servicio',
  templateUrl: './consulta-servicio.page.html',
  styleUrls: ['./consulta-servicio.page.scss']
})
export class ConsultaServicioPage{
  servicios: any[] = [];
  rolUsuario: string = '';
  paginaActual = 1;
  serviciosPorPagina = 3;

  constructor(private servicioConsulta: ServicioConsulta, 
    private router: Router, 
    private storageServicio: StorageService

  ) {}
  

  ionViewWillEnter() {
     this.prepararVista();
  }

  async prepararVista() {
    await this.obtenerRol();         
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

    async obtenerRol() {
      const token = await this.storageServicio.obtener('token');
      console.log('Token obtenido:', token);
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.rolUsuario = payload.rol;
      }
    }
  
  
    get totalPaginas(): number {
      return Math.ceil(this.servicios.length / this.serviciosPorPagina);
    }
    
    obtenerServiciosPaginaActual() {
      const inicio = (this.paginaActual - 1) * this.serviciosPorPagina;
      return this.servicios.slice(inicio, inicio + this.serviciosPorPagina);
    }
  
    siguientePagina() {
      if ((this.paginaActual * this.serviciosPorPagina) < this.servicios.length) {
        this.paginaActual++;
      }
    }
  
    anteriorPagina() {
      if (this.paginaActual > 1) {
        this.paginaActual--;
      }
    }

}
