import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaqueteServicio } from './paquete.servicio';
import { StorageService } from 'src/app/shared/storage.service';
import { ServicioActualizarEstado } from './servicio-actualizar-estado.servicio';

@Component({
  selector: 'app-consulta-paquete',
  templateUrl: './paquete.page.html',
  styleUrls: ['./paquete.page.scss']
})
export class PaqueteConsultaPage implements OnInit{

  idServicio: string;
  paquetes: any[] = [];
  rolUsuario: string = '';
  paginaActual = 1;
  paquetesPorPagina = 1;
  publicarServicio = false;
  estadoServicioParaPublicar = "";

  constructor(private route: ActivatedRoute,
    private paqueteConsulta: PaqueteServicio, 
    private estadoServicio: ServicioActualizarEstado,
    private router: Router,
    private storageServicio: StorageService
  ) {}

  async ngOnInit() {
    this.idServicio = this.route.snapshot.paramMap.get('id')!;
        this.route.queryParams.subscribe(params => {
      this.estadoServicioParaPublicar = params['estadoServicio'];
    });
    await this.obtenerRol();
    this.cargarPaquetes();
  }

  verPeso(contenido: any) {
    const idContenido = contenido.identificador;
    console.log("Navegando a:", `/paquete/${idContenido}/informacion`);
    this.router.navigateByUrl(`/paquete/peso/${idContenido}/informacion`)
    .then(() => {
    window.location.reload();
  });

  }

  private cargarPaquetes(): void {
    this.paqueteConsulta.paquetePorIdServicio(this.idServicio).subscribe({
      next: (res) => {
        this.paquetes = res;
        this.publicarServicio = this.paquetes.length > 0 && this.estadoServicioParaPublicar === 'En borrador';
        console.log("Data: " + this.paquetes.length)
      },
      error: (err) => {
        console.error("Error al cargar los paquetes:", err?.error || err);
        this.publicarServicio = false;
      }
    });
  }

  public async publicarServicioBoton(): Promise<void> {
    try {
      await this.actualizarEstado();
      console.log('Servicio publicado correctamente');
      this.router.navigateByUrl('/servicio/todos')
      .then(() => {
      window.location.reload();
      });
    } catch (error) {
      console.error('Error al publicar el servicio:', error);
    }
  }

  private actualizarEstado(): Promise<any> {
    return this.estadoServicio.actualizarEstadoServicio(this.idServicio, {
      estadoServicio: "Nuevo"
    }).toPromise();
  }
  

  async obtenerRol() {
    const token = await this.storageServicio.obtener('token');
    console.log('Token obtenido:', token);
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.rolUsuario = payload.rol;
    }
  }

  actualizarPaquete(paquete: any) {
    console.log("Actualizar:", paquete);
  }
  
  crearPaquete() {
    this.router.navigateByUrl(`/paquete/nuevo/${this.idServicio}`)
    .then(() => {
    window.location.reload();
    });

  }

  get totalPaginas(): number {
    return Math.ceil(this.paquetes.length / this.paquetesPorPagina);
  }  

  obtenerPaquetesPaginaActual() {
    const inicio = (this.paginaActual - 1) * this.paquetesPorPagina;
    return this.paquetes.slice(inicio, inicio + this.paquetesPorPagina);
  }

  siguientePagina() {
    if ((this.paginaActual * this.paquetesPorPagina) < this.paquetes.length) {
      this.paginaActual++;
    }
  }

  anteriorPagina() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  regresar() {
    this.router.navigateByUrl(`/servicio/todos`)
    .then(() => {
    window.location.reload();
  });
  }

}
