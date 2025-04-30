import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestadorConsultaServicio } from './prestador.servicio';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapaSelectorComponent } from 'src/app/shared/mapa-selector/mapa-selector.component';

@Component({
  selector: 'app-consulta-prestador',
  templateUrl: './prestador.page.html',
  styleUrls: ['./prestador.page.scss']
})
export class PrestadorConsultaPage implements OnInit{

  prestador: any;
  ubicacionForm!: FormGroup;
  @ViewChild('mapaConsulta') mapaConsulta!: MapaSelectorComponent;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private prestadorService: PrestadorConsultaServicio,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.prestadorService.obtenerPrestador(id).subscribe((res) => {
      this.prestador = res;

      this.ubicacionForm = this.fb.group({
        latitud: [res.ubicacionPrestador?.latitud],
        longitud: [res.ubicacionPrestador?.longitud],
        nombrePais: [res.ubicacionPrestador?.delimitacionPrestador?.nombrePais],
        nombreDepartamento: [res.ubicacionPrestador?.delimitacionPrestador?.nombreDepartamento],
        nombreCiudad: [res.ubicacionPrestador?.delimitacionPrestador?.nombreCiudad],
        nombreCorregimiento: [res.ubicacionPrestador?.delimitacionPrestador?.nombreCorregimiento || ''],
        nombreVia: [res.ubicacionPrestador?.viaPrestador?.nombre],
        numeroVia: [res.ubicacionPrestador?.numeroVia],
        direccion: [res.ubicacionPrestador?.direccion],
      });
    });

    setTimeout(() => {
      this.mapaConsulta?.redibujarMapa();
    }, 300);
  }

  calcularPorcentaje(puntuacion: number | undefined): string {
    const valor = typeof puntuacion === 'number' ? puntuacion : 0;
    const porcentaje = Math.min(Math.max(valor, 0), 5) * 20;
    return `${porcentaje}%`;
  }  

  regresar() {
    this.router.navigateByUrl(`/servicio/todos`)
    .then(() => {
    window.location.reload();
  });
  }
  
}