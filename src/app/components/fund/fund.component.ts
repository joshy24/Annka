import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {
  amountForm: FormGroup;
  loading:boolean;

  constructor(private router: Router, private authService:AuthService, private location:Location) { }

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
        if(this.amountForm.value.amount>=5000&&this.amountForm.value.amount<=200000){
            window.location.href = "http://localhost:3020/account?amount="+this.amountForm.value.amount+"&name="+this.authService.getToken();
        }
        else{

        }
    }
  }

}
