import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionmessageComponent } from './transactionmessage.component';

describe('TransactionmessageComponent', () => {
  let component: TransactionmessageComponent;
  let fixture: ComponentFixture<TransactionmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
