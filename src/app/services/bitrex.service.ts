import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import Currency from '../models/currency.model';
import Ticker from '../models/ticker.model';
import {Response} from '@angular/http';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';


@Injectable()
export class BitrexService {
  //https://bitrex.com/api/v1.1/public/getcurrencies
  get_currencies_url = "http://localhost:3020/currencies";
  get_payment_url = "http://localhost:3020/account/fund";
  get_ticker_url = "https//bitrex.com/api.v1.1/public/getticker";

  constructor(private http: HttpClient) {

  }

  getCurrencies(): Observable<Currency[]>{
      return this.http.get(`${this.get_currencies_url}`, {})
      .map(res  => {
        //Maps the response object sent from the server
        return res["result"] as Currency[];
      })
  }

}
