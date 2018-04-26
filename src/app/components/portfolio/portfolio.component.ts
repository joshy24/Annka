import { Component, OnInit, ViewChild } from '@angular/core';
import Portfolio from '../../models/portfolio.model';
import IData from "../../models/IDATA.interface";
import { PiedataService } from "../../services/piedata.service";
import { CurrencyService } from '../../services/currency.service';
import { PortfolioService } from '../../services/portfolio.service';
import Currency from '../../models/currency.model';
import Asset from '../../models/asset.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { TransactionmessageComponent } from '../transactionmessage/transactionmessage.component'

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolio: Portfolio;
  showEdit: boolean;
  asset_codes: String;
  currencies: Currency[];
  prices: number[];
  selected_currency:Currency;
  selected_amount:number;
  @ViewChild(MessageComponent) message:MessageComponent;
  @ViewChild(TransactionmessageComponent) transactionmessage:TransactionmessageComponent;
  private id:string;
  private rate: Number;
  ticker:Number;
  interval:any;
  loading:boolean;
  buying:boolean;
  showError: boolean;
  show_amount:boolean;
  search:boolean;

  constructor(private portfolioService:PortfolioService,private route: ActivatedRoute, private router:Router, private piedataService:PiedataService, private currencyService:CurrencyService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('portfolio');
    
    this.asset_codes = "";

    this.showEdit = false;

    this.prices = this.currencyService.prices;

    this.selected_amount = this.prices[0];

    this.getPortfolio();

    if(this.currencyService.currencies==null){
      this.currencyService.getCurrencies().subscribe(response => {
        if(response){
           this.currencies = this.currencyService.currencies;
           this.selected_currency = this.currencies[0];
        }
      })
    }
    else{
      this.currencies = this.currencyService.currencies;
      this.selected_currency = this.currencies[0];
    }
  }

  getPortfolio(){
    this.portfolioService.portfolio(this.id).subscribe(portfolio => {
       if(portfolio!=null&&portfolio!=undefined){
          this.portfolio = portfolio;
          this.setPieChart();
       }
    }, error => {
      
    })
  }

  openEdit(){
     this.selected_amount = this.currencyService.prices[0];
     this.rate = 0;

     this.showSearch();
  }

  closeEdit(){
     this.showEdit = false;
  }

  addCurrency(index){
    this.selected_currency = this.currencies[index];
    //
    if(this.interval){
       clearInterval(this.interval);
    }

    this.showLoading();
    this.currencyService.getRate( this.selected_currency.Currency).subscribe(res => {
        this.ticker = res;
        this.rate = this.currencyService.getAnnkaRate(this.selected_amount, this.ticker);
        this.hideLoading();
    }, err => {
      this.ticker = 0;
      this.hideLoading();
    })

    this.interval = setInterval(() => {
      this.showLoading();
      this.currencyService.getRate( this.selected_currency.Currency).subscribe(res => {
        this.ticker = res;
        this.rate = this.currencyService.getAnnkaRate(this.selected_amount, this.ticker);
        this.hideLoading();
      }, err => {
        this.ticker = 0;
        this.hideLoading();
      })
    }, 60000)
  }

  addAmount(amount){
      if(!this.ticker||this.ticker==0||!this.selected_currency||this.selected_currency==null||this.selected_currency==undefined){
        this.selected_amount = amount;
        this.rate = this.currencyService.getAnnkaRate(this.selected_amount, this.ticker);
        //show transaction message
        this.closeAmount();
        this.transactionmessage.showMessage("Add Asset", this.selected_currency.Currency +" - "+this.currencyService.getAnnkaRate(this.selected_amount, this.ticker), "Purchasing Digital Assets involves a lot of tedious steps and spending a considerable amount of money just to make a simple transaction go through. Annka removes that complexity and reduces cost significantly with you needing just your credit card and an email address. Because we are bearing the burding and cost of purchasing and maintaining digital assets on your behalf you are charged a blockchain fee and a commision.", this.selected_amount, this.currencyService.getCreationFee(this.selected_amount), this.currencyService.getCreationCommission(this.selected_amount), false, "Blockchain Network Fee");
      }
  }
  
  AddCurrency(){
    this.closeEdit();
    clearInterval(this.interval);
    //this.addAsset(this.selected_currency,this.selected_amount);
    //this.setPieChart();

    this.showBuying();
    this.portfolioService.portfoliobuy(this.selected_amount, this.rate, this.selected_currency, this.portfolio._id).subscribe(portfolio => {
      //reload this portfolio
      this.hideBuying();
      switch(portfolio){
        case "Assets Max Size Reached":
            this.message.showMessage("Maximum Size Reached", ["You cant own more than 5 Crypto Assets in a Portfolio"]);
        break;
        case "Portfolio Exists":
            this.message.showMessage("Asset Exists", ["That asset exists in your portfolio"]);
        break;
        case "Insufficient Funds":
            this.message.showMessage("Insufficient Funds in Wallet", ["The amount in your wallet is less then the amount you are attempting to invest. Please fund your wallet to proceed"]);
        break;
        default:
            this.hideBuying();
            this.showLoading();
            this.getPortfolio();
        break;
      }
    }, err => {
        this.hideBuying();
        this.message.showMessage("Asset Not Purchased", ["We could not purchase the asset you requested. Please try again"]);
    });
  }

 setPieChart(){
    let data: IData[] = [];
    this.asset_codes = "";
    this.portfolio.assets.forEach((asset) => {
      data.push({label: asset.market_code, value: Math.abs((asset.value/this.portfolio.amount)*100)})
      this.asset_codes+= " "+asset.market_code+" ";
      asset.percent = Math.round((asset.value/this.portfolio.amount)*100);
    });

    this.piedataService.addAllData(data);
 }

 cashOut(asset){
   this.router.navigate(['/cashout', this.portfolio._id, asset]); 
 }

 cashOutAll(){
   this.router.navigate(['/cashout', this.portfolio._id, "all"]);
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

 showBuying(){
   this.buying = true;
 }

 hideBuying(){
   this.buying = false;
 }

 closeAmount(){
   this.show_amount = false;
 }

 showAmount(){
    this.show_amount = true;
 }

 performTransaction(){
    this.AddCurrency();
 }

 showSearch(){
   this.closeAmount();
    this.search = true;
 }

 closeSearch(){
  this.search = false;
}

 closeSearchFromParent = function(){
    this.search = false;
 }

 addAssetToParent = function(currency){
    this.closeSearch();
    this.selected_currency = currency;
    //
    if(this.interval){
      clearInterval(this.interval);
    }

    this.showAmount();

    this.showLoading();
    this.currencyService.getRate( this.selected_currency.Currency).subscribe(res => {
          this.ticker = res;
          this.hideLoading();
    }, err => {
          this.ticker = 0;
          this.hideLoading();
    })

    this.interval = setInterval(() => {
      this.showLoading();
      this.currencyService.getRate( this.selected_currency.Currency).subscribe(res => {
        this.ticker = res;
        
        this.hideLoading();
      }, err => {
        this.ticker = 0;
        this.hideLoading();
      })
    }, 60000)
 }

}
