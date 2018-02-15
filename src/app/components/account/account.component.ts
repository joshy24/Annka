import { Component, OnInit } from '@angular/core';
import User from '../../models/user.model';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  loading:boolean;
  user: User;

  constructor(private http: HttpClient, private accountService:AccountService) { }
  
  ngOnInit() {
     this.loading = true;
     this.getAccount();
  }

  showLoading(){
    this.loading = true;
  }

  hideLoading(){
    this.loading = false;
  }

  getAccount(){
    this.accountService.account().subscribe(
      user => {
          this.hideLoading();
          if(user){
             this.user = user;
          }
      }, error => {
         this.hideLoading();
      }
    );
  }

}
