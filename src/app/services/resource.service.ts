import { Injectable } from '@angular/core';

@Injectable()
export class ResourceService {
  private base_url:string = "http://localhost:3020";
  
  constructor() { }

  getBaseUrl(){
     return this.base_url;
  }

}
