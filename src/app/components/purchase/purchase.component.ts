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

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})

export class PurchaseComponent implements OnInit {
  asset_codes: String;
  portfolio:Portfolio;
  user: User;
  currency: string;
  currencyLong: string;
  portfolioError:PortfolioError;
  showError: boolean;
  showPurchaseMessage: boolean;
  search: boolean;
  ticker:Number;
  interval:any;
  loading:boolean;
  create_loading:boolean;

  constructor(private portfolioService:PortfolioService, private accountService:AccountService, private router:Router, private route: ActivatedRoute, public currencyService:CurrencyService, private bitrexService: BitrexService, private piedataService:PiedataService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    } 
  }
  
  ngOnInit() {
    this.currency = this.route.snapshot.paramMap.get('currency');
    
    if(this.currencyService.currencies==null){
      this.currencyService.getCurrencies().subscribe(response => {
        if(response){
          this.currencyService.currencies.map((c)=> {
            if(c.Currency==this.currency){
                this.currencyLong = c.CurrencyLong;
            }
          })
        }
      })
    }
    else{
      this.currencyService.currencies.map((c)=>{
        if(c.Currency==this.currency){
            this.currencyLong = c.CurrencyLong;
        }
      })
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

    this.showLoading();

    this.currencyService.getRate(this.currency).subscribe(res => {
        this.ticker = res;
        this.hideLoading();
    }, err => {
      this.hideLoading();
    })

    this.interval = setInterval(() => {
      this.showLoading();
      this.currencyService.getRate(this.currency).subscribe(res => {
        this.ticker = res;
        this.hideLoading();
      }, err => {
        this.hideLoading();
      })
    }, 60000)

    this.closeError();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
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

  showPurchase(selectedcurrency){
    this.router.navigate(['/portfolio/new', selectedcurrency]); 
    return false;
  }

  addAmount(amount:number){
      if((this.portfolio.amount + amount) <= this.user.account_balance){
        this.currencyService.currencies.map((c) => {
          if(c.Currency===this.currency){
              this.portfolio.addAsset(c,amount, this.currencyService.getAnnkaRate(amount, this.ticker));
              this.setAssetCodes();
          }
        })
      }
      else{
        this.portfolioError.name = "Insufficient Funds in Wallet";
        this.portfolioError.message = "The amount in your wallet is less then the amount you are attempting to invest. Please fund your wallet to proceed";
        this.portfolioError.action = "wallet";
        this.openError();
      }
  }

  confirmAmount(){
    
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
          this.portfolioError.message = this.portfolio.assets==null||this.portfolio.assets.length<=0 ? "You must have digital assets in your portfolio" : "Your portfolio must have a name";
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
     this.router.navigate(['/portfolio/new', currency]);
     return false;
  }

}
