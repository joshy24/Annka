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
      .map(res  => {
        //Maps the response object sent from the server
        this.currencies = res["result"];

        this.currencies.map(c => {
            c.Image_url = c.Currency.toLowerCase();
        })

        return true;
      }, error => {
        return false;
      })
  }

  getRate(amount):Observable<number>{
      return this.http.post(`${this.resourceService.getBaseUrl()+this.ticker_url}`,{amount},{
        headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")
      })
      .map((res:Value)  => {
        //Maps the response object sent from the server
        return res.value;

      }, error => {
        return null;
      })
  }

}

interface Value{
  value:number;
}
