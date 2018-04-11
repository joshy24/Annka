import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';

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

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    changes.show
  }

  ngOnInit() {
   
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.hideShow();
  }

  showShow(message){
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
