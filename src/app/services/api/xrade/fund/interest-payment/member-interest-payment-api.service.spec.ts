import { TestBed } from '@angular/core/testing';

import { MemberInterestPaymentApiService } from './member-interest-payment-api.service';

describe('InterestPaymentApiService', () => {
  let service: MemberInterestPaymentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberInterestPaymentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
