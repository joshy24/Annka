import { AccountService } from '../../services/account.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import User from '../../models/user.model'
import PortfolioError from '../../models/portfolio.error'
import { NameService } from '../../services/name.service';

@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.component.html',
  styleUrls: ['./editaccount.component.css']
})
export class EditaccountComponent implements OnInit {
  loading:boolean;
  initial_loading:boolean;
  user: User;
  invalidCredentialMsg: string;
  editForm: FormGroup;
  showConfirm:boolean;
  portfolioError:PortfolioError;
  showError: boolean;

  constructor(private nameService:NameService, private accountService:AccountService, private router:Router) { }

  ngOnInit() {
    this.editForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
        firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
        phone_number: new FormControl('', [Validators.minLength(11)])
    });

    this.getAccount();

    this.showConfirm = false;
    this.loading = false;

    this.portfolioError = {
      name: "",
      message: "",
      action: ""
    }
  }

  get email() { return this.editForm.get('email'); }
  get firstname() { return this.editForm.get('firstname'); }
  get lastname() { return this.editForm.get('lastname'); }
  get phone_number(){return this.editForm.get('phone_number'); }

  openConfirm(){
    this.showConfirm = true;
  }

  closeConfirm(){
    this.showConfirm = false;
  }

  showLoading(){
    this.loading = true;
  }

  hideLoading(){
    this.loading = false;
  }

  showInitialLoading(){
    this.initial_loading = true;
  }

  hideInitialLoading(){
    this.initial_loading = false;
  }

  getAccount(){
    this.showInitialLoading();
    this.accountService.account().subscribe(
      user => {
          this.hideInitialLoading();
          if(user){
             this.user = user;
             this.editForm.patchValue({firstname:this.user.firstname});
             this.editForm.patchValue({lastname:this.user.lastname});
             this.editForm.patchValue({email:this.user.email});
             this.editForm.patchValue({phone_number:this.user.phone_number})
          }
      }, 
      error => {
         this.hideInitialLoading();
      }
    );
  }

  onFormSubmit() {
    this.invalidCredentialMsg = '';
    var phone = this.editForm.value.phone_number;
    if(phone.match(/^[0-9]+$/)){
      if(this.editForm.valid) {
         this.openConfirm();
      }
      else{
        this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
      }
    }
    else{
      this.invalidCredentialMsg = 'Please Enter a valid Phone Number';
    }
  }

  openError(){
    this.showError = true;
  }

  closeError(){
      this.showError = false;
  }

  processForm(){
    this.closeConfirm();
    this.showLoading();

    var user:User = this.editForm.value;
          
    this.accountService.update(user).subscribe(
        authenticated => {
            this.hideLoading();
            if(authenticated=="success"){
              this.nameService.changeName("name");
              this.router.navigate(['/account']);
            }
        }, error => {
           this.hideLoading();
           this.portfolioError.name = "Edit Message";

            switch(error){
                case "Error Saving":
                  this.portfolioError.message = "Edit could not be processed at this moment. Please try again later";
                break
                default:
                  this.portfolioError.message = "Edit could not be processed at this moment. Please try again later";
                break;
            }

            this.openError();
        }
    );
  }

}
