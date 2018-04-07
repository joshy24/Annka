import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import Asset from '../../models/asset.model';
import { CurrencyService } from '../../services/currency.service'

@Component({
  selector: 'portfolioitem',
  templateUrl: './portfolioitem.component.html',
  styleUrls: ['./portfolioitem.component.css']
})
export class PortfolioitemComponent implements OnInit {

  @Input() asset:Asset;

  @Output() cashOut: EventEmitter<String> = new EventEmitter<String>();

  constructor(public currencyService:CurrencyService) { }

  ngOnInit() {
    
  }

  doCashOut(){
     //perform cash out of asset
     this.cashOut.emit(this.asset._id)
  }

}
