import { TestBed } from '@angular/core/testing';

import { AccountDataManagerService } from './account-data-manager.service';

describe('AccountDataMamnagerService', () => {
  let service: AccountDataManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountDataManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
