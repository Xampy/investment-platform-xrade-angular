import { TestBed } from '@angular/core/testing';

import { Mt5ApiService } from './mt5-api.service';

describe('Mt5ApiService', () => {
  let service: Mt5ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mt5ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
