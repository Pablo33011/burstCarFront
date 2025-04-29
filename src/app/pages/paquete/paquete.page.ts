import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaqueteServicio } from './paquete.servicio';
import { StorageService } from 'src/app/shared/storage.service';

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

  constructor(private route: ActivatedRoute,
    private paqueteConsulta: PaqueteServicio, 
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

    this.paqueteConsulta.paquetePorIdServicio(this.idServicio).subscribe({
      next: (res) => {
        this.paquetes = res;
      },
      error: (i) => {
        console.error("Error al cargar los servicios:", i);
        i.error && console.error("Detalles del error:", i.error);
        i.status && console.error("Estado del error:", i.status);
      },    
    });
  }

  verPeso(contenido: any) {
    const idContenido = contenido.identificador;
    console.log("Navegando a:", `/paquete/${idContenido}/informacion`);
    this.router.navigateByUrl(`/paquete/peso/${idContenido}/informacion`)
    .then(() => {
    window.location.reload();
  });

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

}
