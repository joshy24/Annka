import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import Currency from '../../models/currency.model';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  @Output() closeClick: EventEmitter<String> = new EventEmitter<String>();
  @Output() assetSet: EventEmitter<String> = new EventEmitter<String>();
  @Input() currencies;
  
  selected_currencies: Currency[];

  constructor() {}

  ngOnInit() {
    this.selected_currencies = this.currencies;
  }

  onKey(value:String){
    this.selected_currencies = [];
    if(value!=null&&value.trim().length>0){
      this.currencies.map(c => {
        if(c.CurrencyLong.toLowerCase().startsWith(value.toLowerCase())){
           this.selected_currencies.push(c);
        }
      });

      if(this.selected_currencies.length==0){
        this.selected_currencies = this.currencies;
      }

    }else{
      this.selected_currencies = this.currencies;
    }
  }

  closeSearch(){
    this.closeClick.emit();
  }

  setCurrency(i){
    this.assetSet.emit(this.selected_currencies[i].Currency);
  }
}
