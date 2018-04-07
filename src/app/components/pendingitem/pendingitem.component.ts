import { Component, OnInit, Input } from '@angular/core';
import { ResourceService} from '../../services/resource.service'
import Transaction from '../../models/transaction.model';

@Component({
  selector: 'pendingitem',
  templateUrl: './pendingitem.component.html',
  styleUrls: ['./pendingitem.component.css']
})
export class PendingitemComponent implements OnInit {

  @Input() transaction:Transaction;

  constructor(public resourceService:ResourceService) { }

  ngOnInit() {
  }

}
