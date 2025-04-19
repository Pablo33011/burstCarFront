import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environment/environment';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-mapa-prestador',
  templateUrl: './ubicacion-prestador.html',
  styleUrls: ['./ubicacion-prestador.scss'],
})
export class MapaPrestador implements AfterViewInit {

  mapa!: mapboxgl.Map;

  constructor() {}

  async ngAfterViewInit() {
    (mapboxgl as any).accessToken = environment.mapboxAccessToken;

    const coordenadas = await this.getUserLocation();

    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coordenadas.longitude, coordenadas.latitude],
      zoom: 14
    });

    this.mapa.addControl(new mapboxgl.NavigationControl());

    new mapboxgl.Marker()
      .setLngLat([coordenadas.longitude, coordenadas.latitude])
      .setPopup(new mapboxgl.Popup().setText("Estás aquí"))
      .addTo(this.mapa);
  }

  async getUserLocation(): Promise<{ latitude: number, longitude: number }> {
    const position = await Geolocation.getCurrentPosition();
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
  }
}