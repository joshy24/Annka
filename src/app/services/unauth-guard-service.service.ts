import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service.service';

@Injectable()
export class UnauthGuardService implements CanActivate{

  constructor(private authService:AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    
    if (!this.authService.isUserAuthenticated()) {
      return true; 
    }
        
    this.router.navigate([ this.authService.getAccountUrl() ]);

    return false;
}

canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    /*let loggedInUser = this.authService.getLoggedInUser();
    if (loggedInUser.role === 'ADMIN') {
          return true;		
    } else {
    console.log('Unauthorized to open link: '+ state.url);
    return false;
    }*/
    return true;
}  

}
