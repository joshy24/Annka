import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AuthService } from './services/auth-service.service';
import { AccountService } from './services/account.service'
import { Router } from '@angular/router';
import { NameService } from './services/name.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  title = 'app';
  pending:any = 0;
  user_name:String;

  constructor(public nameService:NameService, public authService:AuthService, public accountService:AccountService, private router: Router){
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }  
  }

  ngOnInit() {
    if(this.authService.isUserAuthenticated()){
      this.user_name = this.authService.getLoggedInUser().firstname;

      this.accountService.pendingcount().subscribe(res => {
        this.pending = res
      });
    }
  }

  ngAfterContentInit(){
    this.nameService.name.subscribe(name => {
      if(this.authService.isUserAuthenticated()){
        this.user_name = this.authService.getLoggedInUser().firstname;

        this.accountService.pendingcount().subscribe(res => {
          this.pending = res
        })
      }
    })
  }

  logout(){
     this.authService.logoutUser();
     this.router.navigate(['/login']);
  }

  gohome(){
    this.router.navigate(['/']);
  }

}
