import { Component, OnInit, ViewChild } from '@angular/core';
import User from '../../models/user.model';
import { AccountService } from '../../services/account.service';
import { CurrencyService } from '../../services/currency.service';
import PortfolioError from '../../models/portfolio.error'
import { Router } from '@angular/router';
import { SnackbarComponent } from '../snackbar/snackbar.component';

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
  sending_loading:boolean;
  @ViewChild(SnackbarComponent) snackbar:SnackbarComponent;
  
  constructor(private accountService:AccountService, private currencyService:CurrencyService, private router: Router) { }
  
  ngOnInit() {
     this.loading = true;
     this.getAccount();

     this.portfolioError = {
      name: "",
      message: "",
      action: ""
     }
  }

  ngOnDestroy() {
    this.snackbar.hideShow();
  }

  showLoading(){
    this.loading = true;
  }

  hideLoading(){
    this.loading = false;
  }

  showSedningLoading(){
    this.sending_loading = true;
  }

  hideSendingLoading(){
    this.sending_loading = false;
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
  
  resendEmail(){
     this.showSedningLoading();
     this.accountService.resendMail().subscribe(res => {
        this.hideSendingLoading()
        if(res){
           //this.showLoading()
           this.snackbar.showShow("Email Was sent")
           this.getAccount()
        }
     }, error => {
       this.hideSendingLoading()
     })
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

  showCashout(){
     if(this.user.account_balance<=0){
        this.portfolioError.name = "Insufficient Funds";
        this.portfolioError.message = "You Dont have enough funds in your wallet to cashout";
        this.showError = true;
     }else{
       this.router.navigate([ "/cashout/wallet" ]);
     }
  }
}
