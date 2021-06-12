import { TestBed } from '@angular/core/testing';

import { ToTokenizedRequestInterceptorService } from './to-tokenized-request-interceptor.service';

describe('ToTonkenizedRequestInterceptorService', () => {
  let service: ToTokenizedRequestInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToTokenizedRequestInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
