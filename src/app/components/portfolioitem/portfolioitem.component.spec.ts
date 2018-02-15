import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioitemComponent } from './portfolioitem.component';

describe('PortfolioitemComponent', () => {
  let component: PortfolioitemComponent;
  let fixture: ComponentFixture<PortfolioitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
