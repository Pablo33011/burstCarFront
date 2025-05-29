import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { Router, ActivatedRoute } from '@angular/router';
import { MapaSelectorComponent } from 'src/app/shared/mapa-selector/mapa-selector.component';
import { FirebaseTrackingServicio } from 'src/app/shared/tracking/firebase-tracking.servicio';
import { EstadoServicio } from './servicio-actualizar-estado.servicio';
import { AlertaServicio } from 'src/app/services/alertas-errores.servicio';
import { rutaSimulada } from './ruta.simulacion';

@Component({
  selector: 'app-tracking-prestador',
  templateUrl: './tracking-prestador.page.html',
  styleUrls: ['./tracking-prestador.page.scss']
})
export class TrackingPrestadorPage implements OnInit {
  servicioId = '';
  dummyForm: FormGroup;
  trackingActivo = false;
  watchId: string | null = null;
  latitudOrigen!: number;
  longitudOrigen!: number;
  latitudDestino!: number;
  longitudDestino!: number;
  puedeIniciarRecorrido = false;
  puedeFinalizarRecorrido = false;
  puedeCambiarEstadoEnOrigen = false;
  intervalSimulacion: any; //Variable para pruebas
  rutaSimulada = rutaSimulada; //Variable para pruebas

  @ViewChild(MapaSelectorComponent) mapaSelector!: MapaSelectorComponent;

  constructor(
    private firebaseTracking: FirebaseTrackingServicio,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private estadoServicio: EstadoServicio,
    private alerta: AlertaServicio
  ) {
    this.dummyForm = this.fb.group({
      latitud: [''],
      longitud: ['']
    });
  }

  ngOnInit() {
    this.servicioId = this.route.snapshot.paramMap.get('id') || '';

    this.route.queryParams.subscribe(params => {
      this.latitudOrigen = parseFloat(params['latitudOrigen']);
      this.longitudOrigen = parseFloat(params['longitudOrigen']);
      this.latitudDestino = parseFloat(params['latitudDestino']);
      this.longitudDestino = parseFloat(params['longitudDestino']);

      this.verificarCercanias();
    });
  }

  async verificarCercanias() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const latActual = position.coords.latitude;
      const lngActual = position.coords.longitude;
  
      const distanciaOrigen = this.calcularDistanciaEnMetros(latActual, lngActual, this.latitudOrigen, this.longitudOrigen);
      const distanciaDestino = this.calcularDistanciaEnMetros(latActual, lngActual, this.latitudDestino, this.longitudDestino);
  
      console.log('Distancia al origen:', distanciaOrigen, 'metros');
      console.log('Distancia al destino:', distanciaDestino, 'metros');
  
      this.puedeIniciarRecorrido = distanciaOrigen <= 50; 
      this.puedeCambiarEstadoEnOrigen = distanciaOrigen <= 50; 
      this.puedeFinalizarRecorrido = distanciaDestino <= 50;
    } catch (error) {
      this.alerta.mostrarError(error, 'No se pudo obtener tu ubicación');
    }
  }  

  calcularDistanciaEnMetros(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000;
    const rad = (x: number) => x * Math.PI / 180;

    const dLat = rad(lat2 - lat1);
    const dLon = rad(lon2 - lon1);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  async iniciarRecorrido() {
    if (!this.puedeIniciarRecorrido) {
      this.alerta.mostrarError({ message: 'Debes estar en el punto de origen para iniciar el recorrido.' });
      return;
    }
    this.trackingActivo = true;
    this.watchId = await Geolocation.watchPosition({}, (position, err) => {
      if (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
    
        this.firebaseTracking.actualizarUbicacion(this.servicioId, lat, lng);
        this.dummyForm.patchValue({ latitud: lat, longitud: lng });
        this.mapaSelector.moverMarcador(lat, lng);
        this.verificarCercanias();
      }
    });
    this.cambiarEstadoServicioEnOrigen();
  }

  async finalizarRecorrido() {
    if (this.intervalSimulacion) {
      clearInterval(this.intervalSimulacion);
    }
    this.trackingActivo = false;
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
      await this.firebaseTracking.eliminarTracking(this.servicioId);
    }
    this.cambiarEstadoAlFinalizar();
  }

  private cambiarEstadoAlFinalizar(){
    if (!this.puedeFinalizarRecorrido) {
      this.alerta.mostrarError({ message: 'Debes estar en el punto de destino para finalizar el recorrido.' });
      return;
    }
    this.estadoServicio.actualizarEstadoServicio(this.servicioId, { estadoServicio: 'Finalizado' }).subscribe({
      next: () => {
        this.alerta.mostrarExito('El recorrido fue finalizado exitosamente');
        this.router.navigate(['/servicio/todos']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        this.alerta.mostrarError(err, 'Error al finalizar el recorrido');
      }
    });
  }

  //Prueba movimiento 
  /*simularMovimiento() {
    this.intervalSimulacion = setInterval(() => {
      const latActual = this.dummyForm.value.latitud;
      const lngActual = this.dummyForm.value.longitud;
  
      const nuevoLat = latActual + 0.0001;
      const nuevoLng = lngActual + 0.0001;
  
      this.dummyForm.patchValue({ latitud: nuevoLat, longitud: nuevoLng });
      this.firebaseTracking.actualizarUbicacion(this.servicioId, nuevoLat, nuevoLng);
      this.mapaSelector.moverMarcador(nuevoLat, nuevoLng);
    }, 2000);

    this.alerta.mostrarMensaje('Simulación activada', 'Moviendo el marcador automáticamente.');
  } */
    simularMovimiento(){
      this.alerta.mostrarMensaje('Simulación activada', 'Moviendo el marcador automáticamente.');
      this.cambiarEstadoServicioEnOrigen();
      let index = 0;
      this.intervalSimulacion = setInterval(() => {
        if (index >= this.rutaSimulada.length) {
          clearInterval(this.intervalSimulacion);
          this.alerta.mostrarMensaje('Simulación finalizada', 'El marcador llegó al destino.');
          this.cambiarEstadoAlFinalizar();
          return;
        }
        const punto = this.rutaSimulada[index];
        this.dummyForm.patchValue({ latitud: punto.lat, longitud: punto.lng });
        this.firebaseTracking.actualizarUbicacion(this.servicioId, punto.lat, punto.lng);
        this.mapaSelector.moverMarcador(punto.lat, punto.lng);
        index++;
      }, 2000);
    }

  cambiarEstadoServicioEnOrigen() {
    const esatdo = { estadoServicio: 'En transcurso' };
    this.estadoServicio.actualizarEstadoServicio(this.servicioId, esatdo).subscribe({
      next: () => {
        this.alerta.mostrarExito('Servicio en transcurso');
      },
      error: (err) => {
        console.error('Error al iniciar el transcurso', err);
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