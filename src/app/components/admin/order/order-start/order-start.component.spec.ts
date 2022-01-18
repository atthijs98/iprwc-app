import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStartComponent } from './order-start.component';

describe('OrderStartComponent', () => {
  let component: OrderStartComponent;
  let fixture: ComponentFixture<OrderStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
