import { TestBed } from '@angular/core/testing';

import { RequireAuthenticationGuardService } from './require-authentication-guard.service';

describe('RequireAuthenticationGuardService', () => {
  let service: RequireAuthenticationGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequireAuthenticationGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
