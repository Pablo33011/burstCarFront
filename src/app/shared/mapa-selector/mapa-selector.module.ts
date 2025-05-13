import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapaSelectorComponent } from './mapa-selector.component'; // ruta según tu proyecto



@NgModule({
  declarations: [MapaSelectorComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [MapaSelectorComponent] 
})
export class MapaSelectorModule { }
