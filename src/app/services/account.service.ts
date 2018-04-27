import { Injectable } from '@angular/core';
import User from  '../models/user.model'
import AnnkaResponse from '../models/annka.interface'
import Transaction from '../models/transaction.model';
import { HttpClient, HttpParams,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map } from 'rxjs/operators';
import { ResourceService } from './resource.service'

@Injectable()
export class AccountService {

  private account_url = "/account";
  private upload_url = "/upload_verification";
  private bvn_url = "/bvn_verification";
  private pending_count_url = "/pendingtransactionscount";
  private pending_all_url = "/pendingtransactions";
  private cashout_url = "/cashout/wallet";
  private resend_url = "/resend_email";
  private update_url = "/update"
  private forgot_password_url = "/forgot_password"

  constructor(private http: HttpClient, private resourceService:ResourceService) { }

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
  
  account():Observable<User>{
      return this.http.post(this.resourceService.getBaseUrl()+this.account_url, {},{
        headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")
      })
      .map((user: User) => {
          if(user){
            
            return user;  
          }
          else{
            return null;
          }
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  upload(file):Observable<string>{
    return this.http.post(this.resourceService.getBaseUrl()+this.upload_url,file,{
      headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")
    })
    .map((response:AnnkaResponse) => {
        if(response){
          return response;  
        }
        else{
          return null;
        }
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  savebvn(bvn):Observable<string>{
    return this.http.post(this.resourceService.getBaseUrl()+this.bvn_url,{bvn},{
      headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")
    })
    .map((response:AnnkaResponse) => {
        if(response){
          return response;  
        }
        else{
          return null;
        }
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  pendingcount():Observable<number>{
    return this.http.post(this.resourceService.getBaseUrl()+this.pending_count_url,{},{
      headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")
    })
    .map((response:AnnkaResponse) => {
        if(response){
          return response.response;  
        }
        else{
          return null;
        }
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  pendingall():Observable<Transaction[]>{
    return this.http.post(this.resourceService.getBaseUrl()+this.pending_all_url,{},{
      headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")
    })
    .map((response:Transaction[]) => {
        if(response){
          return response;  
        }
        else{
          return null;
        }
    })
    .pipe(
      catchError(this.handleError)
    )
  }
  
  cashout(amount):Observable<String>{
    return this.http.post(this.resourceService.getBaseUrl()+this.cashout_url, {amount} ,{
      headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")
    })
    .map((portfolio:AnnkaResponse) => {
        if(portfolio.response){
          return portfolio.response;  
        }
        else{
          return null;
        }
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  resendMail():Observable<String>{
    return this.http.post(this.resourceService.getBaseUrl()+this.resend_url, {} ,{
      headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")
    })
    .map((result:AnnkaResponse) => {
        if(result.response){
          return result.response;  
        }
        else{
          return null;
        }
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  update(user:User):Observable<String>{
    return this.http.post(this.resourceService.getBaseUrl()+this.update_url,{user}, 
      {
        headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")

      })
      .map((respond: AnnkaResponse) => {
          if(respond){
              return respond.response;
          }
          else{
              return false;
          }
      })
      .pipe(
         catchError(this.handleError)
      )
  }

  forgot_password(email):Observable<String>{
    return this.http.post(this.resourceService.getBaseUrl()+this.forgot_password_url,{email}, 
      {
        headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")

      })
      .map((respond: AnnkaResponse) => {
          if(respond){
              return respond.response;
          }
          else{
              return false;
          }
      })
      .pipe(
         catchError(this.handleError)
      )
  }

}