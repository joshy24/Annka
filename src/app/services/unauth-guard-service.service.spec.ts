import { TestBed, inject } from '@angular/core/testing';

import { UnauthGuardServiceService } from './unauth-guard-service.service';

describe('UnauthGuardServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnauthGuardServiceService]
    });
  });

  it('should be created', inject([UnauthGuardServiceService], (service: UnauthGuardServiceService) => {
    expect(service).toBeTruthy();
  }));
});
