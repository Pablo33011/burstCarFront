import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-mapa-prestador',
  templateUrl: './ubicacion-prestador.html',
  styleUrls: ['./ubicacion-prestador.scss'],
})
export class MapaPrestador implements AfterViewInit {

  private mapa!: L.Map;

  constructor() {}

  async ngAfterViewInit() {
    const coords = await this.getUserLocation();

    this.mapa = L.map('mapa').setView([coords.latitude, coords.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

    L.marker([coords.latitude, coords.longitude])
      .addTo(this.mapa)
      .bindPopup('Estás aquí')
      .openPopup();
  }

  async getUserLocation(): Promise<{ latitude: number, longitude: number }> {
    const position = await Geolocation.getCurrentPosition();
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
  }
}