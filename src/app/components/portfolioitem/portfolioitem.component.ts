import { Component, OnInit, Input } from '@angular/core';
import Asset from '../../models/asset.model';
import { CurrencyService } from '../../services/currency.service'

@Component({
  selector: 'portfolioitem',
  templateUrl: './portfolioitem.component.html',
  styleUrls: ['./portfolioitem.component.css']
})
export class PortfolioitemComponent implements OnInit {
  @Input() asset:Asset;

  constructor(private currencyService:CurrencyService) { }

  ngOnInit() {
    
  }

  cashOut(){
     //perform cash out of asset
  }

}
