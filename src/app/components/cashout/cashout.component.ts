import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { CurrencyService } from '../../services/currency.service';
import PortfolioError from '../../models/portfolio.error';
import Asset from '../../models/asset.model';
import Portfolio from '../../models/portfolio.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.component.html',
  styleUrls: ['./cashout.component.css']
})
export class CashoutComponent implements OnInit, AfterContentInit {

  portfolio:Portfolio;
  asset:Asset;
  private portfolio_id:string;
  private asset_id:string;
  asset_codes: String;
  showMessage:boolean;
  location:string;
  cash_outloading:boolean;
  @ViewChild(MessageComponent) message:MessageComponent;

  constructor(private url_location: Location, private portfolioService:PortfolioService, private  currencyService: CurrencyService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
     this.portfolio_id = this.route.snapshot.paramMap.get('portfolio');
     this.asset_id = this.route.snapshot.paramMap.get('asset');

     this.portfolioService.portfolio(this.portfolio_id).subscribe(portfolio => {
      if(portfolio!=null&&portfolio!=undefined){
         this.portfolio = portfolio;

         this.asset_codes = "";
         this.portfolio.assets.forEach((asset) => {
            this.asset_codes+= " "+asset.market_code+" ";
            if(asset._id==this.asset_id){
              this.asset = asset;
            }
         });
      }
     }, error => {

     })
  }

  ngAfterContentInit(){
    console.log("This is when we got here")
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

      this.closeMessage();
      this.showCashLoading();
      this.portfolioService.cashout(this.portfolio._id, this.asset_id, location).subscribe(res => {
        this.hideCashLoading();
        if(res=="success"){
          //All good
          if(location=="wallet"){
            this.router.navigate(["/account"])
          }
          else{
            this.router.navigate(["/pendingtransactions"])
          }
        }
        else{
          this.message.showMessage("Withdrawal", ["Your withdrawal could not be processed at the moment please try again later."]);
        }
      }, err => {
          this.hideCashLoading();
          this.message.showMessage("Withdrawal", ["Your withdrawal could not be processed at the moment please try again later."]);
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

  showCashLoading(){
    this.cash_outloading = true;
  }

  hideCashLoading(){
    this.cash_outloading = false;
  }

}
