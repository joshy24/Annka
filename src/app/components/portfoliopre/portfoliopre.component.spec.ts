import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfoliopreComponent } from './portfoliopre.component';

describe('PortfoliopreComponent', () => {
  let component: PortfoliopreComponent;
  let fixture: ComponentFixture<PortfoliopreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfoliopreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfoliopreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
