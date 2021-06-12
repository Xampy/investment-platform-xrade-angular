import { TestBed } from '@angular/core/testing';

import { DefaultDeviseService } from './default-devise.service';

describe('DefaultDeviseService', () => {
  let service: DefaultDeviseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultDeviseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
