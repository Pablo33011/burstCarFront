import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PesoServicio } from './peso.servicio';
import { StorageService } from 'src/app/shared/storage.service';
import { AlertaServicio } from 'src/app/services/alertas-errores.servicio';

@Component({
  selector: 'app-consulta-peso',
  templateUrl: './peso.page.html',
  styleUrls: ['./peso.page.scss']
})
export class PesoConsultaPage implements OnInit{

  idContenido: string;
  peso: any;
  rolUsuario: string = '';

  constructor(private route: ActivatedRoute,
    private pesoConsulta: PesoServicio, 
    private router: Router,
    private storageServicio: StorageService,
    private alerta: AlertaServicio
  ) {}


  ionViewWillEnter() {
    this.ngOnInit();
  }

  async ngOnInit() {
    this.idContenido = this.route.snapshot.paramMap.get('id')!;
    console.log('ID recibido:', this.idContenido);
    await this.obtenerRol();
    this.cargarPeso();
  }

  cargarPeso() {
    this.pesoConsulta.pesoPorIdContenido(this.idContenido).subscribe({
      next: (res) => {
        this.peso = res;
      },
      error: (err) => {
        this.alerta.mostrarError(err, 'No se pudo cargar el peso');
      }
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

  actualizarPeso(peso: any) {
    console.log("Actualizar:", peso);
  }

  regresar() {
    this.router.navigateByUrl(`/servicio/todos`)
    .then(() => {
    window.location.reload();
  });
  }

}
