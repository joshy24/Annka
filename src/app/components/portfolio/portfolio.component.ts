import { Component, OnInit } from '@angular/core';
import Portfolio from '../../models/portfolio.model';
import IData from "../../models/IDATA.interface";
import { PiedataService } from "../../services/piedata.service";
import { CurrencyService } from '../../services/currency.service';
import { BitrexService } from '../../services/bitrex.service';
import { PortfolioService } from '../../services/portfolio.service';
import PortfolioError from '../../models/portfolio.error'
import Currency from '../../models/currency.model';
import Asset from '../../models/asset.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
  portfolioError:PortfolioError;
  private id:string;
  private rate: Number;
  ticker:Number;
  interval:any;
  loading:boolean;
  buying:boolean;
  showError: boolean;

  constructor(private portfolioService:PortfolioService,private route: ActivatedRoute, private router:Router, private piedataService:PiedataService, private currencyService:CurrencyService, private bitrexService: BitrexService) { }

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

    this.portfolioError = {
      name: "",
      message: "",
      action: ""
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
     this.selected_currency = this.currencyService.currencies[0];
     this.rate = 0;

     this.showLoading();
     this.currencyService.getRate( this.selected_currency.Currency).subscribe(res => {
          this.ticker = res;
          this.rate = this.currencyService.getAnnkaRate(this.selected_amount, this.ticker);
          this.hideLoading();
      }, err => {
          this.hideLoading();
      })
     this.showEdit = true;
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
      this.hideLoading();
    })

    this.interval = setInterval(() => {
      this.showLoading();
      this.currencyService.getRate( this.selected_currency.Currency).subscribe(res => {
        this.ticker = res;
        this.rate = this.currencyService.getAnnkaRate(this.selected_amount, this.ticker);
        this.hideLoading();
      }, err => {
        this.hideLoading();
      })
    }, 60000)
  }

  addAmount(amount){
      this.selected_amount = amount;
      this.rate = this.currencyService.getAnnkaRate(this.selected_amount, this.ticker);
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
            this.portfolioError.name = "Maximum Size Reached";
            this.portfolioError.message = "You cant own more than 5 Crypto Assets in a Portfolio";
            this.portfolioError.action = "assets";
            this.openError();
        break;
        case "Portfolio Exists":
            this.portfolioError.name = "Asset Exists";
            this.portfolioError.message = "That asset exists in your portfolio";
            this.portfolioError.action = "assets";
            this.openError();
        break;
        case "Insufficient Funds":
            this.portfolioError.name = "Insufficient Funds in Wallet";
            this.portfolioError.message = "The amount in your wallet is less then the amount you are attempting to invest. Please fund your wallet to proceed";
            this.portfolioError.action = "wallet";
            this.openError();
        break;
        default:
            this.hideBuying();
            this.showLoading();
            this.getPortfolio();
        break;
      }
    }, err => {
      this.hideBuying();
      this.portfolioError.name = "Asset Not Purchased";
      this.portfolioError.message = "We could not purchase the asset you requested. Please try again";
      this.openError();
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

  addAsset(currency:Currency, amount:number){
    let exists:boolean = false;
   
    var asset:Asset = new Asset();
    asset.image_url = currency.Currency.toLowerCase();
    asset.market_code = currency.Currency;
    asset.name = currency.CurrencyLong;
    asset.quantity = 0.000045//should be calculated;
    asset.value = amount;

    if(this.portfolio.assets!=null&&this.portfolio.assets.length>0){
       this.portfolio.assets.forEach((element, i) => {
         if(element.market_code===currency.Currency){
           //currency exists in portfolio so we are editing it
           exists = true;
           this.portfolio.assets.splice(i,1,asset);
           this.portfolio.amount-=element.value;
           this.portfolio.amount+=amount;
         }
       });
    }

    if(!exists){
       //currency does not exist so we add it
       if(this.portfolio.assets==null||this.portfolio.assets.length<=0){
          this.portfolio.assets = [];
       }
       this.portfolio.amount+=amount;
       this.portfolio.assets.unshift(asset);
    }
    //save portfolio after adding the asset
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

 openError(){
   this.showError = true;
 }

 closeError(){
   this.showError = false;
 }

}
