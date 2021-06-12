import { TestBed } from '@angular/core/testing';

import { MarketOrderApiService } from './market-order-api.service';

describe('MarketOrderApiService', () => {
  let service: MarketOrderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketOrderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
