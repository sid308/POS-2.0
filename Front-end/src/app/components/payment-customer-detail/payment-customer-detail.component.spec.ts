import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCustomerDetailComponent } from './payment-customer-detail.component';

describe('PaymentCustomerDetailComponent', () => {
  let component: PaymentCustomerDetailComponent;
  let fixture: ComponentFixture<PaymentCustomerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCustomerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
