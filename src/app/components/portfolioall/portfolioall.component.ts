import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import Portfolio from '../../models/portfolio.model';
import { Router } from '@angular/router';

@Component({
  selector: 'portfolioall',
  templateUrl: './portfolioall.component.html',
  styleUrls: ['./portfolioall.component.css']
})
export class PortfolioallComponent implements OnInit {
  portfolios:Portfolio[];
  loading:boolean;
  returned_empty:boolean;

  constructor(private portfolioService:PortfolioService, private router:Router) { }

  ngOnInit() {
      this.returned_empty = false;
      this.showLoading();
      this.getPortfolios();
  }

  showPortfolio(i){
    this.router.navigate(['/portfolio', this.portfolios[i]._id]); 
  }
  
  showLoading(){
    this.loading = true;
  }

  hideLoading(){
    this.loading = false;
  }

  getPortfolios(){
    this.portfolioService.portfolios().subscribe(
      result => {
          this.hideLoading();
          if(result&&result.length==0){
            this.returned_empty = true;
          }

          if(result&&result.length>0){
            this.portfolios = result;
          }
          
      }, error => {
         this.hideLoading();
      }
    );
  }

}
