import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from '../shared/storage.service';


@Injectable({
    providedIn: 'root',
  })

  export class JwtInterceptor implements HttpInterceptor {
    constructor(private storageService: StorageService) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.headers.has('Authorization')) {
        return next.handle(req);
      }

        return from(this.storageService.obtener('token')).pipe(
          switchMap(token => {
            if (token) {
              const cloned = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return next.handle(cloned);
            } else {
              return next.handle(req);
            }
          })
        );
      }
    }