import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environment/environment';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-mapa-selector',
  templateUrl: './mapa-selector.component.html',
  styleUrls: ['./mapa-selector.component.scss']
})


export class MapaSelectorComponent implements AfterViewInit {
  
  @Input() formGroup!: FormGroup;
  @Input() soloLectura: boolean = false;
  @Input() latitudOrigen?: number; 
  @Input() longitudOrigen?: number; 
  @Input() latitudDestino?: number;
  @Input() longitudDestino?: number;

  @ViewChild('mapa') mapaContainer!: ElementRef;
  mapa!: mapboxgl.Map;
  busqueda: string = '';
  private marcador!: mapboxgl.Marker;

  async ngAfterViewInit() {
    (mapboxgl as any).accessToken = environment.mapboxAccessToken;

    try {
      let coords: [number, number];

      if (this.soloLectura && this.formGroup?.value?.latitud && this.formGroup?.value?.longitud) {
        coords = [this.formGroup.value.longitud, this.formGroup.value.latitud];
      } else {
        const position = await Geolocation.getCurrentPosition();
        coords = [position.coords.longitude, position.coords.latitude];
      }

      this.mapa = new mapboxgl.Map({
        container: this.mapaContainer.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: coords,
        zoom: 14,
      });

      const iconoPersona = document.createElement('div')
      iconoPersona.innerHTML = `<img src="assets/icons/car-svgrepo-com.svg" style="width: 30px; height: 30px;">`;
      this.marcador = new mapboxgl.Marker({ element: iconoPersona, draggable: !this.soloLectura })
        .setLngLat(coords)
        .addTo(this.mapa);

      this.formGroup.patchValue({
        latitud: coords[1],
        longitud: coords[0],
      });

      if (this.latitudOrigen !== undefined && this.longitudOrigen !== undefined) {
        const iconoOrigen = document.createElement('div')
        iconoOrigen.innerHTML = `<img src="assets/icons/package-check-svgrepo-com.svg" style="width: 30px; height: 30px;">`;
        new mapboxgl.Marker({ element: iconoOrigen })
          .setLngLat([this.longitudOrigen, this.latitudOrigen])
          .addTo(this.mapa);
      }
      if (this.latitudDestino !== undefined && this.longitudDestino !== undefined) {
        const iconoDestino = document.createElement('div')
        iconoDestino.innerHTML = `<img src="assets/icons/delivery-svgrepo-com.svg" style="width: 30px; height: 30px;">`;
        new mapboxgl.Marker({ element: iconoDestino })
          .setLngLat([this.longitudDestino, this.latitudDestino])
          .addTo(this.mapa);
      }      

      if (!this.soloLectura) {
        this.marcador.on('dragend', async () => {
          const { lng, lat } = this.marcador.getLngLat();
          this.formGroup.patchValue({ latitud: lat, longitud: lng });
          await this.obtenerDireccionDesdeCoordenadas(lat, lng);
        });
      
        this.mapa.on('click', async (e) => {
          const { lng, lat } = e.lngLat;
          this.marcador.setLngLat([lng, lat]);
          this.formGroup.patchValue({ latitud: lat, longitud: lng });
          await this.obtenerDireccionDesdeCoordenadas(lat, lng);
        });
      }
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }

  private async obtenerDireccionDesdeCoordenadas(lat: number, lng: number): Promise<void> {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${environment.mapboxAccessToken}`);
    const data = await response.json();
    const features = data.features;
    let numeroVia = '';
    let nombreVia = '';
    let direccion = '';
  
    const pais = features.find((f: any) => f.place_type.includes('country'))?.text || '';
    const departamento = features.find((f: any) => f.place_type.includes('region'))?.text || '';
    const ciudad = features.find((f: any) => f.place_type.includes('place'))?.text || '';
    const corregimiento = features.find((f: any) => f.place_type.includes('locality') || f.place_type.includes('district') || f.place_type.includes('neighborhood'))?.text || '';
    
    const viaFeature = features.find((f: any) => f.place_type.includes('address'));
    if (viaFeature) {
      const texto = viaFeature.text; 
      const partes = texto.split(' ');
      const placeName = viaFeature.place_name;
      console.log("dirección: " + placeName)
      console.log("texto: " + direccion)
  
      nombreVia = partes[0] || '';     
      numeroVia = partes[1] || '';   
      const regexDireccionEspacio = /(\d+[a-zA-Z]?)\s+(\d+[a-zA-Z]?)(?=,|$)/;
      const match = regexDireccionEspacio.exec(placeName);
      direccion = match ? `${match[1]}-${match[2]}` : '';
    }

    this.formGroup.patchValue({
      nombrePais: pais,
      nombreDepartamento: departamento,
      nombreCiudad: ciudad,
      nombreCorregimiento: corregimiento,
      nombreVia: nombreVia,
      numeroVia: numeroVia,
      direccion: direccion
    });
  }

  async buscarDireccion() {
    if (!this.busqueda || this.busqueda.length < 3) return;

    const encoded = encodeURIComponent(this.busqueda);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?access_token=${environment.mapboxAccessToken}&limit=1&country=co`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.features.length) {
        const [lng, lat] = data.features[0].center;

        this.mapa.flyTo({ center: [lng, lat], zoom: 15 });

        this.marcador.setLngLat([lng, lat]);

        this.formGroup.patchValue({
          latitud: lat,
          longitud: lng
        });

        await this.obtenerDireccionDesdeCoordenadas(lat, lng);
      }
    } catch (err) {
      console.error('Error al buscar la dirección:', err);
    }
  }
  
  

  public redibujarMapa() {
    setTimeout(() => {
      if (this.mapa) {
        this.mapa.resize();
      }
    }, 300);
  }

  public moverMarcador(lat: number, lng: number) {
    if (this.marcador) {
      this.marcador.setLngLat([lng, lat]);
      this.mapa.flyTo({ center: [lng, lat], zoom: 15 }); 
    }
  }  
}