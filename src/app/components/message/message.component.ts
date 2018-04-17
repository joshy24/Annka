import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  title:String;
  messages:String[];
  show:boolean;

  constructor() { }

  ngOnInit() {
  }

  showMessage(title, messages){
    this.messages = messages;
    this.title = title;
    this.show = true;
  }

  closeMessage(){
    this.show = false;
  }

}
