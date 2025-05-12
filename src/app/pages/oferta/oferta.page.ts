import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';
import { OfertaConsultaServicio } from './oferta.servicio';
import { AlertaServicio } from 'src/app/services/alertas-errores.servicio';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-consulta-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss']
})
export class OfertaConsultaPage implements OnInit{

  idServicio: string;
  ofertas: any[] = [];
  rolUsuario: string = '';
  paginaActual: number = 0;
  totalPaginas: number = 1;
  cantidadPorPagina = 3;
  idUsuario: string = '';
  ofertaPermitida: string = 'Oferta aceptada';
  ofertaRechazada: string = 'Oferta rechazada';

  constructor(private route: ActivatedRoute,
    private ofertaConsulta: OfertaConsultaServicio, 
    private router: Router,
    private storageServicio: StorageService,
    private alerta: AlertaServicio
  ) {}


  ionViewWillEnter() {
    this.ngOnInit();
  }

  async ngOnInit() {
    this.idServicio = this.route.snapshot.paramMap.get('id')!;
    console.log('ID recibido:', this.idServicio);
    await this.obtenerRol();
    this.obtenerOfertas();
  }

  async obtenerRol() {
    const token = await this.storageServicio.obtener('token');
    console.log('Token obtenido:', token);
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.rolUsuario = payload.rol;
      console.log("rol: " + this.rolUsuario);
      this.idUsuario = payload.numeroIdentificacion;
      console.log("idUsuario: " + this.idUsuario);

    }
  }

  obtenerOfertas() {  
    const observable = (this.rolUsuario === 'prestador' && this.idUsuario)
      ? this.ofertaConsulta.obtenerOfertasPorServicioYPorPrestador(this.idServicio, this.idUsuario, this.paginaActual, this.cantidadPorPagina)
      : this.ofertaConsulta.obtenerOfertasPorServicio(this.idServicio, this.paginaActual, this.cantidadPorPagina);
  
    observable.subscribe({
      next: (res) => {
        this.ofertas = res.contenidoPagina;
        this.totalPaginas = res.totalPaginas;
        this.paginaActual = res.paginaActual;
      },
      error: (err) => {
        this.alerta.mostrarError(err, 'No se pudieron cargar las ofertas');
      }
    });
  }  

  crearOferta() {
    this.router.navigateByUrl(`oferta/nueva/servicio/${this.idServicio}`)
  .then(() => {
    window.location.reload();
  });

  }

  verPrestador(oferta: any) {
    const idPrestador = oferta.prestadorServicio;
    console.log("Navegando a:", `/prestador/${idPrestador}`);
    this.router.navigateByUrl(`/prestador/${idPrestador}`)
  .then(() => {
    window.location.reload();
  });

  }


  siguientePagina() {
    if (this.paginaActual + 1 < this.totalPaginas) {
      this.paginaActual++;
      this.obtenerOfertas();
    }
  }

  anteriorPagina() {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.obtenerOfertas();
    }
  }

  mostrarBotonDeEstadoOferta(oferta: any): boolean {
    return this.rolUsuario === 'solicitante' && 
           oferta.estadoOferta !== this.ofertaRechazada && 
           oferta.estadoOferta !== this.ofertaPermitida;
  }
  
  private actualizarEstadoOferta(oferta: any, estado: string) {
    const nuevoEstado = { estadoOferta: estado };
    this.ofertaConsulta.actualizarEstadoSolicitante(oferta.idOferta, nuevoEstado).subscribe({
      next: async() => {
        this.alerta.mostrarExito(`Oferta ${estado.toLowerCase()}`);
        this.obtenerOfertas();

      if (this.rolUsuario === 'prestador') {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: `Tu oferta fue ${estado.toLowerCase()}`,
              body: `Un solicitante ha ${estado === 'Oferta aceptada' ? 'aceptado' : 'rechazado'} tu oferta para el servicio #${oferta.servicio}`,
              id: new Date().getTime(),
              schedule: { at: new Date(new Date().getTime() + 6000) },
              sound: null,
              smallIcon: 'ic_stat_icon_config_sample',
              attachments: null,
              actionTypeId: '',
              extra: null
            }
          ]
        });
      }
    },
    error: (err) => {
      this.alerta.mostrarError(err, `Error al ${estado.toLowerCase()}`);
    }
  });
}

  aceptarOferta(oferta : any){
    this.actualizarEstadoOferta(oferta, 'Oferta aceptada');
  }

  rechazarOferta(oferta : any){
    this.actualizarEstadoOferta(oferta, 'Oferta rechazada');
  }

  iniciarRecorridoPrestador(oferta: any) {  
    this.ofertaConsulta.consultarServicioPorId(oferta.servicio).subscribe({
      next: (servicio) => {
        console.log('Servicio encontrado:', servicio);
  
        this.router.navigate(
          ['/tracking/prestador', oferta.servicio],
          {
            queryParams: {
              latitudOrigen: servicio.latituUbicacion,
              longitudOrigen: servicio.longitudUbicacion,
              latitudDestino: servicio.latituDestino,
              longitudDestino: servicio.longitudDestino
            }
          }
        ).then(() => {
          window.location.reload();
        })
      },
      error: (error) => {
        this.alerta.mostrarError(error, 'No se pudo cargar el servicio para iniciar el recorrido');
      }
    });
  }

  regresar() {
    this.router.navigateByUrl(`/servicio/todos`)
    .then(() => {
    window.location.reload();
  });
  }
}
