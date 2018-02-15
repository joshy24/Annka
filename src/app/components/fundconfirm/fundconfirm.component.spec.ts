import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundconfirmComponent } from './fundconfirm.component';

describe('FundconfirmComponent', () => {
  let component: FundconfirmComponent;
  let fixture: ComponentFixture<FundconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
