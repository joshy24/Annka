import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashoutwalletComponent } from './cashoutwallet.component';

describe('CashoutwalletComponent', () => {
  let component: CashoutwalletComponent;
  let fixture: ComponentFixture<CashoutwalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashoutwalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashoutwalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
