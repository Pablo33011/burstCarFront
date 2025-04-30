import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';
import { OfertaConsultaServicio } from './oferta.servicio';

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
    private storageServicio: StorageService
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
    this.ofertaConsulta.obtenerOfertasPorServicio(this.idServicio, this.paginaActual, this.cantidadPorPagina).subscribe({
      next: (res) => {
        this.ofertas = res.contenidoPagina;
        this.totalPaginas = res.totalPaginas;
        this.paginaActual = res.paginaActual;
      },
      error: (err) => {
        console.error('Error al cargar ofertas:', err);
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
  

  aceptarOferta(oferta : any){
    const estado = { estadoOferta: 'Oferta aceptada' };
    this.ofertaConsulta.actualizarEstadoSolicitante(oferta.idOferta, estado).subscribe({
      next: () => {
        console.log('Estado actualizado correctamente');
      },
      error: (err) => {
        console.error('Error al actualizar estado', err);
      }
    });
  }

  rechazarOferta(oferta : any){
    const estado = { estadoOferta: 'Oferta rechazada' };
    this.ofertaConsulta.actualizarEstadoSolicitante(oferta.idOferta, estado).subscribe({
      next: () => {
        console.log('Estado actualizado correctamente');
      },
      error: (err) => {
        console.error('Error al actualizar estado', err);
      }
    });
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
        console.error('Error al consultar el servicio:', error);
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
