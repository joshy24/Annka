import { TestBed, inject } from '@angular/core/testing';

import { PiedataService } from './piedata.service';

describe('PiedataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PiedataService]
    });
  });

  it('should be created', inject([PiedataService], (service: PiedataService) => {
    expect(service).toBeTruthy();
  }));
});
