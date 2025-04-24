import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule) },
  { path: 'prestador/ubicacion', loadChildren: () => import('./pages/ubicacion-prestador/ubicacion-prestador.module').then(m => m.UbicacionPrestadorModule) },
  { path: 'servicio/todos', loadChildren: () => import('./pages/consulta-servicio/consulta-servicio.module').then(m => m.ConsultaServicioPageModule) },
  { path: 'paquete/servicio/:id/informacion', loadChildren: () => import('./pages/paquete/paquete.module').then(m => m.PaqueteServicioPageModule) },
  { path: 'paquete/peso/:id/informacion', loadChildren: () => import('./pages/peso/peso.module').then(m => m.PesoContenidoPageModule) },
  { path: 'paquete/nuevo/:id', loadChildren: () => import('./pages/paquete-registro/paquete-registro.module').then(m => m.PaqueteRegistroServicioPageModule) },
  { path: 'servicio/nuevo', loadChildren: () => import('./pages/servicio-registro/servicio-registro.module').then(m => m.RegistraServicioPageModule) },
  { path: 'servicio/oferta/todos/:id', loadChildren: () => import('./pages/oferta/oferta.module').then(m => m.OfertaServicioPageModule) },
];

@NgModule({ imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })], exports: [RouterModule] })
export class AppRoutingModule {}
