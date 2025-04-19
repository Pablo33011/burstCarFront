import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ 
    selector:'app-register', 
    templateUrl:'./register.page.html', 
    styleUrls:['./register.page.scss']
})

export class RegisterPage{ 
    constructor(private router: Router) {}
    
    tipoUsuario:string=''; 

    goToMapaPrestador() {
        setTimeout(() => {
          this.router.navigateByUrl('/prestador/ubicacion');
        }, 100);
      }
}