import { Component, OnInit, Input } from '@angular/core';
import Portfolio  from '../../models/portfolio.model';
import { CurrencyService } from '../../services/currency.service';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'portfoliopre',
  templateUrl: './portfoliopre.component.html',
  styleUrls: ['./portfoliopre.component.css']
})

export class PortfoliopreComponent implements OnInit {
  @Input() portfolio:Portfolio;
  assets:string;

  constructor(private currencyService:CurrencyService, public resourceService:ResourceService) { }
  
  ngOnInit() {
    this.assets = "";
    this.portfolio.assets.forEach(ass => {
        this.assets+=" "+ass.market_code+" ";
    });
  }

}
