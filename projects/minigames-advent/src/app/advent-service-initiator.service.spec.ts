import { TestBed } from '@angular/core/testing';

import { AdventServiceInitiatorService } from './advent-service-initiator.service';

describe('AdventServiceInitiatorService', () => {
  let service: AdventServiceInitiatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdventServiceInitiatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
