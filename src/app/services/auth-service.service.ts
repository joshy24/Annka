import { Injectable } from '@angular/core';
import User from  '../models/user.model'
import { HttpClient, HttpParams,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from "moment";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map } from 'rxjs/operators';
import { ResourceService } from '../services/resource.service'

@Injectable()
export class AuthService {
  private redirectUrl: string = '/';
  private loginUrl: string = '/login';
  private signupUrl: string = '/signup';
  private accountUrl: string = '/account';
  
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
           error.error
    );
  };

  login(email:string, password:string):Observable<boolean>{
      return this.http.post(this.resourceService.getBaseUrl()+this.loginUrl, {email: email, password: password}, {
          headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")
        })
        .map((respond: Respond) => {
          if(respond){
            if(respond.token&&respond.user&&respond.expires){
              this.setSession(respond);
              return true;
            }
            else{
               return false;
            }  
          }
          else{
              return false;
          }
        })
        .pipe(
          catchError(this.handleError)
         )
  }
  
  signup(user:User):Observable<boolean>{
    return this.http.post(this.resourceService.getBaseUrl()+this.signupUrl,user, 
      {
        headers: new HttpHeaders().set('Accept', "application/json;q=0.9,*/*;q=0.8")

      })
      .map((respond: Respond) => {
          if(respond){
            
            if(respond.token&&respond.user&&respond.expires){
              this.setSession(respond);
              return true;
            }
            else{
               return false;
            }  
          }
          else{
              return false;
          }
      })
      .pipe(
         catchError(this.handleError)
      )
  }

  isUserAuthenticated(): boolean {
    //checks if there is a valid jwt in local storage and expiriation time
    //means the user is logged in if there is
    if(this.getToken()&&this.getExpired()){
       return true;
    }
    else{
      return false;
    }
  }

  getAccountUrl(): string {
		return this.accountUrl;
  }

	getRedirectUrl(): string {
		return this.redirectUrl;
  }
  
	setRedirectUrl(url: string): void {
		this.redirectUrl = url;
  }
  
	getLoginUrl(): string {
		return this.loginUrl;
  }

  getSignupUrl(): string {
		return this.signupUrl;
  }
  
	getLoggedInUser(): User {
    if(this.getExpired()&&this.getToken()){
      const user = localStorage.getItem("user");
      
      return JSON.parse(user);
    }
    else{
      return null;
    }
  }
  
	logoutUser(): boolean{
		localStorage.removeItem("token");
    localStorage.removeItem("expires");
    localStorage.removeItem("user");

    return true;
  }
  
  private getExpired(){
    return moment().isBefore(this.getExpiration());
  }

  private getExpiration() {
    const expiration = localStorage.getItem("expires");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }   
  
  getToken():string {
    const token = localStorage.getItem("token");
    return token;
  }   

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expires,'second');

    localStorage.setItem('user', JSON.stringify(authResult.user));
    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expires", JSON.stringify(expiresAt.valueOf()) );
  }

}

interface Respond{
    expires:string;
    token:string;
    user:User;
}
