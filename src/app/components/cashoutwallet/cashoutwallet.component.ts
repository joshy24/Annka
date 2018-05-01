import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { CurrencyService } from '../../services/currency.service'
import PortfolioError from '../../models/portfolio.error'
import User from '../../models/user.model'

@Component({
  selector: 'app-cashoutwallet',
  templateUrl: './cashoutwallet.component.html',
  styleUrls: ['./cashoutwallet.component.css']
})
export class CashoutwalletComponent implements OnInit {
  amountForm: FormGroup;
  loading:boolean;
  user: User;
  portfolioError:PortfolioError;
  showError: boolean;
  showMessage: boolean;
  cash_outloading:boolean;

  constructor(private router: Router, private accountService:AccountService, private currencyService:CurrencyService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    } 
  }

  ngOnInit() {
    this.portfolioError = {
      name: "",
      message: "",
      action: ""
    }

    this.amountForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    });
    
    this.showLoading();
    this.accountService.account().subscribe(user => {
      this.user = user;
      this.hideLoading()
    }, err => {
        this.hideLoading()
    });
  }

  get amount() { return this.amountForm.get('amount'); }

  showLoading(){
    this.loading = true;
  }

  hideLoading(){
    this.loading = false;
  }

  showCashLoading(){
    this.cash_outloading = true;
  }

  hideCashLoading(){
    this.cash_outloading = false;
  }

  openError(){
    this.showError = true;
  }

  closeError(){
      this.showError = false;
  }

  openMessage(){
    this.showMessage = true;
  }

  closeMessage(){
    this.showMessage = false;
  }

  continueCashout(){
    this.closeMessage();
    this.showCashLoading();
    this.accountService.cashout(this.amountForm.value.amount).subscribe(res => {
        this.hideCashLoading();
        if(res=="success"){
          this.router.navigate([ "/pendingtransactions" ]);
        }
        else{
          this.portfolioError.name = "Withdrawal"
          this.portfolioError.message = "Your withdrawal could not be processed at the moment please try again later."
          this.openError();
        }
    }, err => {
       this.hideCashLoading();
          this.portfolioError.name = "Withdrawal"
          this.portfolioError.message = "Your withdrawal could not be processed at the moment please try again later."
          this.openError();
    })
  }

  onFormSubmit(){
    if(this.user.account_balance>0){
        if(this.amountForm.valid){
          if(this.amountForm.value.amount>0&&this.amountForm.value.amount<=this.user.account_balance){
              this.openMessage();
          }
          else{
            this.portfolioError.name = "Invalid Amount"
            this.portfolioError.message = "Please Enter an Amount that is Greater than ₦50 and less than ₦"+this.currencyService.getAmount(this.user.account_balance)
            this.openError();
          }
        }
        else{
          this.portfolioError.name = "Invalid Amount"
          this.portfolioError.message = "Please Enter an Amount that is Greater than ₦50 and less than ₦"+this.currencyService.getAmount(this.user.account_balance)
          this.openError();
        }
    }
    else{
        this.portfolioError.name = "Wallet Not Funded"
        this.portfolioError.message = "You cant request a Wallet Withdrawal. Please Fund Your Annka Wallet"
        this.openError();
    }
  }

}
