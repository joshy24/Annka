import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioallComponent } from './portfolioall.component';

describe('PortfolioallComponent', () => {
  let component: PortfolioallComponent;
  let fixture: ComponentFixture<PortfolioallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
