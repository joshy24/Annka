import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NameService {

  constructor() { }

  private nameSource = new BehaviorSubject<String>("name");
  name = this.nameSource.asObservable();

  changeName(message: String) {
    this.nameSource.next(message)
  }

}
