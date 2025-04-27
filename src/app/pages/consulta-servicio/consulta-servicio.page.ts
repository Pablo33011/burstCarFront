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
  paginaActual = 0;
  serviciosPorPagina = 3;
  totalPaginas = 0;
  identificacionUsuario: string = '';
  estadoServicio: string = 'Finalizado';

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

  crearServicio() {
    this.router.navigateByUrl(`/servicio/nuevo`);
  }

  cargarServicios() { 
    this.servicioConsulta.servicioTodoPaginado(this.paginaActual, this.serviciosPorPagina).subscribe({
      next: (res) => {
        this.servicios = res.contenidoPagina;
        this.totalPaginas = res.totalPaginas;
      },
      error: (i) => {
        console.error("Error al cargar los servicios:", i);
        i.error && console.error("Detalles del error:", i.error);
        i.status && console.error("Estado del error:", i.status);
      },    
    });
  }

  verPaquetes(servicio: any) {
    const idServicio = servicio.idServicio;
    console.log("Navegando a:", `/paquete/${idServicio}/informacion`);
    this.router.navigateByUrl(`/paquete/servicio/${idServicio}/informacion`);
  }
  
  verOfertas(servicio: any) {
    const idServicio = servicio.idServicio;
    console.log("Navegando a:", `/servicio/oferta/todos/${idServicio}`);
    this.router.navigateByUrl(`/servicio/oferta/todos/${idServicio}`);
  }  

    async obtenerRol() {
      const token = await this.storageServicio.obtener('token');
      console.log('Token obtenido:', token);
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.rolUsuario = payload.rol;
      }
    }
  
    siguientePagina() {
      if (this.paginaActual + 1 < this.totalPaginas) {
        this.paginaActual++;
        this.cargarServicios();
      }
    }
  
    anteriorPagina() {
      if (this.paginaActual > 0) {
        this.paginaActual--;
        this.cargarServicios();
      }
    }

    verRecorrido(servicio: any) {
      const idServicio = servicio.idServicio;
      const latitudOrigen = servicio.latituUbicacion;
      const longitudOrigen = servicio.longitudUbicacion;
      const latitudDestino = servicio.latituDestino;
      const longitudDestino = servicio.longitudDestino;
    
      this.router.navigate(
        ['/tracking/prestador', idServicio],
        {
          queryParams: {
            latitudOrigen: latitudOrigen,
            longitudOrigen: longitudOrigen,
            latitudDestino: latitudDestino,
            longitudDestino: longitudDestino
          }
        }
      );
    }

    verRecorridoSolicitante(servicio: any) {
      const idServicio = servicio.idServicio;
      const latitudOrigen = servicio.latituUbicacion;
      const longitudOrigen = servicio.longitudUbicacion;
      const latitudDestino = servicio.latitudDestinoUbicacion; 
      const longitudDestino = servicio.longitudDestinoUbicacion;
    
      this.router.navigate(
        ['/tracking/solicitante', idServicio], {
        queryParams: {
          latitudOrigen: latitudOrigen,
          longitudOrigen: longitudOrigen,
          latitudDestino: latitudDestino,
          longitudDestino: longitudDestino
        }
      });
    }

    coultarBotonServicioTranscurso(servicio: any): boolean {
      return this.rolUsuario === 'solicitante' && 
             servicio.estadoServicio !== this.estadoServicio;
    }

    coultarBotonServicioTranscursoPrestador(servicio: any): boolean {
      return this.rolUsuario === 'prestador' && 
             servicio.estadoServicio !== this.estadoServicio;
    }
}
