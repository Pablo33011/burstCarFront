import { Component, OnInit } from '@angular/core';
import { ServicioAccion } from '../consulta-servicio/consulta-servicio.servicio';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';
import { AlertaServicio } from 'src/app/services/alertas-errores.servicio';

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
  estadoServicioTrancurso: string = 'En transcurso';
  estadoServicioNuevo: string = 'Nuevo';
  estadoServicioBorrador: string = 'En Borrador';
  estadoServicioFinalizado: string = 'Finalizado';

  constructor(private servicioAccion: ServicioAccion, 
    private router: Router, 
    private storageServicio: StorageService,
    private alerta: AlertaServicio
  ) {}
  

  ionViewWillEnter() {
     this.prepararVista();
  }

  async prepararVista() {
    await this.obtenerDatosToken();         
    this.cargarServicios();          
  }

  crearServicio() {
    this.router.navigateByUrl(`/servicio/nuevo`)
    .then(() => {
    window.location.reload();
  });

  }


  cargarServicios() {  
    const observable = this.rolUsuario === 'solicitante'
      ? this.servicioAccion.servicioTodoPaginadoPorSolicitante(this.paginaActual, this.serviciosPorPagina, this.identificacionUsuario)
      : this.servicioAccion.servicioTodoPaginado(this.paginaActual, this.serviciosPorPagina);
  
    observable.subscribe({
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
    const estadoServicio = servicio.estadoServicio;
    console.log("Navegando a:", `/paquete/${idServicio}/informacion`);
    this.router.navigate(
      [`/paquete/servicio/${idServicio}/informacion`],
      {
        queryParams: {
          estadoServicio: estadoServicio
        }
      }
    )
    .then(() => {
    window.location.reload();
  });

  }
  
  verOfertas(servicio: any) {
    const idServicio = servicio.idServicio;
    console.log("Navegando a:", `/servicio/oferta/todos/${idServicio}`);
    this.router.navigateByUrl(`/servicio/oferta/todos/${idServicio}`)
    .then(() => {
    window.location.reload();
  });

  }  

  regresar() {
    this.router.navigateByUrl(`/login`)
    .then(() => {
    window.location.reload();
  });
  }

  async obtenerDatosToken() {
    const token = await this.storageServicio.obtener('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.rolUsuario = payload.rol;
      this.identificacionUsuario = payload.numeroIdentificacion;
      console.log('Rol:', this.rolUsuario);
      console.log('Número de identificación:', this.identificacionUsuario);
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
      ).then(() => {
        window.location.reload();
      });
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
      }).then(()=>{
        window.location.reload();
      });
    }

    coultarBotonServicioTranscurso(servicio: any): boolean {
      return this.rolUsuario === 'solicitante' && 
             servicio.estadoServicio === this.estadoServicioTrancurso;
    }

    coultarBotonServicioTranscursoPrestador(servicio: any): boolean {
      return this.rolUsuario === 'prestador' && 
             (servicio.estadoServicio === this.estadoServicioNuevo);
    }

    coultarBotonServicioFinalizado(servicio: any): boolean {
      return this.rolUsuario === 'prestador' && 
             (servicio.estadoServicio === this.estadoServicioFinalizado);
    }

    elimincacionServicioLogico(servicio: any){
      this.servicioAccion.eliminarServicioLogico(servicio.idServicio, {
        estadoServicio: 'Eliminado'   
      }).subscribe({
        next: () => {
          this.alerta.mostrarMensaje('Éxito', 'El servicio fue eliminado correctamente');
          this.router.navigateByUrl('/servicio/todos').then(() => {
            window.location.reload()});
        },
        error: (err) => {
          console.error('Error al eliminar servicio:', err);
          this.alerta.mostrarError(err, 'Error al eliminar el servicio');
        }
      });
    }

    validarEliminacionLogica(servicio: any): boolean{
      return this.rolUsuario === 'solicitante' &&
      (servicio.estadoServicio === this.estadoServicioNuevo ||
       servicio.estadoServicio === this.estadoServicioBorrador);   
    }
}
