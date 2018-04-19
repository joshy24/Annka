import { Component, OnInit, ViewChild, Optional, Self } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import { BitrexService } from '../../services/bitrex.service';
import { AccountService } from '../../services/account.service';
import Portfolio from '../../models/portfolio.model';
import Currency from '../../models/currency.model';
import User from '../../models/user.model'
import PortfolioError from '../../models/portfolio.error'
import { PiedataService } from "../../services/piedata.service";
import { PortfolioService } from "../../services/portfolio.service";
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})

export class PurchaseComponent implements OnInit {
  asset_codes: String;
  portfolio:Portfolio;
  user: User;
  currency: String;
  currencyLong: string;
  portfolioError:PortfolioError;
  showError: boolean;
  showPurchaseMessage: boolean;
  search: boolean;
  ticker:Number;
  interval:any;
  loading:boolean;
  create_loading:boolean;
  showInvestMessage:boolean;
  @ViewChild(SnackbarComponent) snackbar:SnackbarComponent;
  @ViewChild(MessageComponent) message:MessageComponent;

  constructor(private portfolioService:PortfolioService, private accountService:AccountService, private router:Router, private route: ActivatedRoute, public currencyService:CurrencyService, private bitrexService: BitrexService, private piedataService:PiedataService) {
     
  }
  
  ngOnInit() {
      this.currencyService.currency.subscribe(c => {
         if(c!=null&&c!=undefined){
            this.currency = c;
         }
         else{
            this.currency="BTC";
         }
         
      });
      
      if(this.currencyService.currencies==null){
        this.currencyService.getCurrencies().subscribe(response => {
          if(response){
             this.setCurrencyLong();
          }
        })
      }
      else{
        this.setCurrencyLong();
      }

      this.getUser();

      this.portfolio = new Portfolio();
      this.portfolio.name = "";
      this.portfolio.amount = 0;
      this.asset_codes = "";
      this.portfolioError = {
          name: "",
          message: "",
          action: ""
      }

      //get ticker
      this.getRate();

      //reload all tickers
      this.setIntervalCount();

      this.closeError();

      if(!localStorage.getItem("purchase_msg")){
        this.message.showMessage("Create Portfolio", ["Creating a Portfolio and investing in a crypto asset go hand in hand on Annka.", "The idea is to have a porfolio of one or more crypto assets and let the portfolio grow as a whole."]);
        localStorage.setItem("purchase_msg", "set");
      }
  }

  setCurrencyLong(){
    this.currencyService.currencies.map((c)=> {
      if(c.Currency==this.currency){
          this.currencyLong = c.CurrencyLong;
      }
    })
  }

  setIntervalCount(){
    this.interval = setInterval(() => {
      this.showLoading();
      this.currencyService.getRate(this.currency).subscribe(res => {
        this.ticker = res;
        this.hideLoading();
      }, err => {
        this.ticker = 0;
        this.hideLoading();
      })
    }, 60000)
  }

  getRate(){
    this.showLoading();
    this.currencyService.getRate(this.currency).subscribe(res => {
        this.ticker = res;
        this.hideLoading();
    }, err => {
      this.ticker = 0;
      this.hideLoading();
    })
  }
  
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  
  closeInvestmentMessage(){
    this.showInvestMessage = false;
  }

  openInvestmentMessage(){
    this.message.showMessage("Create Portfolio", ["Creating a Portfolio and investing in a crypto asset go hand in hand on Annka.", "The idea is to have a porfolio of one or more crypto assets and let the portfolio grow as a whole."]);
  }

  showLoading(){
    this.loading = true;
  }

  hideLoading(){
    this.loading = false;
  }

  showCreateLoading(){
    this.create_loading = true;
  }

  hideCreateLoading(){
    this.create_loading = false;
  }

  openError(){
      this.showError = true;
  }

  closeError(){
      this.showError = false;
  }

  openPurchaseMessage(){
     this.showPurchaseMessage = true;
  }

