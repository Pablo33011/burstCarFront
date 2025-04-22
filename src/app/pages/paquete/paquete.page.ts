import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaqueteServicio } from './paquete.servicio';

@Component({
  selector: 'app-consulta-paquete',
  templateUrl: './paquete.page.html',
  styleUrls: ['./paquete.page.scss']
})
export class PaqueteConsultaPage implements OnInit{

  idServicio: string;
  paquetes: any[] = [];

  constructor(private route: ActivatedRoute,
    private paqueteConsulta: PaqueteServicio, 
  ) {}


  ionViewWillEnter() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.idServicio = this.route.snapshot.paramMap.get('id')!;
    console.log('ID recibido:', this.idServicio);

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

}
