import { TestBed } from '@angular/core/testing';

import { OrderAccountAmountObserverService } from './order-account-amount-observer.service';

describe('OrderAccountAmountObserverService', () => {
  let service: OrderAccountAmountObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderAccountAmountObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
