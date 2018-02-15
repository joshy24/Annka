import { TestBed, inject } from '@angular/core/testing';

import { BitrexService } from './bitrex.service';

describe('BitrexService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BitrexService]
    });
  });

  it('should be created', inject([BitrexService], (service: BitrexService) => {
    expect(service).toBeTruthy();
  }));
});
