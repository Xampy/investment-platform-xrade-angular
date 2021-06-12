import { TestBed } from '@angular/core/testing';

import { RequireNoAuthenticationGuardService } from './require-no-authentication-guard.service';

describe('RequireNoAuthenticationGuardService', () => {
  let service: RequireNoAuthenticationGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequireNoAuthenticationGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
