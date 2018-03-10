import { Injectable } from '@angular/core';
import User from  '../models/user.model'
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

}

interface AnnkaResponse{
  response: String;
}

