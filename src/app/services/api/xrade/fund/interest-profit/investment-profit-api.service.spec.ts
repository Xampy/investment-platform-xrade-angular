import { TestBed } from '@angular/core/testing';

import { InvestmentProfitApiService } from './investment-profit-api.service';

describe('InvestmentProfitService', () => {
  let service: InvestmentProfitApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentProfitApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
