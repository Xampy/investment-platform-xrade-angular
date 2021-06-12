import { TestBed } from '@angular/core/testing';

import { MemberWithdrawApiService } from './member-withdraw-api.service';

describe('MemberWithdrawApiService', () => {
  let service: MemberWithdrawApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberWithdrawApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
