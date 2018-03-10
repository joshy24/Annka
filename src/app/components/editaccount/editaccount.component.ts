import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import User from '../../models/user.model';

@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.component.html',
  styleUrls: ['./editaccount.component.css']
})
export class EditaccountComponent implements OnInit {
  loading:boolean;
  user: User;

  constructor(private accountService:AccountService,) { }

  ngOnInit() {
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
