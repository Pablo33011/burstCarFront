import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _init: Promise<void>;

  constructor(private storage: Storage) {
    this._init = this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
  }

  async obtener(key: string): Promise<any> {
    await this._init;
    return this._storage?.get(key);
  }

  async cargar(key: string, value: any): Promise<any> {
    await this._init;
    return this._storage?.set(key, value);
  }

  async eliminar(key: string): Promise<any> {
    await this._init;
    return this._storage?.remove(key);
  }
}
