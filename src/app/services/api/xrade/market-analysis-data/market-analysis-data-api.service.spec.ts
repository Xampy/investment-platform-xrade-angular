import { TestBed } from '@angular/core/testing';

import { MarketAnalysisDataApiService } from './market-analysis-data-api.service';

describe('MarketAnalysisDataApiService', () => {
  let service: MarketAnalysisDataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketAnalysisDataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
