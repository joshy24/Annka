import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service'
import Transaction from '../../models/transaction.model'
import { Location } from '@angular/common';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  loading:boolean;
  transactions:Transaction[];

  constructor(private url_location: Location, private accountService:AccountService) { }

  ngOnInit() {
    this.showLoading();

    this.accountService.pendingall().subscribe(all => {
        if(all)
            this.transactions = all;

        this.hideLoading();
    }, err => {
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

}
