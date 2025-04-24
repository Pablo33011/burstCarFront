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
    //this.router.navigateByUrl(`/servicio/nuevo`);
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
}
