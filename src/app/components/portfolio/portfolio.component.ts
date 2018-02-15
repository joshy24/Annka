import { Component, OnInit } from '@angular/core';
import Portfolio from '../../models/portfolio.model';
import IData from "../../models/IDATA.interface";
import { PiedataService } from "../../services/piedata.service";
import { CurrencyService } from '../../services/currency.service';
import { BitrexService } from '../../services/bitrex.service';
import { PortfolioService } from '../../services/portfolio.service';
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
  private id:string;

  constructor(private portfolioService:PortfolioService,private route: ActivatedRoute, private router:Router, private piedataService:PiedataService, private currencyService:CurrencyService, private bitrexService: BitrexService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('portfolio');
    console.log(this.id);
    this.asset_codes = "";

    this.showEdit = false;

    this.prices = this.currencyService.prices;

    this.selected_amount = this.prices[0];

    this.getPortfolio();

    //this.portfolio = JSON.parse(localStorage.getItem("portfolio"));

    if(this.currencyService.currencies==null){
      this.bitrexService.getCurrencies().subscribe(response => {
        this.currencies = response;
        this.currencyService.currencies = response;
        this.selected_currency = this.currencies[0];
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
      console.log(error);
    })
  }

  openEdit(){
     this.showEdit = true;
  }

  closeEdit(){
     this.showEdit = false;
  }

  addCurrency(index){
    this.selected_currency = this.currencies[index];
  }

  addAmount(amount){
      this.selected_amount = amount;
  }
  
  AddCurrency(){
    this.closeEdit();
    this.addAsset(this.selected_currency,this.selected_amount);
    this.setPieChart();
    //this.setPercentage();
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

}
