import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import User from '../../models/user.model'
import PortfolioError from '../../models/portfolio.error'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  invalidCredentialMsg: string;
  signupForm: FormGroup;
  showConfirm:boolean;
  loading:boolean;
  portfolio_url:string;
  portfolioError:PortfolioError;
  showError: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
      this.signupForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        photo_url: new FormControl(''),
        firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
        phone_number: new FormControl('', [Validators.pattern('/^[0-9]+$/'), Validators.minLength(11)]),
        account_bank: new FormControl('', [Validators.required, Validators.minLength(3)]),
        account_number: new FormControl('', [Validators.required, Validators.minLength(8)]),
        terms: new FormControl(false)
      });

      this.portfolio_url = "/portfolio/all";

      this.showConfirm = false;
      this.loading = false;

      this.portfolioError = {
        name: "",
        message: "",
        action: ""
      }
  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }
  get photo_url() { return this.signupForm.get('photo_url'); }
  get firstname() { return this.signupForm.get('firstname'); }
  get lastname() { return this.signupForm.get('lastname'); }
  get account_bank() { return this.signupForm.get('account_bank'); }
  get phone_number(){return this.signupForm.get('phone_number'); }
  get account_number() { return this.signupForm.get('account_number'); }
  get terms() { return this.signupForm.get('terms'); }

  openConfirm(){
    this.showConfirm = true;
  }

  closeConfirm(){
    this.showConfirm = false;
  }

  showLoading(){
    this.loading = true;
  }

  hideLoading(){
    this.loading = false;
  }

  processForm(){
    this.closeConfirm();
    this.showLoading();

    var user:User = this.signupForm.value;
          
    this.authService.signup(user).subscribe(
        authenticated => {
            this.hideLoading();
            if(authenticated) {
              let url =  this.authService.getRedirectUrl(); 
              
              this.router.navigate([ this.portfolio_url ]);	
              				  
            } 
            else {
              
            }
        }, error => {
           this.hideLoading();
           this.portfolioError.name = "Signup Message";

            switch(error){
                case "User Not Found":
                  
                break;
                case "Server Error":
                  this.portfolioError.message = "Login could not be processed at this moment. Please try again later";
                break
                case "Wrong Password":
                  
                break;
            }

            this.openError();
        }
    );
  }

  onFormSubmit() {
    this.invalidCredentialMsg = '';
    if(this.signupForm.valid) {
      if(this.signupForm.value.terms){
        if(this.signupForm.value.password==this.signupForm.value.confirmPassword){
            this.openConfirm();
        }
        else{
          this.invalidCredentialMsg = 'Passwords Dont match';
        }
      }
      else{
        this.invalidCredentialMsg = 'You must agree to terms and conditions';
      }
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
