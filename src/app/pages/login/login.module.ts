import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';


const routes: Routes = [{ path: '', component: LoginPage }];

@NgModule({
  imports:[CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), 
    ReactiveFormsModule, IonicStorageModule
  ],
  declarations:[LoginPage]
})
export class LoginPageModule {}
