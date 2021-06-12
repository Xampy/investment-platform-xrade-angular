import { TestBed } from '@angular/core/testing';

import { MemberDepositApiService } from './member-deposit-api.service';

describe('MemberDepositApiService', () => {
  let service: MemberDepositApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberDepositApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
