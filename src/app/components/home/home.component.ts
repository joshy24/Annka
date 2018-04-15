import { Component, OnInit } from '@angular/core';
import Portfolio from '../../models/portfolio.model';
import Currency from '../../models/currency.model';
import { Router } from '@angular/router';
import { BitrexService } from '../../services/bitrex.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  portfolio: Portfolio[];
  selected_currencies: Currency[];
  priority_currencies: String[];
  search: boolean;
  loading:boolean = true;

  constructor( private bitrexService: BitrexService, private router:Router, private currencyService:CurrencyService ) { }

  ngOnInit() {
      this.priority_currencies = ["BTC", "ETH", "XRP"];
      this.selected_currencies = [];

      this.currencyService.getCurrencies().subscribe(res => {
        this.loading = false;
          if(res){
            this.currencyService.currencies.map(c => {
                if(this.priority_currencies.includes(c.Currency)){
                    this.selected_currencies.push(c);
                }
            })
          }
          else{
              
          }
      }, err => {
        this.loading = false;
      });
  }
  
  buyAsset(i){
      this.currencyService.changeCurrency(this.priority_currencies[i]);
      this.router.navigate(['/portfolio/new']);
      return false;
  } 

  showSearch(){
      this.search = true;
  }

  closeSearchFromParent = function(){
      this.search = false;
  }

  addAssetToParent = function(currency){
      this.search = false;
      this.currencyService.changeCurrency(currency);
      this.router.navigate(['/portfolio/new']);
  }

}
