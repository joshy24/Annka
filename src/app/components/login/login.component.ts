import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  account_url:string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
      });

      this.account_url = "/account";
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
                this.router.navigate([ this.account_url ]);					  
              } 
              else {

              }
          }, error => {
           this.hideLoading();
          }
      );
    }
    else{
      this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
    }
  }

}
