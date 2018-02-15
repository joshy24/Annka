import { Injectable } from '@angular/core';
import User from  '../models/user.model'
import Portfolio from '../models/portfolio.model';
import { HttpClient, HttpParams,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { ResourceService } from './resource.service';

@Injectable()
export class PortfolioService {
  private portfolio_create_url = "/portfolio/create";
  private portfolio_all_url = "/portfolio/all";
  private portfolio_one_url = "/portfolio/one";

  constructor(private resourceService:ResourceService,private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
  
  portfolios():Observable<Portfolio[]>{
      return this.http.post(this.resourceService.getBaseUrl()+this.portfolio_all_url, {},{
        headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")
      })
      .map((portfolio:Portfolio[]) => {
          
          if(portfolio){
            return portfolio;  
          }
          else{
            return null;
          }
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  create(portfolio:Portfolio):Observable<string>{
    return this.http.post(this.resourceService.getBaseUrl()+this.portfolio_create_url, portfolio,{
      headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")
    })
    .map((portfolio:Portfolio[]) => {
        if(portfolio){
          return portfolio;  
        }
        else{
          return null;
        }
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  portfolio(id):Observable<Portfolio>{
    return this.http.post(this.resourceService.getBaseUrl()+this.portfolio_one_url, {id:id} ,{
      headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")
    })
    .map((portfolio:Portfolio) => {
        if(portfolio){
          return portfolio;  
        }
        else{
          return null;
        }
    })
    .pipe(
      catchError(this.handleError)
    )
  }

}
