import { Component, OnInit } from '@angular/core';
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
  user_name:String;

  ngOnInit() {
    this.user_name = this.authService.getLoggedInUser().firstname;
    console.log(this.user_name)
  }

  constructor(public authService:AuthService, public accountService:AccountService, private router: Router){
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }  
    
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

  gohome(){
    this.router.navigate(['/']);
  }

}
