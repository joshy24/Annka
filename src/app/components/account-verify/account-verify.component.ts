import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AccountService } from '../../services/account.service'

@Component({
  selector: 'account-verify',
  templateUrl: './account-verify.component.html',
  styleUrls: ['./account-verify.component.css']
})
export class AccountVerifyComponent implements OnInit {
  @Output() closeClick: EventEmitter<String> = new EventEmitter<String>();
  @Output() reloadUser: EventEmitter<String> = new EventEmitter<String>();
  @Output() showError: EventEmitter<String> = new EventEmitter();
  bvninput:boolean;
  uploadinput:boolean;
  uploadtype:string;
  selected_file:File;
  error_message:string;
  loading:boolean;
  
  constructor(private accountService:AccountService) { }

  ngOnInit() {
    this.selected_file = null;
    this.error_message=null;
  }

  closeVerify(){
    this.closeClick.emit();
  }

  showBVNInput(){
    this.bvninput = true;
    this.error_message=null;
  }

  hideBVNInput(){
    this.bvninput = false;
    this.error_message=null;
  }

  showUploadInput(type){
    this.uploadtype = type;
    this.uploadinput = true;
    this.error_message=null;
  }

  hideUploadInput(){
    this.uploadinput = false;
    this.error_message=null;
  }

  showLoading(){
    this.loading = true;
  }

  hideLoading(){
    this.loading = false;
  }

  onFileSelected(event){
    this.selected_file = <File>event.target.files[0];
    this.error_message=null;
  }

  uploadFile(){
    //if(this.selected_file.)
    if (!this.selected_file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        //file is not an image
        this.error_message = "File is not an image";
        return;
    }
    
    if(this.selected_file.size>2048000){
        //file is too large
        this.error_message = "File is too large";
        return;
    }

    var fd = new FormData();
    fd.append("verification", this.selected_file, this.selected_file.name);
    fd.append("upload_type", this.uploadtype);

    this.showLoading();
    this.accountService.upload(fd).subscribe(res => {
       this.hideLoading();
       this.reloadUser.emit();
    }, error => {
       this.hideLoading();
       this.showError.emit();
    })
  }

  saveBVN(value){
    this.error_message = "";

    if(value.length<=0||value.length>50){
       return;
    }

    if(!value.match(/^[0-9]+$/)){
      this.error_message = "Only Numbers are allowed";
      return;
    }

    this.showLoading();
    this.accountService.savebvn(value).subscribe(res => {
      this.hideLoading();
      this.reloadUser.emit();
    }, error => {
      this.hideLoading();
      this.showError.emit();
    })
  }

  closeAllInput(){
    this.uploadinput = false;
    this.bvninput = false;
  }

}
