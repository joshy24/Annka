import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'priceitem',
  templateUrl: './priceitem.component.html',
  styleUrls: ['./priceitem.component.css']
})
export class PriceitemComponent implements OnInit, OnDestroy {
  @Input() price;
  @Input() currency;
  
  amount:number;
  loading:boolean;
  interval:any;

  constructor(private currencyService:CurrencyService) { }

  ngOnInit() {
     this.amount = 0;
     this.showLoading();
     this.currencyService.getRate(this.price).subscribe(res => {
        this.hideLoading();
        this.amount = res;
     })

     this.interval = setInterval(() => {
        this.showLoading();
        this.currencyService.getRate(this.price).subscribe(res => {
          this.hideLoading();
          this.amount = res;
        })
     }, 60000)
  }
  
  showLoading(){
    this.loading = true;
  }

  hideLoading(){
    this.loading = false;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
