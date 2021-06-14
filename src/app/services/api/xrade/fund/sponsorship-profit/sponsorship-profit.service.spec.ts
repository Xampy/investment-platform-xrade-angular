import { TestBed } from '@angular/core/testing';

import { SponsorshipProfitService } from './sponsorship-profit.service';

describe('SponsorshipProfitService', () => {
  let service: SponsorshipProfitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SponsorshipProfitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
