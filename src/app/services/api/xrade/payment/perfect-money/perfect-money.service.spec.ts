import { TestBed } from '@angular/core/testing';

import { PerfectMoneyService } from './perfect-money.service';

describe('PerfectMoneyService', () => {
  let service: PerfectMoneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfectMoneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
