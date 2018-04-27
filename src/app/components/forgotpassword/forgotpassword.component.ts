import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  error_message:String;
  loading:boolean;
  showMessage:boolean;
  email:String;
  constructor(private accountService:AccountService, private router:Router) { }

  ngOnInit() {
  }

  reset(email:String){
     this.error_message = "";

     if(email.trim().length<=0||!email.trim().match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)){
        this.error_message = "Please Enter a valid email address";
        return;
     }

     this.showLoading();
     this.email = email;
     //send reset request;
     this.accountService.forgot_password(email).subscribe(res => {
        this.hideLoading();
        if(res=="success"){
          this.openMessage();
        }
        else{

        }
     }, err => {
      this.hideLoading();
      if(err.message = "User Not Found"){
        this.error_message = "That email address was not found. Please enter another email address";
      }
      else{
        this.error_message = "Email Not Sent. Please try again later.";
      }
     })
  }

  showLoading(){
    this.loading = true;
  }

  hideLoading(){
    this.loading = false;
  }

  closeMessage(){
    this.router.navigate(['/login']);
  }

  openMessage(){
    this.showMessage = true;
  }

}
