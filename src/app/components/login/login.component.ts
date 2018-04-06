import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import PortfolioError from '../../models/portfolio.error'
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidCredentialMsg: string;
  loginForm: FormGroup;
  loading:boolean;
  portfolio_url:string;
  portfolioError:PortfolioError;
  showError: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
      });

      this.portfolio_url = "/portfolio/all";

      this.portfolioError = {
        name: "",
        message: "",
        action: ""
      }
        
      if(localStorage.getItem("jwt_login_msg")&&localStorage.getItem("jwt_login_msg").length>0){
        //we have a message
        this.portfolioError.name = "Session Expired";
        this.portfolioError.message = localStorage.getItem("jwt_login_msg");
        this.openError();
        localStorage.removeItem("jwt_login_msg");
      }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  showLoading(){
    this.loading = true;
  }

  hideLoading(){
    this.loading = false;
  }

  onFormSubmit() {
    this.invalidCredentialMsg = '';
    if(this.loginForm.valid){ 
      this.showLoading();
      let email = this.loginForm.value.email
      let pwd = this.loginForm.value.password;
      
      this.authService.login(email, pwd).subscribe(
          authenticated => {
            this.hideLoading();
              if(authenticated) {
                this.router.navigate([ this.portfolio_url ]);					  
              } 
              else {

              }
          }, error => {
            
            this.portfolioError.name = "Login Message";

            switch(error){
              case "User Not Found":
                this.portfolioError.message = "The Username or Password is incorrect";
              break;
              case "Server Error":
                this.portfolioError.message = "Login could not be processed at this moment. Please try again later";
              break
              case "Wrong Password":
                this.portfolioError.message = "The Username or Password is incorrect";
              break;
            }

            this.openError();
            this.hideLoading();
          }
      );
    }
    else{
      this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
    }
  }

  openError(){
    this.showError = true;
  }

  closeError(){
      this.showError = false;
  }

}
