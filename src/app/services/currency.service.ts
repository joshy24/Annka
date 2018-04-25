import { Injectable } from '@angular/core';
import Currency from '../models/currency.model';
import Ticker from '../models/ticker.model';
import {Response} from '@angular/http';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResourceService } from './resource.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CurrencyService {

  private currencySource = new BehaviorSubject<String>("BTC");
  currency = this.currencySource.asObservable();

  changeCurrency(message: String) {
    this.currencySource.next(message)
  }

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

  getWithdrawalAssetsAmount(assets){
    var value = 0;
    assets.map(asset => {
       value+=this.getWithdrawalAmount(asset.value, asset.old_value)
    })

    return value;
  }

  getWithdrawalAmount(amount, old_amount){
    if(amount<=old_amount){ //user did not make profit
      return amount;
    }
    else{ //user made profit
        var profit = amount - old_amount;

        var percent = old_amount * 0.15; 

        if(profit>percent){
            //remove 2%
            return amount - (amount*0.02);
        }
        else{
            //remove 1%
            return amount - (amount*0.01);
        }

    }
  }

  getNairaAnnkaRate(amount){
    if(amount==0){
      return 0;
    }
    else{
      var fee = Math.round(amount*0.97);

      var six = Math.round(amount*0.03)

      if(six>3000){
        fee = amount - 3000;
      }

      return fee;
    }
    
  }
  
  getShortenedValue(val){
    let num = val.toString();
    var arr = num.split(".");

    return arr[0]+"."+arr[1].substring(0,8);
  }

  getAnnkaRate(amount, value){
    if(value==0||amount==0){
       return 0;
    }
    else{
      var fee = Math.round(amount*0.97);

      var six = Math.round(amount*0.03)

      if(six>3000){
        fee = amount - 3000;
      }

      var num = fee/value;
      
      return Number(num.toFixed(8));
    }
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
