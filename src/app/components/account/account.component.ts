import { Component, OnInit } from '@angular/core';
import User from '../../models/user.model';
import { AccountService } from '../../services/account.service';
import { CurrencyService } from '../../services/currency.service';
import PortfolioError from '../../models/portfolio.error'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  loading:boolean;
  user: User;
  verify: boolean;
  portfolioError:PortfolioError;
  showError: boolean;
  
  constructor(private accountService:AccountService, private currencyService:CurrencyService) { }
  
  ngOnInit() {
     this.loading = true;
     this.getAccount();

     this.portfolioError = {
      name: "",
      message: "",
      action: ""
     }
  }

  showLoading(){
    this.loading = true;
  }

  hideLoading(){
    this.loading = false;
  }

  getAccount(){
    this.accountService.account().subscribe(
      user => {
          this.hideLoading();
          if(user){
             this.user = user;
          }
      }, error => {
         this.hideLoading();
      }
    );
  }

  showVerify(){
    this.verify = true;
  }

  closeVerify = function(){
    this.verify = false;
  }

  reloadParent = function(currency){
     this.verify = false;
     this.loading = true;
     this.user = {};
     this.getAccount();
  }

  openError(){
    this.closeVerify();
    this.portfolioError.name = "File Not Uploaded";
    this.portfolioError.message = "The file could not be uploaded. Please try again later";
    this.showError = true;
  }
 
  closeError(){
    this.showError = false;
  }

  cashout(){

  }
}
