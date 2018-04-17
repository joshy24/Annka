import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {
  message:String;
  show:boolean;
  interval:any;

  constructor() { }

  ngOnInit() {
   
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.hideShow();
  }

  showShow(message){
    clearInterval(this.interval);
    this.show = true;
    this.message = message;

    this.interval = setInterval(() => {
      clearInterval(this.interval);
      this.hideShow();
    }, 5000)
  }

  showLong(message){
    this.show = true;
    this.message = message;
  }

  hideShow(){
    this.show = false;
  }

}
