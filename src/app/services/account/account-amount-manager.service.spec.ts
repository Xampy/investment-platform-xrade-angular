import { TestBed } from '@angular/core/testing';

import { AccountAmountManagerService } from './account-amount-manager.service';

describe('AccountAmountManagerService', () => {
  let service: AccountAmountManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountAmountManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
