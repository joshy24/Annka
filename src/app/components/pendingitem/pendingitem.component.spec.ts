import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingitemComponent } from './pendingitem.component';

describe('PendingitemComponent', () => {
  let component: PendingitemComponent;
  let fixture: ComponentFixture<PendingitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
