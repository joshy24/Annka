import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    
    constructor(private router: Router){
        
    }

    intercept(request: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

            return next.handle(request).do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do stuff with response if you want
                }
                return event;
                }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 403 && err.message === "Token Expired") {
                    // redirect to the login route
                    // or show a modal
                        this.router.navigate([ "/login" ]);
                    }
                }
                });

    }
}
  