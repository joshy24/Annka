import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceitemComponent } from './priceitem.component';

describe('PriceitemComponent', () => {
  let component: PriceitemComponent;
  let fixture: ComponentFixture<PriceitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
