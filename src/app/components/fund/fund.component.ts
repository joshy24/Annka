import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { Location } from '@angular/common';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {
  amountForm: FormGroup;
  loading:boolean;
  @ViewChild(MessageComponent) message:MessageComponent;

  constructor(private router: Router, private authService:AuthService, private location:Location) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    } 
  }

  ngOnInit() {
     this.amountForm = new FormGroup({
       amount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
     });
  }

  get amount() { return this.amountForm.get('amount'); }

  showLoading(){
    this.loading = true;
  }

  hideLoading(){
    this.loading = false;
  }

  onFormSubmit(){
    if(this.amountForm.valid){
        if(this.amountForm.value.amount>=6000&&this.amountForm.value.amount<=200000){
            window.location.href = "https://annka.xyz/api/account?amount="+this.amountForm.value.amount+"&name="+this.authService.getToken();
        }
        else{
            this.message.showMessage("Invalid Amount", ["Please Enter an amount between ₦6000 and ₦200,000"])
        }
    }
  }

}
