import { TestBed } from '@angular/core/testing';

import { SecurityApiService } from './security-api.service';

describe('SecurityApiService', () => {
  let service: SecurityApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
