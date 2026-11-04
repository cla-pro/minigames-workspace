import { TestBed } from '@angular/core/testing';

import { MinigameLiquidsortBottleServiceService } from './minigame-liquidsort-bottle-service.service';

describe('MinigameLiquidsortBottleServiceService', () => {
  let service: MinigameLiquidsortBottleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigameLiquidsortBottleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
