import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../services/account.service'
import Transaction from '../../models/transaction.model'
import { Location } from '@angular/common';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  loading:boolean;
  show_msg:boolean;
  error:boolean;
  @ViewChild(MessageComponent) message:MessageComponent;
  transactions:Transaction[];
  
  constructor(private url_location: Location, private accountService:AccountService) { }

  ngOnInit() {
    this.showLoading(); 

    this.error = false;

    this.accountService.pendingall().subscribe(all => {
        if(all&&all!=[]){
            this.transactions = all;
        }
        this.hideLoading();
    }, err => {
        this.error = true;
        this.hideLoading();
    })
  }

  showLoading(){
      this.loading = true;
  }

  hideLoading(){
      this.loading = false;
  }

  goBack(){
    this.url_location.back();
  }

  showMessage(){
    this.message.showMessage("Pending Transactions", ["When you initiate a Wallet Withdrawal, Portfolio cashout or Asset cashout it might take up to 24 hours to process.", "You can check the state of those transactions here."])
  }

  closeMessage(){
    this.show_msg = false;
  }

}
