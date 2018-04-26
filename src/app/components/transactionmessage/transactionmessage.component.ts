import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'transactionmessage',
  templateUrl: './transactionmessage.component.html',
  styleUrls: ['./transactionmessage.component.css']
})
export class TransactionmessageComponent implements OnInit {
  @Output() closeClick: EventEmitter<String> = new EventEmitter<String>();
  title:String;
  top_message:String;
  bottom_message:String;
  amount:Number
  fee:Number;
  feeName:String;
  commission:Number;
  isFee:Boolean;
  balance:Number;

  show:Boolean;

  constructor(public currencyService:CurrencyService) { }

  ngOnInit() {

  }

  showMessage(title, top_msg, btm_message, amount, fee, commission, isFee, feeName){
    this.title = title;
    this.top_message = top_msg;
    this.bottom_message = btm_message;
    this.amount = amount;
    this.fee = fee;
    this.commission = commission;
    this.isFee = isFee;
    this.balance = amount - (fee + commission);
    this.feeName = (isFee == true)?"Fee":feeName;
    this.show = true;
  }

  closeMessage(){
    this.show = false;
  }

  continueClick(){
    this.show = false;
    this.closeClick.emit();
  }

}
