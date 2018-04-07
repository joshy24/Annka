import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'priceitem',
  templateUrl: './priceitem.component.html',
  styleUrls: ['./priceitem.component.css']
})
export class PriceitemComponent implements OnInit {
  @Input() price;
  @Input() currency;
  @Input() ticker;
  @Input() loading;
  
  constructor(public currencyService:CurrencyService) { }

  ngOnInit() {
     
  }

}
