import { Component, OnInit, Input } from '@angular/core';
import Portfolio  from '../../models/portfolio.model';

@Component({
  selector: 'portfoliopre',
  templateUrl: './portfoliopre.component.html',
  styleUrls: ['./portfoliopre.component.css']
})

export class PortfoliopreComponent implements OnInit {
  @Input() portfolio:Portfolio;
  assets:string;

  constructor() { }

  ngOnInit() {
    this.assets = "";
    this.portfolio.assets.forEach(ass => {
        this.assets+=" "+ass.market_code+" ";
    });
  }

}
