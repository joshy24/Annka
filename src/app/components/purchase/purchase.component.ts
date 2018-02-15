import { Component, OnInit, ViewChild, Optional, Self } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import { BitrexService } from '../../services/bitrex.service';
import { AccountService } from '../../services/account.service';
import Portfolio from '../../models/portfolio.model';
import Currency from '../../models/currency.model';
import User from '../../models/user.model'
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
  currencies: Currency[];
  portfolioError:portfolioError;
  showError: boolean;

  constructor(private portfolioService:PortfolioService, private accountService:AccountService, private router:Router, private route: ActivatedRoute, private currencyService:CurrencyService, private bitrexService: BitrexService, private piedataService:PiedataService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    } 
  }
  
  ngOnInit() {
    this.currency = this.route.snapshot.paramMap.get('currency');
  
    if(this.currencyService.currencies==null){
        this.bitrexService.getCurrencies().subscribe(response => {
          this.currencies = response;
          this.currencyService.currencies = response;
          response.map((c)=> {
              if(c.Currency==this.currency){
                  this.currencyLong = c.CurrencyLong;
              }
          })
        })
    }
    else{
      this.currencies = this.currencyService.currencies;
      this.currencies.map((c)=>{
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
    this.showError = false;
  }

  openError(){
      this.showError = true;
  }

  closeError(){
      this.showError = false;
  }

  getUser(){
    this.accountService.account().subscribe( 
      user => {
       this.user = user;
    }, error => {
      this.router.navigate(['/login']);
    })
  }

  showPurchase(selectedcurrency){
    this.currency = selectedcurrency.Currency;
    this.currencyLong = selectedcurrency.CurrencyLong;
    this.router.navigate(['/portfolio/new', selectedcurrency.Currency]); 
    return false;
  }

  addAmount(amount:number){
      if((this.portfolio.amount + amount) <= this.user.account_balance){
        this.currencies.map((c) => {
          if(c.Currency===this.currency){
              this.portfolio.addAsset(c,amount);
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

         this.portfolioService.create(this.portfolio).subscribe( data => {
            switch(data){
               case "max reached":
               break;
               case "portfolio exists":
               break;
               case "insufficient funds":
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

         })

      }
  }

  setAssetCodes(){
      this.asset_codes = "";
      this.portfolio.assets.forEach((p) => {
      this.asset_codes+= " "+p.market_code+" ";
    })
  }

}

interface portfolioError{
    name: String;
    message: String;
    action: String;
}
