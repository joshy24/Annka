import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  @Input() currency;
  constructor() { }

  ngOnInit() {
  }

}
