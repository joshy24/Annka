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
                    if (err.status === 403 && err.statusText=="Expired Token") {
                    // redirect to the login route
                    // or show a modal
                        localStorage.removeItem("user");
                        localStorage.removeItem("expires");
                        localStorage.removeItem("token");
                        localStorage.setItem("jwt_login_msg", "Your Session has expired, you need to login with your details");
                        this.router.navigate([ "/login" ]);
                    }
                }

                if(err.status === 400 && err.statusText == "Not Activated"){
                    localStorage.setItem("not_activated", "Your Account Has Not been activated. An activation email was sent to your email address");
                    this.router.navigate([ "/account" ]);
                }
                });

    }
}
  