  closePurchaseMessage(){
    this.showPurchaseMessage = false;
  }

  getUser(){
    this.accountService.account().subscribe( 
      user => {
       this.user = user;
    }, error => {
      
    })
  }

  showPurchase(event){
    console.log(event.target.value)
    this.currency = event.target.value;
    this.setCurrencyLong();
    this.getRate();
    clearInterval(this.interval);
    this.setIntervalCount();
    //this.router.navigate(['/portfolio/new', selectedcurrency.Currency]); 
    return false;
  }

  addAmount(amount:number){
      if((amount) <= this.user.account_balance){
        this.currencyService.currencies.map((c) => {
          if(c.Currency===this.currency){
              this.portfolio.addAsset(c,amount, this.currencyService.getAnnkaRate(amount, this.ticker));
              this.setAssetCodes();
              this.snackbar.showShow("Asset Added - "+this.currencyLong +" ("+this.currency+")");
          }
        })
      }
      else{
        this.portfolioError.name = "Insufficient Funds in Wallet";
        this.portfolioError.message = "The amount in your Annka Wallet is less then the amount you are attempting to invest. Please fund your wallet to proceed";
        this.portfolioError.action = "wallet";
        this.openError();
      }
  }
  
  showFundWallet(){
     //take the user to fund their wallet
     this.closeError();
     this.router.navigate(['/account/fund']);
  }

  submitPortfolio(name){
      name==null?"":name;
      if(this.portfolio.assets==null||this.portfolio.assets.length<=0||name.length<=0){
          //show modal that the user needs to add assets to create portfolio
          this.portfolioError.name = this.portfolio.assets==null||this.portfolio.assets.length<=0 ? "Assets Required" : "Name Required";
          this.portfolioError.message = this.portfolio.assets==null||this.portfolio.assets.length<=0 ? "You need to have a digital asset to your portfolio" : "Your portfolio must have a name";
          this.portfolioError.action = "assets";
          this.openError();
      }
      else{
         //save portfolio then go to portfolio component
         this.portfolio.name = name;

         
         this.openPurchaseMessage();
      }
  }

  continuePurchase(){
      this.closePurchaseMessage();
      this.showCreateLoading()
      this.portfolioService.create(this.portfolio).subscribe( data => {
        this.hideCreateLoading();
        switch(data){
          case "Assets Max Size Reached":
              this.portfolioError.name = "Maximum Size Reached";
              this.portfolioError.message = "You cant own more than 5 Digital Portfolios";
              this.portfolioError.action = "assets";
              this.openError();
          break;
          case "Portfolio Exists":
              this.portfolioError.name = "Portfolio Exists";
              this.portfolioError.message = "A portfolio with that name already exists. Pleasse rename your portfolio";
              this.portfolioError.action = "assets";
              this.openError();
          break;
          case "Insufficient Funds":
              this.portfolioError.name = "Insufficient Funds in Wallet";
              this.portfolioError.message = "The amount in your wallet is less then the amount you are attempting to invest. Please fund your wallet to proceed";
              this.portfolioError.action = "wallet";
              this.openError();
          break;
          default :
              this.router.navigate(['/portfolio', data]); 
          break;
        }
    }, error => {
      this.hideCreateLoading();
      this.portfolioError.name = "Asset Not Purchased";
      this.portfolioError.message = "We could not purchase the asset you requested. Please try again";
      this.portfolioError.action = "assets";
      this.openError();
    })
  }

  setAssetCodes(){
      this.asset_codes = "";
      this.portfolio.assets.forEach((p) => {
        this.asset_codes+= " "+p.market_code+" ";
      })
  }

  showSearch(){
     this.search = true;
  }

  closeSearchFromParent = function(){
     this.search = false;
  }

  addAssetToParent = function(currency){
    this.search = false;

    this.currency = currency;
    this.currencyService.changeCurrency(currency);
    this.setCurrencyLong();
    this.getRate();
    clearInterval(this.interval);
    this.setIntervalCount();
    
    return false;
  }

}
