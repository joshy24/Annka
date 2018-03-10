import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable()
export class ResourceService {
  private base_url:string = "http://localhost:3020";
  
  constructor() { }

  getBaseUrl(){
     return this.base_url;
  }

  parseDate(date){
    var d = date.toString();
    var adate = d.split("T")

    console.log(adate[0]);
    return moment(adate[0]).format("LL");
  }

}
