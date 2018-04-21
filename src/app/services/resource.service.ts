import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable()
export class ResourceService {
  private pbase_url:string = "https://annka.xyz/api";
  private dbase_url:string = "http://localhost:3020/api";
  
  constructor() { }

  getBaseUrl(){
     return this.pbase_url;
  }
  
  parseDate(date){
    var d = date.toString();
    var adate = d.split("T")

    return moment(adate[0]).format("LL");
  }

}
