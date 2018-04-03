import { Injectable } from '@angular/core';
import Currency from '../models/currency.model';
import Ticker from '../models/ticker.model';
import {Response} from '@angular/http';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResourceService } from './resource.service';

@Injectable()
export class CurrencyService {
  currencies: Currency[];
  prices:number[] = [5000, 10000, 20000, 30000, 50000, 60000, 80000,100000];

  private get_currencies_url = "/currencies";
  private ticker_url = "/ticker";

  constructor(private resourceService:ResourceService, private http: HttpClient) { }

  setImages(){
    this.currencies.forEach(c => {
       c.Image_url = c.Currency.toLowerCase();
    })
  }

  getCurrencies(): Observable<boolean>{
      return this.http.get(`${this.resourceService.getBaseUrl()+this.get_currencies_url}`, {})
      .map((res:Currency[])  => {
        //Maps the response object sent from the server
        this.currencies = res;

        this.currencies.map(c => {
            c.Image_url = c.Currency.toLowerCase();
        })

        return true;
      }, error => {
        return false;
      })
  }

  getRate(currency):Observable<number>{
      return this.http.post(`${this.resourceService.getBaseUrl()+this.ticker_url}`,{currency},{
        headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")
      })
      .map((res:Value)  => {
        //Maps the response object sent from the server
        return res.value;

      }, error => {
        return null;
      })
  }
  
  getAmount(amount){
    var a = amount.toString();
    
    switch(a.length){
      case 4:
        return a.slice(0,1) +"," +a.slice(1);
      case 5:
        return a.slice(0,2) +"," +a.slice(2);
      case 6:
        var am = a.slice(0,3) +"," +a.slice(3);
        return am;
      case 7:
        return a.slice(0,1) +"," +a.slice(1,4)+","+a.slice(4);
      default: 
        return a;
    }
    
  }

  getNairaAnnkaRate(amount){
    return Math.round(amount*0.94);
  }
  
  getAnnkaRate(amount, value){
    var num = amount/value;
    
    return num*0.94;
  }

  getPercentageChange(old_amt, new_amt){
     return Math.round((Math.abs((new_amt-old_amt)/old_amt))*100);
  }
  
  getAmountChange(old_amt, new_amt){
    return Math.abs(new_amt-old_amt);
  }

  getChangeDirection(old_amt, new_amt){
     return new_amt>=old_amt;
  }

}

interface Value{
  value:number;
}
