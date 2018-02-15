import { Component, OnInit, Input } from '@angular/core';
import Asset from '../../models/asset.model';

@Component({
  selector: 'portfolioitem',
  templateUrl: './portfolioitem.component.html',
  styleUrls: ['./portfolioitem.component.css']
})
export class PortfolioitemComponent implements OnInit {
  @Input() asset:Asset;

  constructor() { }

  ngOnInit() {
    
  }

  cashOut(){
     //perform cash out of asset
  }

}
