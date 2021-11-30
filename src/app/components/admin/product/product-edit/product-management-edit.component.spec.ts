import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementEditComponent } from './product-management-edit.component';

describe('ProductManagementEditComponent', () => {
  let component: ProductManagementEditComponent;
  let fixture: ComponentFixture<ProductManagementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductManagementEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
