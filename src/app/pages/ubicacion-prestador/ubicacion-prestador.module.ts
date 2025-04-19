import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { MapaPrestador } from './ubicacion-prestador';

const routes: Routes = [{ path: '', component: MapaPrestador }];


@NgModule({
  imports:[CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations:[MapaPrestador]
})
export class UbicacionPrestadorModule { }
