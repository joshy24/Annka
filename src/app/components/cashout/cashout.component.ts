import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { CurrencyService } from '../../services/currency.service';
import PortfolioError from '../../models/portfolio.error';
import Asset from '../../models/asset.model';
import Portfolio from '../../models/portfolio.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.component.html',
  styleUrls: ['./cashout.component.css']
})
export class CashoutComponent implements OnInit {

  portfolio:Portfolio;
  asset:Asset;
  private portfolio_id:string;
  private asset_id:string;
  asset_codes: String;
  showMessage:boolean;
  location:string;

  constructor(private url_location: Location, private portfolioService:PortfolioService, private  currencyService: CurrencyService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
     this.portfolio_id = this.route.snapshot.paramMap.get('portfolio');
     this.asset_id = this.route.snapshot.paramMap.get('asset');

     if(this.asset_id!="all"){
        this.portfolioService.asset(this.asset_id).subscribe(asset => {
          if(asset!=null&&asset!=undefined){
            this.asset = asset;
          }
        }, error => {
              
        })
     }

     this.portfolioService.portfolio(this.portfolio_id).subscribe(portfolio => {
      if(portfolio!=null&&portfolio!=undefined){
         this.portfolio = portfolio;

         this.asset_codes = "";
         this.portfolio.assets.forEach((asset) => {
            this.asset_codes+= " "+asset.market_code+" ";
         });
      }
     }, error => {

     })
  }

  cashout(location){
    switch(location){
      case "wallet":
        this.location = "Annka Wallet";
        break;
      case "bank":
        this.location = "Bank Account";
        break;
    }
    this.openMessage();
  }

  continueCashout(){
    if(!this.location){
      return;
    }
    var location = this.location=="Annka Wallet"?  "wallet" : "bank";

    this.portfolioService.cashout(this.portfolio._id, this.asset._id, location).subscribe(res => {
      console.log(res)
      if(res=="success"){
         //All good
        
      }
      else{
         switch(res){

         }
      }
    }, err => {

    })
  }

  openMessage(){
    this.showMessage = true;
  }

  closeMessage(){
    this.showMessage = false;
  }

  goBack(){
    this.url_location.back();
  }

}
