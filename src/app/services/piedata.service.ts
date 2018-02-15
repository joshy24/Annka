import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import IData from "../models/IDATA.interface";

@Injectable()
export class PiedataService {

  constructor() { }

  private mockData: IData[] = [];

  private dataSubject = new BehaviorSubject<IData[]>(this.mockData);

  $data = this.dataSubject.asObservable();

  addData(newData: IData) {
      this.mockData.push(newData);
      this.dataSubject.next(this.mockData);
  }

  addAllData(newData: IData[]){
      this.clearData()
      newData.forEach((d) => {
        this.mockData.push(d);
        this.dataSubject.next(this.mockData);
      });
  }

  clearData(){
      this.mockData = [];
  }

}

