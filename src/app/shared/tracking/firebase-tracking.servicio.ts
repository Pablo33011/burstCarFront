import { Injectable } from '@angular/core';
import { Database, ref, set, onValue, remove } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class FirebaseTrackingServicio {
  constructor(private db: Database) {}

  actualizarUbicacion(servicioId: string, lat: number, lng: number) {
    const refUbicacion = ref(this.db, `tracking/${servicioId}`);
    console.log("servicioId: " + servicioId);
    return set(refUbicacion, {
      latitud: lat,
      longitud: lng,
      timestamp: Date.now()
    });
  }

  escucharUbicacion(servicioId: string, callback: (data: any) => void) {
    const refUbicacion = ref(this.db, `tracking/${servicioId}`);
    onValue(refUbicacion, (snapshot) => {
      const data = snapshot.val();
      if (data) callback(data);
    });
  }

  eliminarTracking(servicioId: string) {
    const refUbicacion = ref(this.db, `tracking/${servicioId}`);
    return remove(refUbicacion);
  }
}