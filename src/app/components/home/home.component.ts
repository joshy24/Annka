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

  constructor( private bitrexService: BitrexService, private router:Router, private currencyService:CurrencyService ) { }

  ngOnInit() {
      this.currencyService.getCurrencies().subscribe(res => {
          if(!res){

          }
      }, err => {

      });
  }
  
  buyAsset(i){
      this.router.navigate(['/portfolio/new', this.currencyService.currencies[i].Currency]);
      return false;
  } 

}
