import { Component } from '@angular/core';
import { AuthService } from './services/auth-service.service';
import { AccountService } from './services/account.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  pending:any = 0;

  constructor(public authService:AuthService, public accountService:AccountService, private router: Router){
      if(this.authService.isUserAuthenticated()){
          this.accountService.pendingcount().subscribe(res => {
            this.pending = res
          })
      }
  }

  logout(){
     this.authService.logoutUser();
     this.router.navigate(['/login']);
  }

}
