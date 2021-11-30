import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementStartComponent } from './product-management-start.component';

describe('ProductStartComponent', () => {
  let component: ProductManagementStartComponent;
  let fixture: ComponentFixture<ProductManagementStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductManagementStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagementStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
